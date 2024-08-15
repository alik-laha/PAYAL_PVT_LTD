import { Request, Response } from "express";

import packageMaterial from "../../model/recevingPackagingMaterialModel";
import {  storeRcvData } from "../../type/type";

import WhatsappMsg from "../../helper/WhatsappMsg";
import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import storePrimaryEditModel from "../../model/storePrimaryEditModel";


const editstorePrimary = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        const {  gateType,grossswt,truck,gatepassno,recevingDate, sku, vendorName, quantity, unit,invoice,invoicedate,invoicequantity,remarks,totalWt,type } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
        else{
            vendortype='Party'
        }
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'Store'} });
        let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        if(!skuData || !vendorData){
            return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        }
        else{
            
        const packageMaterialData: storeRcvData = await storePrimaryModel.findOne({ where: { id } }) as unknown as storeRcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "store material not found" });
        let netwt=req.body.netwt
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await storePrimaryEditModel.create({
            id: packageMaterialData.id,
            gateType:gateType,
            truckNo:truck,
            gatePassNo:gatepassno,
            grossWt:grossswt,
            netWeight:netwt,
            recevingDate,
            sku,
            vendorName,
            quantity,
            status:1,
            unit,invoice,invoicedate,
            createdBy: createdBynew,
            editStatus: "Pending",
            type,invoicequantity,remarks,totalWt
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Store material" });
        const updatePackageMaterial = await storePrimaryModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Store material" });
        const data = await WhatsappMsg("Store Primary Rcv/Dispatch", createdBynew,"modify_request")
        console.log(data)
        return res.status(201).json({ message: "Store material edited successfully" });
        }

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default editstorePrimary;