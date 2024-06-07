import { Request, Response } from "express";
import RcnEditGrading from "../../model/RcnGradingEditModel";

const GetAllEditPendingData = async (req: Request, res: Response) => {
    try {
        const data = await RcnEditGrading.findAll()
        if (data) {
            return res.status(200).json({ data })
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}

export default GetAllEditPendingData