import { Request, Response } from "express";

import SkuModel from "../../model/SkuModel";


const getItemByBytype = async (req: Request, res: Response) => {
    try {
        const type = req.params.type;
        const section=req.body.section;
        const asset = await SkuModel.findAll({
            attributes:['sku','unit'],
            where: {
                section: section,
                type: type,
               
            }
        });
        if (asset.length > 0) {
            res.status(200).json(asset);
        } else {
            res.status(404).json({ message: "No sku Found" });
        }

    }
    catch (err) {
        res.status(400).json({ message: "internal server Error" });
        console.log(err);
    }
}

export default getItemByBytype;