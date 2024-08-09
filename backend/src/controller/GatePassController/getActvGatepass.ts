import { Request, Response } from "express";
import gatePass from "../../model/gatepassModel";
import gatePassMaster from "../../model/gatePassMasterModel";
import { Op } from "sequelize";

const getActvGatepass = async (req: Request, res: Response) => {
    try {
        const Issued = await gatePassMaster.count({ col:'gatePassNo'});
            const completed  = await gatePassMaster.count({ col:'gatePassNo',
                where: { status: 'Closed' } });
                const Pendingapprove = await gatePassMaster.count({col:'gatePassNo',
                    where: { netWeight: { [Op.gt]: 0 },receivingStatus: 1,approvalStatus:0 } });
                    const Pendingrelease = await gatePassMaster.count({ col:'gatePassNo',
                        where: { status: { [Op.notLike]: 'Closed' } ,receivingStatus: 1,approvalStatus:1} });
                    
        res.status(200).json({ message: "Gate Pass Count", Issued,completed,Pendingapprove, Pendingrelease});
    }
    catch (err) {
        res.status(500).json({ message: "Error in ActiveGatePassCount", error: err });
    }
}
export default getActvGatepass;