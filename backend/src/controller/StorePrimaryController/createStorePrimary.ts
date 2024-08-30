import { Request, Response } from "express";
import SkuModel from "../../model/SkuModel";
//import VendorName from "../../model/vendorNameModel";
import storePrimaryModel from "../../model/storePrimaryModel";

const createStorePrimary = async (req: Request, res: Response) => {
    try {
        const { GatePassNo,recevingDate, TruckNo,GrossWt,sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type,remarks,totalWt,gateType,totalBill} = req.body.data;
        const createdBy = req.cookies.user;
        
    //     let vendortype:string
    //     if(gateType==='IN'){
    //         vendortype='Vendor'
    //     }
    //    else{
    //         vendortype='Party'
    //    }
        
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'Store'} });
        if(!skuData ){
            return res.status(500).json({ message: "SKU Does Not Exist" });
        }
        else{
            const newPackageMaterial = await storePrimaryModel.create({
                gatePassNo:GatePassNo,grossWt:GrossWt,truckNo:TruckNo,
                recevingDate,
                sku,invoice,invoicedate,
                vendorName,invoicequantity,type,
                quantity,totalBill,
                unit,remarks,totalWt,
                createdBy,status:1,gateType
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "Store Item received/dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating Store Item" });
            }

        }

      

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating Store Item" });

    }
}
export default createStorePrimary;