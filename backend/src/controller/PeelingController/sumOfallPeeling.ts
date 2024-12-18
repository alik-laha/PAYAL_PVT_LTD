import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import RcnPeeling from "../../model/peelingModel";
import RcnEditPeeling from "../../model/peelingEditModel";

const sumOfallPeel = async (req: Request, res: Response) => {

    
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

        const data = await RcnPeeling.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('WholesPeel')), 'WholesPeel'],
                [sequelize.fn('sum', sequelize.col('WholesUnpeel')), 'WholesUnpeel'],
                [sequelize.fn('sum', sequelize.col('DP')), 'DP'],
                [sequelize.fn('sum', sequelize.col('DS')), 'DS'],
                [sequelize.fn('sum', sequelize.col('DP1')), 'DP1'],
                [sequelize.fn('sum', sequelize.col('JJH')), 'JJH'],
                [sequelize.fn('sum', sequelize.col('SJH')), 'SJH'],
                [sequelize.fn('sum', sequelize.col('SJH1')), 'SJH1'],
                [sequelize.fn('sum', sequelize.col('JH1')), 'JH1'],
                [sequelize.fn('sum', sequelize.col('JK_K')), 'JK_K'],
                [sequelize.fn('sum', sequelize.col('SP1')), 'SP1'],
                [sequelize.fn('sum', sequelize.col('Husk')), 'Husk'],
                [sequelize.fn('sum', sequelize.col('Big_Taiho')), 'Big_Taiho'],
                [sequelize.fn('sum', sequelize.col('UnpeelPiece')), 'UnpeelPiece']
               
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        const EditData = await RcnEditPeeling.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfallPeel;