import { Request, Response } from "express";
import almondPrimaryEntryEditModel from "../../model/almondPrimaryEditModel";

const getAllAlmondEditPending = async (req: Request, res: Response) => {
    try {
        const rcnEdit = await almondPrimaryEntryEditModel.findAll({
            order: [['recevingDate', 'DESC']], // Order by date descending
        }
            

        );
        if (!rcnEdit) {
            return res.status(200).send({ message: "No pending edit Available" });
        }
        return res.status(200).send(rcnEdit);
    }
    catch (err) {
        console.log(err);
    }
}
export default getAllAlmondEditPending;