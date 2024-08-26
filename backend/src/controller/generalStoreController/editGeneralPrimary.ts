import { Request, Response } from "express";

import {  storeRcvData } from "../../type/type";

import WhatsappMsg from "../../helper/WhatsappMsg";
import SkuModel from "../../model/SkuModel";
//import VendorName from "../../model/vendorNameModel";


import generalPrimaryModel from "../../model/generalPrimaryModel";
import generalPrimaryEditModel from "../../model/generalPrimaryEditModel";


const editGeneralPrimary = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        const {  gateType,grossswt,truck,gatepassno,recevingDate, sku, vendorName, quantity, unit,invoice,invoicedate,invoicequantity,remarks,totalWt,type,totalBill } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
        else{
            vendortype='Party'
        }
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'General'} });
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'General' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        if(!skuData ){
            return res.status(500).json({ message: "SKU Does Not Exist" });
        }
        else{
            
        const packageMaterialData: storeRcvData = await generalPrimaryModel.findOne({ where: { id } }) as unknown as storeRcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "general material not found" });
        let netwt=req.body.netwt
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await generalPrimaryEditModel.create({
            id: packageMaterialData.id,
            gateType:gateType,
            truckNo:truck,
            gatePassNo:gatepassno,
            grossWt:grossswt,
            netWeight:netwt,
            recevingDate,
            sku,totalBill,
            vendorName,
            quantity,
            status:1,
            unit,invoice,invoicedate,
            createdBy: createdBynew,
            editStatus: "Pending",
            type,invoicequantity,remarks,totalWt
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing general material" });
        const updatePackageMaterial = await generalPrimaryModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing general material" });
        const data = await WhatsappMsg("General Primary Rcv/Dispatch", createdBynew,"modify_request")
        console.log(data)
        return res.status(201).json({ message: "General material edited successfully" });
        }

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default editGeneralPrimary;