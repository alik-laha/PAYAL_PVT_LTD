import { Request, Response } from "express";

import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";
import agarbatiPrimaryEntryEditModel from "../../model/agarbatiPrimaryEditModel";


const EditRejectAgarbati = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await agarbatiPrimaryEntryModel.update({
            editStatus: "N/A",
            approvedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Agarbati Entry not found" });
        }
        const rcnEdit = await agarbatiPrimaryEntryEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Agarbati Entry not found" });
        }
        return res.status(200).json({ message: "Agarbati Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default EditRejectAgarbati;