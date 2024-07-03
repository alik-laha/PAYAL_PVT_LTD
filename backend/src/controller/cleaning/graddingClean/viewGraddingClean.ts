import { Request, Response } from "express";
import GraddingMaintenence from "../../../model/cleaningGraddingModel";


const ViewGraddingMaintenence = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, mc_name } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;
        const whereClause = [];
        if (startDate && endDate) {
            whereClause.push({
                date: {
                    $between: [startDate, endDate]
                }
            });
        }
        if (mc_name) {
            whereClause.push({
                mc_name
            });
        }
        const where = whereClause.length > 0 ? { $and: whereClause } : {};
        let GraddingCleanEntries;
        if (limit === 0 && offset === 0) {
            GraddingCleanEntries = await GraddingMaintenence.findAll({
                where,
                order: [['date', 'DESC']],
            });
        }
        else {
            GraddingCleanEntries = await GraddingMaintenence.findAll({
                where,
                order: [['date', 'DESC']],
                limit,
                offset
            });
        }
        return res.status(200).json(GraddingCleanEntries);

    }
    catch (error) {
        console.log(error);
    }
}

export default ViewGraddingMaintenence;