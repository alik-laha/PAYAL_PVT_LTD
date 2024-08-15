import { Request, Response } from "express";

import { Op } from "sequelize";
import storePrimaryModel from "../../model/storePrimaryModel";
import storePrimaryEditModel from "../../model/storePrimaryEditModel";

const sumofStorePrimary = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0, 0, 0, 0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else {
            targetDate = new Date(`${Year}-04-01`);
        }


        targetDate.setHours(0, 0, 0, 0)
        if (today.getHours() < 5 || (today.getHours() === 5 && today.getMinutes() <= 30)) {
            today.setHours(today.getHours() + 5);
            today.setMinutes(today.getMinutes() + 30);
        }
        const sumofStorePrimary = await storePrimaryModel.count({
            where: {
                recevingDate: {
                    [Op.between]: [targetDate, today]
                }
                ,editStatus:{
                    [Op.notLike]:'Pending'
                },status:1
            },distinct:true,col:'gatePassNo'
        });
    
        const storePrimary = await storePrimaryEditModel.count();
        return res.status(200).json({ sumofStorePrimary, storePrimary });
    }
    catch (err) {
        console.log(err)
    }
}
export default sumofStorePrimary;