import { Request, Response } from "express";

import RcnBoiling from "../../model/RcnBoilingModel";


const deleteBoilingByLot= async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await RcnBoiling.destroy({
            where: {
                LotNo: id
            }
        });
        return res.status(200).json({ message: "boiling Entry Is deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteBoilingByLot;