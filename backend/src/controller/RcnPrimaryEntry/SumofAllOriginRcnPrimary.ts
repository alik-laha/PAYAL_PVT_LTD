import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";

const SumOfAllOriginRcnPrimary = async (req: Request, res: Response): Promise<Response> => {
    try {
        const AllOriginRcnPrimary = await RcnPrimary.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('noOfBags')), 'totalBags']
            ],
            group: ['origin']
        });

        // Send the result as a response
        return res.status(200).json(AllOriginRcnPrimary);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
};
export default SumOfAllOriginRcnPrimary