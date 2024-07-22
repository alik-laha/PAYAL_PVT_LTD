import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import packageMaterial from "../../model/recevingPackagingMaterialModel";
import { PackageMaterialReceivingData } from "../../type/type";
import VendorName from "../../model/vendorNameModel";
import SkuModel from "../../model/SkuModel";


const editRecevingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { recevingDate, sku, vendorName, quantity, unit } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        const packageMaterialData: PackageMaterialReceivingData = await packageMaterial.findOne({ where: { id } }) as unknown as PackageMaterialReceivingData;
        if (!packageMaterialData) return res.status(404).json({ message: "package material not found" });
        const vendor = await VendorName.findOne({ where: { vendorName } });
        if (!vendor) {
            VendorName.create({ vendorName, createdBy: packageMaterialData.createdBy });
        }
        const skuData = await SkuModel.findOne({ where: { sku } });
        if (!skuData) {
            SkuModel.create({ sku, unit });
        }
        const editPackageMaterial = await EditPackagingMaterial.create({
            id: packageMaterialData.id,
            recevingDate,
            sku,
            vendorName,
            quantity,
            unit,
            createdBy: packageMaterialData.createdBy,
            editStatus: "Pending",
            qualityStatus: packageMaterialData.qualityStatus,
        });
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Packaging material" });
        const updatePackageMaterial = await packageMaterial.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Packaging material" });
        return res.status(201).json({ message: "package material edited successfully" });

    }
    catch (err) {
        console.log(err);
    }
}
export default editRecevingPackageMaterial;