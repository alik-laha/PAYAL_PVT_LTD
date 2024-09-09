import { Request, Response } from "express";

import LotNo from "../../model/lotNomodel";
import RcnBoiling from "../../model/RcnBoilingModel";
import RcnScooping from "../../model/scoopingModel";


const deleteLotNoNew= async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await LotNo.destroy({
            where: {
                lotNo: id
            }
        });
        await RcnBoiling.destroy({
            where: {
                LotNo: id
            }
        });
        await RcnScooping.destroy({
            where: {
                LotNo: id
            }
        });
        return res.status(200).json({ message: "Lot No. has deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteLotNoNew;