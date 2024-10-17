import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import { Op } from "sequelize";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";
import agarbatiPrimaryEntryEditModel from "../../model/agarbatiPrimaryEditModel";

const sumofAllTypeAgarbati = async (req: Request, res: Response): Promise<Response> => {
    try {
        const today = new Date();
        let Year = today.getFullYear()

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
        const AllOriginRcnPrimary = await agarbatiPrimaryEntryModel.findAll({
            attributes: [
                'type',
                [sequelize.fn('sum', sequelize.col('totalWt')), 'totalBags']
            ],
            where: {
               
                [Op.or]: [
                    { editStatus: 'Accepted' },
                    { editStatus: 'N/A' }
                ],status:1,gateType:'IN',
                recevingDate: {
                    [Op.between]: [targetDate, today]
                }
            },
            group: ['type']
        });

        const CountPendingEdit = await agarbatiPrimaryEntryEditModel.count();

        // Send the result as a response
        return res.status(200).json({ AllOriginRcnPrimary, CountPendingEdit });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
   
};
export default sumofAllTypeAgarbati