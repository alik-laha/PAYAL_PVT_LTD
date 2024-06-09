import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import { qcapproveprops } from "../../type/type";
import QcRCN from "../../model/qcRCNmodel";

const approveQCinitial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const qcapprovedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !qcapprovedBy) {
            return res.status(400).json({ message: "Invalid Id or QC-Approved by" });
        }
        const rcn: qcapproveprops | null = await RcnPrimary.findOne({
            where: {
                id
            },attributes:['rcnStatus']
        }) as qcapproveprops | null;
        if (!rcn) {
            return res.status(400).json({ message: "Rcn Entry not found" });
        }
        const rcnEdit = await RcnPrimary.update({
            rcnStatus: 'QC Approved'
            
        }, {
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Rcn Entry is not found" });
        }
        const QcRCNApprove = await QcRCN.update({
            qcapprovedBy:qcapprovedBy
        },{
            where: {
                id
            }
        });
        if (!QcRCNApprove) {
            return res.status(400).json({ message: "QC Rcn Entry is not found" });
        }
        return res.status(200).json({ message: "QC Approval of Rcn Entry is made Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default approveQCinitial;