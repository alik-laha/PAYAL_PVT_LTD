import { Request, Response } from "express";

import gatePassMaster from "../../model/gatePassMasterModel";
import { Op } from "sequelize";

const getActvGatepass = async (req: Request, res: Response) => {

    const today = new Date();
        let Year = today.getFullYear()
        console.log(today)
        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0,0,0,0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else{
            targetDate = new Date(`${Year}-04-01`);
        }
        
        targetDate.setHours(0,0,0,0)
        if(today.getHours()<5 || (today.getHours()===5 && today.getMinutes()<=30)){
            today.setHours(today.getHours()+5);
            today.setMinutes(today.getMinutes()+30);
        }
    try {
        const Issued = await gatePassMaster.count({ col:'gatePassNo',
            where:{date: {
                                    [Op.between]: [targetDate, today]
                                }}});
            const completed  = await gatePassMaster.count({ col:'gatePassNo',
                where: { status: 'Closed',date: {
                                    [Op.between]: [targetDate, today]
                                } } });
            const Pendingapprove = await gatePassMaster.count({col:'gatePassNo',
                where: { status: { [Op.like]: 'Pending_Verification' },date: {
                    [Op.between]: [targetDate, today]
                } }});
            const Pendingrelease = await gatePassMaster.count({ col:'gatePassNo',
                where: { status: { [Op.like]: 'Pending_Release' },date: {
                    [Op.between]: [targetDate, today]
                }} });
            const PendingRcv = await gatePassMaster.count({ col:'gatePassNo',
                 where: { status: { [Op.like]: 'Pending_Receiving' }, date: {
                    [Op.between]: [targetDate, today]
                },} });
            const PendingNtWt = await gatePassMaster.count({ col:'gatePassNo',
                    where: { status: { [Op.like]: 'Pending_NetWeight' },date: {
                    [Op.between]: [targetDate, today]
                }, } });
                    
        res.status(200).json({ message: "Gate Pass Count", Issued,completed,Pendingapprove, Pendingrelease,PendingRcv,PendingNtWt});
    }
    catch (err) {
        res.status(500).json({ message: "Error in ActiveGatePassCount", error: err });
    }
}
export default getActvGatepass;