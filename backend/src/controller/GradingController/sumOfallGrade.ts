import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";
import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";

const sumOfallGrade = async (req: Request, res: Response) => {

    
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

        const data = await RcnGrading.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('A')), 'totalA'],
                [sequelize.fn('sum', sequelize.col('B')), 'totalB'],
                [sequelize.fn('sum', sequelize.col('C')), 'totalC'],
                [sequelize.fn('sum', sequelize.col('D')), 'totalD'],
                [sequelize.fn('sum', sequelize.col('E')), 'totalE'],
                [sequelize.fn('sum', sequelize.col('F')), 'totalF'],
                [sequelize.fn('sum', sequelize.col('G')), 'totalG'],
                [sequelize.fn('sum', sequelize.col('dust')), 'totalDust']
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
        const EditData = await RcnGradingEdit.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfallGrade;