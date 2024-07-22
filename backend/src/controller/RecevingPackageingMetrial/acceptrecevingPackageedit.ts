import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import packageMaterial from "../../model/recevingPackagingMaterialModel";
import { PackageMaterialReceivingData } from "../../type/type";
import VendorName from "../../model/vendorNameModel";
import SkuModel from "../../model/SkuModel";


const acceptRecevingPackageEdit = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const editPackageMaterial: PackageMaterialReceivingData = await EditPackagingMaterial.findOne({ where: { id } }) as unknown as PackageMaterialReceivingData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit package material not found" });
        
        const vendor = await VendorName.findOne({ where: { vendorName:editPackageMaterial.vendorName } });
        if (!vendor) {
            VendorName.create({ vendorName:editPackageMaterial.vendorName, createdBy: editPackageMaterial.createdBy });
        }
        const skuData = await SkuModel.findOne({ where: { sku:editPackageMaterial.sku } });
        if (!skuData) {
            SkuModel.create({ sku:editPackageMaterial.sku, unit:editPackageMaterial.unit,createdBy: editPackageMaterial.createdBy });
        }
        
        
        const updatePackageMaterial = await packageMaterial.update({
            recevingDate: editPackageMaterial.recevingDate,
            sku: editPackageMaterial.sku,
            vendorName: editPackageMaterial.vendorName,
            quantity: editPackageMaterial.quantity,
            unit: editPackageMaterial.unit,
            editStatus: "Accepted",
            approvedBy: req.cookies.user,
            createdBy:editPackageMaterial.createdBy
        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting package material" });
        const deleteEditPackageMaterial = await EditPackagingMaterial.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting edit package material" });
        return res.status(200).json({ message: "package material accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}
export default acceptRecevingPackageEdit;
