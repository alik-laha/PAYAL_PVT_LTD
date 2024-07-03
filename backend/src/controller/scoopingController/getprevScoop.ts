import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";
import LotNo from "../../model/lotNomodel";
import { lotNoData } from "../../type/type";
import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";

const getprevScoop = async (req: Request, res: Response) => {

    try {
        let finalSum=0;
         // Get the latest sequence ID from the database
        const latestSequence: lotNoData | null = await LotNo.findOne({
        order: [['id', 'DESC']] ,
        }) as lotNoData | null;

        const PrevData = await RcnScooping.findAll({
            attributes: [
                'LotNo',
                [sequelize.fn('sum', sequelize.col('noOfBags')), 'totalBags']
            ],
            where: {
                LotNo:  `%${latestSequence}%`,
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'NA' }
                ],
               
            },
            group: ['LotNo']
        });




        res.status(200).json({ message: "Scooping Initial Entry Made Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export default getprevScoop