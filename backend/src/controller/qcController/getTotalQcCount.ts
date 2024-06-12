import { Request, Response } from "express";
import QcRCN from "../../model/qcRCNmodel";
import RcnPrimary from "../../model/RcnEntryModel";


const getTotalQcCount = async (req: Request, res: Response) => {
    try {
        const pendingQC = await RcnPrimary.count({ 
            where: { rcnStatus: 'QC Pending' } });
            const approvedQC = await RcnPrimary.count({ 
                where: { rcnStatus: 'QC Approved' } });
            const pendingReport = await QcRCN.count({ 
                where: { reportStatus: 0 } });
                const completereport = await QcRCN.count({ 
                    where: { reportStatus: 1 } });
        res.status(200).json({ message: "QC Count", pendingQC,approvedQC,pendingReport, completereport});
    }
    catch (err) {
        res.status(500).json({ message: "Error in QC Report Count", error: err });
    }
}
export default getTotalQcCount;