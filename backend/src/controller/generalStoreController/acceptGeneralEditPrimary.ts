import { Request, Response } from "express";
import {  storeRcvData } from "../../type/type";
import generalPrimaryEditModel from "../../model/generalPrimaryEditModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";



const acceptGeneralEditPrimary = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const editPackageMaterial: storeRcvData = await generalPrimaryEditModel.findOne({ where: { id } }) as unknown as storeRcvData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit General material not found" });
        
        // const vendor = await VendorName.findOne({ where: { vendorName:editPackageMaterial.vendorName } });
        // if (!vendor) {
        //     VendorName.create({ vendorName:editPackageMaterial.vendorName, createdBy: editPackageMaterial.createdBy });
        // }
        // const skuData = await SkuModel.findOne({ where: { sku:editPackageMaterial.sku } });
        // if (!skuData) {
        //     SkuModel.create({ sku:editPackageMaterial.sku, unit:editPackageMaterial.unit,createdBy: editPackageMaterial.createdBy });
        // }
        
        
        const updatePackageMaterial = await generalPrimaryModel.update({
         
            sku: editPackageMaterial.sku,
            vendorName: editPackageMaterial.vendorName,
            quantity: editPackageMaterial.quantity,
            invoicequantity: editPackageMaterial.invoicequantity,
            remarks:editPackageMaterial.remarks,
            totalWt:editPackageMaterial.totalWt,
            invoice:editPackageMaterial.invoice,
            invoicedate:editPackageMaterial.invoicedate,
            type:editPackageMaterial.type,
            unit: editPackageMaterial.unit,
            editStatus: "Accepted",
            approvedBy: req.cookies.user,
            createdBy:editPackageMaterial.createdBy
        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting package material" });
        const deleteEditPackageMaterial = await generalPrimaryEditModel.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting edit package material" });
        return res.status(200).json({ message: "General Item Accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}
export default acceptGeneralEditPrimary;
