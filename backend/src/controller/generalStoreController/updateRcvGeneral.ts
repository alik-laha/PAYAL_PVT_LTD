import { Request, Response } from "express";

import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";

import generalPrimaryModel from "../../model/generalPrimaryModel";

const updateRcvGeneral = async (req: Request, res: Response) => {
    try {
        const { sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type,remarks,totalWt,gateType} = req.body.data;
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
        const id=req.params.id;
        const createdBy = req.cookies.user;
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'General'} });
        let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'General' } });
        if(!skuData || !vendorData){
            return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        }
        else{
            const newPackageMaterial = await generalPrimaryModel.update({
               
                sku,invoice,invoicedate,type,
                vendorName,
                quantity,
                invoicequantity,
                unit,remarks,totalWt,
                createdBy,status:1
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "General item received/dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating general Item Entry" });
            }

        }
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating General Item" });

    }
}
export default updateRcvGeneral;