import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import RcvVillageModel from "../../model/RcvVillageModel";
import SkuModel from "../../model/SkuModel";
import storePrimaryModel from "../../model/storePrimaryModel";


const updateStoreEntire = async (req: Request, res: Response) => {
    try {
        const id=req.params.id;
       // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData=req.body.formData
        const firstrow=formData[0]
        const { sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type,remarks,totalWt,totalBill} = firstrow;
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'Store'} });
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        if(!skuData ){
            return res.status(500).json({ message: "SKU Does Not Exist" });
        }
        else
        {
            await storePrimaryModel.sequelize?.transaction( async (transaction) =>{
                const dataToUpdate=formData.slice(1)
                for (let data of dataToUpdate)
                {
                    console.log(data)
                    let skuData = await SkuModel.findOne({ where: { sku:data.sku ,type:data.type,section:'Store'} });
                    if(!skuData ){
                        return res.status(500).json({ message: "SKU Does Not Exist" });
                    }
                    await storePrimaryModel.create({
                        gatePassNo:data.GatePassNo,grossWt:data.GrossWt,truckNo:data.TruckNo,
                        recevingDate:data.recevingDate,
                        sku:data.sku,invoice:data.invoice,invoicedate:data.invoicedate,
                        vendorName:data.vendorName,invoicequantity:data.invoicequantity,type:data.type,
                        quantity:data.quantity,totalBill:data.totalBill,
                        unit:data.unit,remarks:data.remarks,totalWt:data.totalWt,
                        createdBy,status:1,gateType:data.gateType
                },{transaction})
            }        
            })
            const newPackageMaterial = await storePrimaryModel.update({
                sku,invoice,invoicedate,type,
                    vendorName,
                    quantity,
                    invoicequantity,
                    unit,remarks,totalWt,totalBill,
                    createdBy,status:1
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "Village material received/dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating Village Entry" });
            }
        }
       

    
        
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating Village Entry" });

    }
}
export default updateStoreEntire;