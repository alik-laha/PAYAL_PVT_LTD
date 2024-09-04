import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";

import { Op } from "sequelize";

const getStockByOrigin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const originName = req.params.origin;
        const AllOriginRcnPrimary = await RcnPrimary.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('noOfBags')), 'totalBags']
            ],
            where: {
                rcnStatus: 'QC Approved',
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
        return res.status(200).json({ AllOriginRcnPrimary });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
   
};
export default getStockByOrigin