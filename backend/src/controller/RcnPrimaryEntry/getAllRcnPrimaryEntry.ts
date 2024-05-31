import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";

const getAllRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const size = parseInt(req.query.limit as string, 10) || 10;

        const offset = (page - 1) * size;
        const limit = size;

        const { count, rows: data } = await RcnPrimary.findAndCountAll({
            order: [['date', 'DESC']],
            limit,
            offset,
            // Order by createdAt in descending order
        });

        res.status(200).json({
            data,
            currentPage: page,
            totalPages: Math.ceil(count / size),
            totalItems: count
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}
export default getAllRcnPrimaryEntry;