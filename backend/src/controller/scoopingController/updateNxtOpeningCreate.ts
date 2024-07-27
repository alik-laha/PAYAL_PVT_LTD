import { Request, Response } from "express";
import ScpNxtOpenEdit from "../../model/ScoopingNextOpeningEditModel";

const updateNxtOpeningCreate = async (req: Request, res: Response) => {
    try {
        const { LotNo, Scooping_Line_Mc, Uncut, Unscoop, NonCut } = req.body.data;
        const CretaeNextOpening = await ScpNxtOpenEdit.create({
            LotNo,
            Scooping_Line_Mc,
            Uncut,
            Unscoop,
            NonCut
        })
        return res.status(200).json({ message: "Next Opening Created Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default updateNxtOpeningCreate