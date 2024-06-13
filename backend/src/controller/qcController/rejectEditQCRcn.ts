import { Request, Response } from "express";
import QcRCN from "../../model/qcRCNmodel";
import QceditRCN from "../../model/qcRCNeditmodel";


const rejectEditQCRcn = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

         const rejectedBy = req.cookies.user;
        //const rejectedBy = "RC Admin 2";
        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await QcRCN.update({
            editStatus: "NA",
            editapprovedBy:rejectedBy,
            reportStatus:1
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "QC Entry not found" });
        }
        const rcnEdit = await QceditRCN.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "QC Entry not found" });
        }
        return res.status(200).json({ message: "QC Report Edit Request is Reverted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default rejectEditQCRcn;