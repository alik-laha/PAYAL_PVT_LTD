import { Request, Response } from "express";
import SkuModel from "../../model/SkuModel";
import { Op } from "sequelize";

const SkudataFind = async (req: Request, res: Response) => {
    try {
        const { sku } = req.body;
        const section = req.params.section;
        let where = {
            [Op.and]: [
                { sku: { [Op.like]: `%${sku}%` } },
                { section: { [Op.like]: `%${section}%` } },
            ]
        }
        const skuData = await SkuModel.findAll({ where });
        if (!skuData) return res.status(404).json({ message: "sku not found" });
        return res.status(200).json({ skuData });
    } catch (error) {
        return res.status(500).json({ message: "internal error while finding sku data" });
    }
}
export default SkudataFind;