import { Request, Response } from "express";
import QceditRCN from "../../model/qcRCNeditmodel";
import { qcRCNModifyProps } from "../../type/type";
import QcRCN from "../../model/qcRCNmodel";

const ApproveEditQCRcn = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const approvedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const rcn: qcRCNModifyProps | null = await QceditRCN.findOne({
            where: {
                id
            }
        }) as qcRCNModifyProps | null;
        if (!rcn) {
            return res.status(400).json({ message: "QC Entry not found" });
        }
        const rcnEdit = await QcRCN.update({
            
            sampling: rcn.sampling,
            moisture: rcn.moisture,
            nutCount: rcn.nutCount,
            fluteRate: rcn.fluteRate,
            goodKernel: rcn.goodKernel,
            spIm: rcn.spIm,
            reject: rcn.reject,
            shell: rcn.shell,
            outTurn: rcn.outTurn,
            Remarks: rcn.Remarks,
            qcapprovedBy: rcn.qcapprovedBy,
            reportStatus: 1,
            createdBy: rcn.createdBy,
            editStatus: 'Approved',
            editapprovedBy: approvedBy

        }, {
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "QC Entry is not found" });
        }
        const rcnEditDelete = await QceditRCN.destroy({
            where: {
                id
            }
        });
        if (!rcnEditDelete) {
            return res.status(400).json({ message: "QC Entry is not found" });
        }



        return res.status(200).json({ message: "Edit Request of QC Report is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default ApproveEditQCRcn;