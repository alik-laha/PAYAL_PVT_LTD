import { Request, Response } from "express";
import PackageMaterial from "../../model/recevingPackagingMaterialModel";

const RecivingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { recevingDate, sku, vendorName, quantity, unit } = req.body;
        const createdBy = req.cookies.user;
        const newPackageMaterial = await PackageMaterial.create({
            recevingDate,
            sku,
            vendorName,
            quantity,
            unit,
            createdBy
        });
        if (!newPackageMaterial) return res.status(500).json({ message: "internal error while reciving package" });

        return res.status(201).json({ message: "package material recived successfully" });

    } catch (error) {
        return res.status(500).json({ message: "internal error while reciving package" });
    }
}
export default RecivingPackageMaterial;