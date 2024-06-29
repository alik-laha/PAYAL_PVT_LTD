import { Request, Response } from "express";

import LotNo from "../../model/lotNomodel";


const deleteBoilingByLot= async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await LotNo.destroy({
            where: {
                lotNo: id
            }
        });
        return res.status(200).json({ message: "Lot No. has deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteBoilingByLot;