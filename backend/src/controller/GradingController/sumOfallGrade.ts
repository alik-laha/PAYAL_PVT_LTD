import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";
import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";

const sumOfallGrade = async (req: Request, res: Response) => {
    try {
        const data = await RcnGrading.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('A')), 'totalA'],
                [sequelize.fn('sum', sequelize.col('B')), 'totalB'],
                [sequelize.fn('sum', sequelize.col('C')), 'totalC'],
                [sequelize.fn('sum', sequelize.col('D')), 'totalD'],
                [sequelize.fn('sum', sequelize.col('E')), 'totalF'],
                [sequelize.fn('sum', sequelize.col('G')), 'totalG'],
                [sequelize.fn('sum', sequelize.col('dust')), 'totalDust']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "Created" }
                ]
            }
        });
        const EditData = await RcnGradingEdit.findAll()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfallGrade;