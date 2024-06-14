import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";


const EditReject = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;


         const rejectedBy = req.cookies.user;

        // const rejectedBy = req.cookies.user;
  

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await RcnPrimary.update({

            editStatus: "NA",
            approvedBy:rejectedBy

          
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