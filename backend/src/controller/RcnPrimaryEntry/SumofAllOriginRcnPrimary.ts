import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";
import { Op } from "sequelize";

const SumOfAllOriginRcnPrimary = async (req: Request, res: Response): Promise<Response> => {
    try {
        const AllOriginRcnPrimary = await RcnPrimary.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('noOfBags')), 'totalBags']
            ],
            where: {
                rcnStatus: 'QC Approved',
                
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'Created' }
                ]
            },
            group: ['origin']
        });
        const CountPendingEdit = await RcnEdit.count();

        // Send the result as a response
        return res.status(200).json({ AllOriginRcnPrimary, CountPendingEdit });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
};
export default SumOfAllOriginRcnPrimary