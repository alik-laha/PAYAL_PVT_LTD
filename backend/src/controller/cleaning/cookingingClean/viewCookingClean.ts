import { Request, Response } from "express";
import CookingCleaning from "../../../model/cleaningCookingModel";


const ViewBoillingCleaning = async (req: Request, res: Response) => {
    try {
        const { fromDate, toDate, mc_name } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;
        const whereClause = [];
        if (fromDate && toDate) {
            whereClause.push({
                date: {
                    $between: [fromDate, toDate]
                }
            });
        }
        if (mc_name) {
            whereClause.push({
                mc_name
            });
        }
        const where = whereClause.length > 0 ? { $and: whereClause } : {};
        let BoillingCleanEntries;
        if (limit === 0 && offset === 0) {
            BoillingCleanEntries = await CookingCleaning.findAll({
                where,
                order: [['date', 'DESC']],
            });
        }
        else {
            BoillingCleanEntries = await CookingCleaning.findAll({
                where,
                order: [['date', 'DESC']],
                limit,
                offset
            });
        }
        return res.status(200).json(BoillingCleanEntries);
    }
    catch (error) {
        console.log(error);
    }
}
export default ViewBoillingCleaning;