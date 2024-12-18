import { Request, Response } from "express";
import RcnEditPeeling from "../../model/peelingEditModel";
import RcnPeeling from "../../model/peelingModel";


const EditRejectPeeling = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await RcnPeeling.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Peeling Entry not found" });
        }
        const rcnEdit = await RcnEditPeeling.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Peeling Entry not found" });
        }
        return res.status(200).json({ message: "Peeling Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default EditRejectPeeling;