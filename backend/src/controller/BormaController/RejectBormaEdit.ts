import { Request, Response } from "express";
import RcnBorma from "../../model/bormaModel";
import RcnBormaEdit from "../../model/bormaEditModel";


const EditRejectBorma = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await RcnBorma.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Borma Entry not found" });
        }
        const rcnEdit = await RcnBormaEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Borma Entry not found" });
        }
        return res.status(200).json({ message: "Borma Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default EditRejectBorma;