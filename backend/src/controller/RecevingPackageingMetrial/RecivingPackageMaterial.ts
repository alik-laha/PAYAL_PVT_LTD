import { Request, Response } from "express";
import PackageMaterial from "../../model/recevingPackagingMaterialModel";
import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";

const RecivingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { GatePassNo,recevingDate, TruckNo,GrossWt,sku, vendorName, quantity, unit ,invoicedate,invoice} = req.body.data;
        const createdBy = req.cookies.user;
        let skuData = await SkuModel.findOne({ where: { sku } });
        let vendorData = await VendorName.findOne({ where: { vendorName } });
        if(!skuData || !vendorData){
            return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        }
        else{
            const newPackageMaterial = await PackageMaterial.create({
                gatePassNo:GatePassNo,grossWt:GrossWt,truckNo:TruckNo,
                recevingDate,
                sku,invoice,invoicedate,
                vendorName,
                quantity,
                unit,
                createdBy,status:1
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
export default RecivingPackageMaterial;