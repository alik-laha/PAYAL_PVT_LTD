import { Request, Response } from "express";
import RcnEdit from "../../model/RcnEditModel";

const getAllEditPending = async (req: Request, res: Response) => {
    try {
        const rcnEdit = await RcnEdit.findAll();
        if (!rcnEdit) {
            return res.status(200).send({ message: "No pending edit Available" });
        }
        return res.status(200).send(rcnEdit);
    }
    catch (err) {
        console.log(err);
    }
}
export default getAllEditPending;