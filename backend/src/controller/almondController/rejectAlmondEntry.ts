import { Request, Response } from "express";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import almondPrimaryEntryEditModel from "../../model/almondPrimaryEditModel";


const EditRejectAlmond = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await almondPrimaryEntryModel.update({
            editStatus: "N/A",
            approvedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Almond Entry not found" });
        }
        const rcnEdit = await almondPrimaryEntryEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Almond Entry not found" });
        }
        return res.status(200).json({ message: "Almond Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default EditRejectAlmond;