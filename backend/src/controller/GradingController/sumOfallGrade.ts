import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";
import { Op } from "sequelize";

const sumOfallGrade = async (req: Request, res: Response) => {
    try {
        const data = await RcnGrading.findAll({
            attributes: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'dust',
                'Mc_runTime'
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "Pending" }
                ]
            }
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}