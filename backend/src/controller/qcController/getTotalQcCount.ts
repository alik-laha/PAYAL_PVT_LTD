import { Request, Response } from "express";
import QcRCN from "../../model/qcRCNmodel";
import RcnPrimary from "../../model/RcnEntryModel";

import { Op } from "sequelize";


const getTotalQcCount = async (req: Request, res: Response) => {
    try {
        const pendingQC = await RcnPrimary.count({
            where: {
                [Op.and]: [
                    { rcnStatus: { [Op.like]: `QC Pending` } },
                    { editStatus: { [Op.notLike]: `Pending` } }
                ]
            }
        });
        const approvedQC = await RcnPrimary.count({
            where: {
                [Op.and]: [
                    { rcnStatus: { [Op.like]: `QC Approved` } },
                    { editStatus: { [Op.notLike]: `Pending` } }
                ]
            }
        });
       
        const completereport = await QcRCN.count({
            where: { reportStatus: 1 },
            include: [{
                model: RcnPrimary,
                required: true, 
                where:{
                    editStatus: {
                        [Op.notLike]: `%Pending%`
                    }
                }
              }]
        });
        

        //finalpendingreport start
        const pendingReport = await QcRCN.count({
            where: { reportStatus: 0 },
            include: [{
                model: RcnPrimary,
                required: true, // this is optional since 'required: false' is the default behavior for LEFT JOIN
                where:{
                    [Op.and]: [
                        { rcnStatus: { [Op.notLike]: `QC Rejected` } },
                        { editStatus: { [Op.notLike]: `Pending` } }
                    ]
                }
              }]
        });
        
       
        ////finalpendingreport end 

        res.status(200).json({ message: "QC Count", pendingQC, approvedQC, pendingReport, completereport });
    }
    catch (err) {
        res.status(500).json({ message: "Error in QC Report Count", error: err });
    }
}
export default getTotalQcCount;