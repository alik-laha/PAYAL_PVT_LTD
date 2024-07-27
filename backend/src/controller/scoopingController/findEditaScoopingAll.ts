import { Request, Response } from "express";
import RcnAllEditScooping from "../../model/scoopingAllEditModel";
const findEditaScoopingAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await RcnAllEditScooping.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditaScoopingAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export default findEditaScoopingAll;