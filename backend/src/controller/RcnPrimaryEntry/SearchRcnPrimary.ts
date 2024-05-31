import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import { Op } from "sequelize";

const SearchRcnPrimary = async (req: Request, res: Response) => {
    try {
        const { conBlNo, fromDate, toDate, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 1;
        const size = parseInt(req.query.limit as string, 10) || 10;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (conBlNo) {
            whereClause.push({
                [Op.or]: [
                    { blNo: { [Op.like]: `%${conBlNo}%` } },
                    { conNo: { [Op.like]: `%${conBlNo}%` } }
                ]
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                date: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }

        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        const rcnEntries = await RcnPrimary.findAll({
            where,
            order: [['createdAt', 'DESC']], // Order by date descending
            limit: size,
            offset: page
        });
        return res.status(200).json({ msg: 'Rcn Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default SearchRcnPrimary