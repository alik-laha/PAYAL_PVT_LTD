import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";
import { RcnPrimaryModifyProps } from "../../type/type";
import QcRCN from "../../model/qcRCNmodel";

const EditApprove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const approvedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const rcn: RcnPrimaryModifyProps | null = await RcnEdit.findOne({
            where: {
                id
            }
        }) as RcnPrimaryModifyProps | null;
        if (!rcn) {
            return res.status(400).json({ message: "Rcn Entry not found" });
        }
        const rcnEdit = await RcnPrimary.update({
            origin: rcn.origin,
            blNo: rcn.blNo,
            conNo: rcn.conNo,
            truckNo: rcn.truckNo,
            noOfBags: rcn.noOfBags,
            blWeight: rcn.blWeight,
            netWeight: rcn.netWeight,
            editStatus: "Approved",
            rcnStatus: rcn.rcnStatus,
            receivedBy: rcn.editedBy,
            approvedBy:approvedBy,
            date:rcn.date
        }, {
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Rcn Entry is not found" });
        }
        const rcnEditDelete = await RcnEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEditDelete) {
            return res.status(400).json({ message: "Rcn Entry is not found" });
        }

        const qcRcn = await QcRCN.update({
            origin: rcn.origin,
            blNo: rcn.blNo,
            conNo: rcn.conNo,
            date:rcn.date
        }, {
            where: {
                id
            }
        });

        if (!qcRcn) {
            return res.status(400).json({ message: "qcRCN Update is not Done" });
        }

        return res.status(200).json({ message: "Edit Request of Rcn Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default EditApprove;