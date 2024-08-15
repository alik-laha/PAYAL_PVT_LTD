import { Request, Response } from "express";

import SkuModel from "../../model/SkuModel";

const deleteSKU = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await SkuModel.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: "SKU has been deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteSKU;