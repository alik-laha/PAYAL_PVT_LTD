import { Request, Response } from "express";
import RcnEditPeeling from "../../model/peelingEditModel";
const findEditPeelingAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await RcnEditPeeling.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditaScoopingAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export default findEditPeelingAll;