import { Request, Response } from "express";
import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";

const createGeneralPrimary = async (req: Request, res: Response) => {
    try {
        const { GatePassNo,recevingDate, TruckNo,GrossWt,sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type,remarks,totalWt,gateType} = req.body.data;
        const createdBy = req.cookies.user;
        
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'General'} });
        let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'General' } });
        if(!skuData || !vendorData){
            return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        }
        else{
            const newPackageMaterial = await generalPrimaryModel.create({
                gatePassNo:GatePassNo,grossWt:GrossWt,truckNo:TruckNo,
                recevingDate,
                sku,invoice,invoicedate,
                vendorName,invoicequantity,type,
                quantity,
                unit,remarks,totalWt,
                createdBy,status:1,gateType
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "General Items received/dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating General Item" });
            }

        }

      

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating General Item" });

    }
}
export default createGeneralPrimary;