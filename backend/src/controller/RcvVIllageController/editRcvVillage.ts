import { Request, Response } from "express";


import {  storeRcvData, VillageRcvData } from "../../type/type";

import WhatsappMsg from "../../helper/WhatsappMsg";

//import VendorName from "../../model/vendorNameModel";


import RcvVillageEditModel from "../../model/rcvVillageEditModel";
import RcvVillageModel from "../../model/RcvVillageModel";


const editRcvVillage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        const {  grossWt, gateType, recevingDate, 
            truck, gatepass, invoice, 
            itemtype, itemname, VendorName,
            quantity, totalWt, remarks } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        // let vendortype:string
        // if(gateType==='IN'){
        //     vendortype='Vendor'
        // }
        // else{
        //     vendortype='Party'
        // }
        //let skuData = await SkuModel.findOne({ where: { sku ,type,section:'Store'} });
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        // if(!skuData ){
        //     return res.status(500).json({ message: "SKU Does Not Exist" });
        // }
      
            
        const packageMaterialData: VillageRcvData = await RcvVillageModel.findOne({ where: { id } }) as unknown as VillageRcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Village material not found" });
        let netwt=req.body.netwt
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await RcvVillageEditModel.create({
            id: packageMaterialData.id,
            gateType:gateType,
            truckNo:truck,
            gatePassNo:gatepass,
            grossWt:grossWt,
            netWeight:netwt,
            recevingDate:recevingDate,
            sku:itemname,
            vendorName:VendorName,
            type:itemtype,
            quantity:quantity,
            status:1,
            invoice:invoice,
            createdBy: createdBynew,
            editStatus: "Pending",
            totalWt:totalWt,
            remarks: remarks,

   
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Village material" });
        const updatePackageMaterial = await RcvVillageModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Store material" });
        const data = await WhatsappMsg("Village Primary Rcv/Dispatch", createdBynew,"modify_request")
        console.log(data)
        return res.status(201).json({ message: "Village material edited successfully" });
        

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default editRcvVillage;