import { Request, Response } from "express";
import Grading from "../../model/RcnGradingModel";
import { Op } from "sequelize";

const SearchGrading = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { searchData, fromDate, toDate } = req.body;
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
        if (fromDate && toDate) {
            whereClause.push({
                date: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }
        if (searchData) {
            whereClause.push({
                [Op.or]: [
                    { origin: { [Op.like]: `%${searchData}%` } },
                    { grading_lotNo: { [Op.like]: `%${searchData}%` } },
                    { Mc_name: { [Op.like]: `%${searchData}%` } }
                ]
            });
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let GradingEntries;
        if (limit === 0 && offset === 0) {
            GradingEntries = await Grading.findAll({
                where,
                order: [['createdAt', 'DESC']], // Order by date descending

            });
        }
        else {
            GradingEntries = await Grading.findAll({
                where,
                order: [['createdAt', 'DESC']], // Order by date descending
                limit,
                offset
            });
        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
}
export default SearchGrading;