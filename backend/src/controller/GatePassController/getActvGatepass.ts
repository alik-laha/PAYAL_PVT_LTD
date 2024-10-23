import { Request, Response } from "express";

import gatePassMaster from "../../model/gatePassMasterModel";
import { Op } from "sequelize";

const getActvGatepass = async (req: Request, res: Response) => {
    try {
        const Issued = await gatePassMaster.count({ col:'gatePassNo'});
            const completed  = await gatePassMaster.count({ col:'gatePassNo',
                where: { status: 'Closed' } });
            const Pendingapprove = await gatePassMaster.count({col:'gatePassNo',
                where: { status: { [Op.like]: 'Pending_Verification' } }});
            const Pendingrelease = await gatePassMaster.count({ col:'gatePassNo',
                where: { status: { [Op.like]: 'Pending_Release' }} });
            const PendingRcv = await gatePassMaster.count({ col:'gatePassNo',
                 where: { status: { [Op.like]: 'Pending_Receiving' } } });
            const PendingNtWt = await gatePassMaster.count({ col:'gatePassNo',
                    where: { status: { [Op.like]: 'Pending_NetWeight' } } });
                    
        res.status(200).json({ message: "Gate Pass Count", Issued,completed,Pendingapprove, Pendingrelease,PendingRcv,PendingNtWt});
    }
    catch (err) {
        res.status(500).json({ message: "Error in ActiveGatePassCount", error: err });
    }
}
export default getActvGatepass;