import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";
import { Op } from "sequelize";

const EditReject = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Please provide the id" });
        }
        const rcn = await RcnPrimary.update({
            editStatus: "Created"
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Rcn Entry not found" });
        }
        const rcnEdit = await RcnEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Rcn Entry not found" });
        }
        return res.status(200).json({ message: "Rcn Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default EditReject;