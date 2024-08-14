import { Request, Response } from "express";
import PackageMaterial from "../../model/recevingPackagingMaterialModel";
import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";

const updatePM = async (req: Request, res: Response) => {
    try {
        const { sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type} = req.body.data;
        const id=req.params.id;
        const createdBy = req.cookies.user;
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'PackagingMaterial'} });
        let vendorData = await VendorName.findOne({ where: { vendorName,type:'Vendor',section:'PackagingMaterial' } });
        if(!skuData || !vendorData){
            return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        }
        else{
            const newPackageMaterial = await PackageMaterial.update({
               
                sku,invoice,invoicedate,type,
                vendorName,
                quantity,
                invoicequantity,
                unit,
                createdBy,status:1
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "package material received successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating PM" });
            }

        }
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating PM" });

    }
}
export default updatePM;