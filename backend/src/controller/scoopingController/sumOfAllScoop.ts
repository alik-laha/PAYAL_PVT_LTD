import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";

import RcnScooping from "../../model/scoopingModel";

const sumOfAllScoop = async (req: Request, res: Response) => {
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

        const data = await RcnScooping.findAll({
            attributes: [
                [sequelize.literal(`SUM(CASE WHEN SizeName='A' THEN Wholes ELSE 0 end)`), 'WholesA'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='B' THEN Wholes ELSE 0 end)`), 'WholesB'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='C' THEN Wholes ELSE 0 end)`), 'WholesC'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='D' THEN Wholes ELSE 0 end)`), 'WholesD'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='E' THEN Wholes ELSE 0 end)`), 'WholesE'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='F' THEN Wholes ELSE 0 end)`), 'WholesF'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='G' THEN Wholes ELSE 0 end)`), 'WholesG'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='A' THEN Broken ELSE 0 end)`), 'BrokenA'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='B' THEN Broken ELSE 0 end)`), 'BrokenB'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='C' THEN Broken ELSE 0 end)`), 'BrokenC'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='D' THEN Broken ELSE 0 end)`), 'BrokenD'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='E' THEN Broken ELSE 0 end)`), 'BrokenE'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='F' THEN Broken ELSE 0 end)`), 'BrokenF'],
                [sequelize.literal(`SUM(CASE WHEN SizeName='G' THEN Broken ELSE 0 end)`), 'BrokenG'],
                
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], date: {
                    [Op.between]: [targetDate, today]
                },scoopStatus:1
            }
        });
        const EditData = await RcnScooping.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfAllScoop;