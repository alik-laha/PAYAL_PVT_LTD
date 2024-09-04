import { Request, Response } from "express";
import {   VillageRcvData } from "../../type/type";


import RcvVillageEditModel from "../../model/rcvVillageEditModel";
import RcvVillageModel from "../../model/RcvVillageModel";



const approveEditRcvVillage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const editPackageMaterial: VillageRcvData = await RcvVillageEditModel.findOne({ where: { id } }) as unknown as VillageRcvData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit Village material not found" });
        
        // const vendor = await VendorName.findOne({ where: { vendorName:editPackageMaterial.vendorName } });
        // if (!vendor) {
        //     VendorName.create({ vendorName:editPackageMaterial.vendorName, createdBy: editPackageMaterial.createdBy });
        // }
        // const skuData = await SkuModel.findOne({ where: { sku:editPackageMaterial.sku } });
        // if (!skuData) {
        //     SkuModel.create({ sku:editPackageMaterial.sku, unit:editPackageMaterial.unit,createdBy: editPackageMaterial.createdBy });
        // }
        
        
        const updatePackageMaterial = await RcvVillageModel.update({
         
            sku: editPackageMaterial.sku,
            vendorName: editPackageMaterial.vendorName,
            quantity: editPackageMaterial.quantity,
            remarks:editPackageMaterial.remarks,
            totalWt:editPackageMaterial.totalWt,
            invoice:editPackageMaterial.invoice,     
            type:editPackageMaterial.type,
            editStatus: "Approved",
            approvedBy: req.cookies.user,
            createdBy:editPackageMaterial.createdBy
        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting Village material" });
        const deleteEditPackageMaterial = await RcvVillageEditModel.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting Village package material" });
        return res.status(200).json({ message: "Village material accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}
export default approveEditRcvVillage;
