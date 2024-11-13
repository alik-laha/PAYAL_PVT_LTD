import { Request, Response } from "express";


import {  StoreIssueData, storeRcvData } from "../../type/type";

import WhatsappMsg from "../../helper/WhatsappMsg";
import SkuModel from "../../model/SkuModel";
//import VendorName from "../../model/vendorNameModel";

import ItemIssue from "../../model/itemissueModel";
import ItemIssueEdit from "../../model/itemIssueEdit";


const editstoreIssue = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        const {  category, material,quantity,itemunit,unitprice,totPrice,section,sectionunit,user,damage,damageqty,damageunit,remarks,date,subsection } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        // let vendortype:string
        // if(gateType==='IN'){
        //     vendortype='Vendor'
        // }
        // else{
        //     vendortype='Party'
        // }
        let skuData = await SkuModel.findOne({ where: { sku:material ,type:category,section:'Store'} });
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        if(!skuData ){
            return res.status(500).json({ message: "Material Does Not Exist" });
        }
        else{
            
        const packageMaterialData: StoreIssueData = await ItemIssue.findOne({ where: { id } }) as unknown as StoreIssueData;
        if (!packageMaterialData) return res.status(404).json({ message: "Issue Details Not found" });
        
        console.log(req.body)
        const editPackageMaterial = await ItemIssueEdit.create({
            id: packageMaterialData.id,
            issueID:packageMaterialData.issueID,
            date:date,
            category:category,
            materialName:material,
            quantity:quantity,
            itemunit:itemunit,
            unitPrice:unitprice,
            totalPrice:totPrice,
            section:section,
            subsection:subsection,
            sectionunit:sectionunit,
            issueUser:user,
            damagereturn:damage,
            damagequantity:damageqty,
            damageunit:damageunit,
            remarks:remarks,
            editStatus: "Pending",
            CreatedBy:createdBynew
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Issue details" });
        const updatePackageMaterial = await ItemIssue.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Issue Details" });
        const data = await WhatsappMsg("Item Issue", createdBynew,"modify_request","Receiving")
        console.log(data)
        return res.status(201).json({ message: "Item Issue Details edited successfully" });
        }

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default editstoreIssue;