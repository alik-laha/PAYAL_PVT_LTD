import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import RcnGrading from "../../model/RcnGradingModel";

const getGradingStockByOrigin = async (req: Request, res: Response) => {
    try {
        const originName = req.params.origin;
        const AllOriginGrading = await RcnGrading.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('noOfBags')), 'totalBags']
            ],
            where: {
                
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'NA' }
                ],
                origin: {
                    [Op.like]: `%${originName}%`
                }
            },
            group: ['origin']
        });


        // Send the result as a response
        return res.status(200).json({ AllOriginGrading });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default getGradingStockByOrigin;