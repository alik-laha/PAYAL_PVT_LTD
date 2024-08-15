import { Request, Response } from "express";
import VendorName from "../../model/vendorNameModel";
import { Op } from "sequelize";

const vendorNameFind = async (req: Request, res: Response) => {
    try {
        const { vendorName,type } = req.body;
        const section = req.params.section;
        let where
        if(type)
        {  where = {
            [Op.and]: [
                { vendorName: { [Op.like]: `%${vendorName}%` } },
                { section: { [Op.like]: `%${section}%` } },
                { type: { [Op.like]: `%${type}%` } }
            ]
        }
        }
        else{
            where = {
                [Op.and]: [
                    { vendorName: { [Op.like]: `%${vendorName}%` } },
                    { section: { [Op.like]: `%${section}%` } }
               
                ]
            }
        }
     
        const vendorData = await VendorName.findAll({ where });
        if (!vendorData) return res.status(404).json({ message: "vendor not found" });
        return res.status(200).json({ vendorData });
    } catch (error) {
        return res.status(500).json({ message: "internal error while finding vendor data" });
    }
}
export default vendorNameFind;