import { Request, Response } from "express";
import AbhayMc from "../../../model/cleaningAbhayMcModel";


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
        let AbhayMcEntity;
        if (limit === 0 && offset === 0) {
            AbhayMcEntity = await AbhayMc.findAll({
                where,
                order: [['date', 'DESC']],
            });
        }
        else {
            AbhayMcEntity = await AbhayMc.findAll({
                where,
                order: [['date', 'DESC']],
                limit,
                offset
            });
        }
        return res.status(200).json(AbhayMcEntity);
    }
    catch (error) {
        console.log(error);
    }
}
export default ViewBoillingCleaning;