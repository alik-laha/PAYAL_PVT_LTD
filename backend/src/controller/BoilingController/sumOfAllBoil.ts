import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op, where } from "sequelize";
import RcnBoiling from "../../model/RcnBoilingModel";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";

const sumOfallBoil = async (req: Request, res: Response) => {
    try {

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

        const data = await RcnBoiling.findAll({
            attributes: [
                [sequelize.literal(`SUM(CASE WHEN SizeName='A' THEN Size ELSE 0 end)`), 'totalA'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='B' THEN Size ELSE 0 end)`), 'totalB'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='C' THEN Size ELSE 0 end)`), 'totalC'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='D' THEN Size ELSE 0 end)`), 'totalD'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='E' THEN Size ELSE 0 end)`), 'totalE'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='F' THEN Size ELSE 0 end)`), 'totalF'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='G' THEN Size ELSE 0 end)`), 'totalG'],
                
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
        const EditData = await RcnBoilingEdit.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfallBoil;