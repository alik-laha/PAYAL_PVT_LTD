import { Request, Response } from "express";
import PackageMaterial from "../../model/recevingPackagingMaterialModel";
import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";

const RecivingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { recevingDate, sku, vendorName, quantity, unit ,invoicedate,invoice} = req.body;
        const createdBy = req.cookies.user;
        let skuData = await SkuModel.findOne({ where: { sku } });

        const newPackageMaterial = await PackageMaterial.create({
            recevingDate,
            sku,invoice,invoicedate,
            vendorName,
            quantity,
            unit,
            createdBy,
        });
        if (!skuData) {
            skuData = await SkuModel.create({ sku, unit, createdBy });
        }
        let vendorData = await VendorName.findOne({ where: { vendorName } });
        if (!vendorData) {
            vendorData = await VendorName.create({ vendorName, createdBy });
        }
        if (!newPackageMaterial || !skuData || !vendorData) return res.status(500).json({ message: "internal error while reciving package" });

        return res.status(201).json({ message: "package material recived successfully", newPackageMaterial });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while reciving package" });

    }
}
export default RecivingPackageMaterial;