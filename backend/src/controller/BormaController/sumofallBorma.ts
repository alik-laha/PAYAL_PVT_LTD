import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import RcnBorma from "../../model/bormaModel";
import RcnBormaEdit from "../../model/bormaEditModel";

const sumOfallBorma = async (req: Request, res: Response) => {
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

        const data = await RcnBorma.findAll({
            attributes: [
                [sequelize.literal(`SUM(CASE WHEN origin='India' THEN TotalOutput ELSE 0 end)`), 'India'],
                [sequelize.literal(`SUM(CASE WHEN origin='Ghana' THEN TotalOutput ELSE 0 end)`), 'Ghana'],
                [sequelize.literal(`SUM(CASE WHEN origin='IVC' THEN TotalOutput ELSE 0 end)`), 'IVC'],
                [sequelize.literal(`SUM(CASE WHEN origin='Benin' THEN TotalOutput ELSE 0 end)`), 'Benin'],
                [sequelize.literal(`SUM(CASE WHEN origin='Tanzania' THEN TotalOutput ELSE 0 end)`), 'Tanzania'],
                [sequelize.literal(`SUM(CASE WHEN origin='Nigeria' THEN TotalOutput ELSE 0 end)`), 'Nigeria'],
                [sequelize.literal(`SUM(CASE WHEN origin='Togo' THEN TotalOutput ELSE 0 end)`), 'Togo'],
                
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], date: {
                    [Op.between]: [targetDate, today]
                },
            }
        });
        const EditData = await RcnBormaEdit.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfallBorma;