import { Request, Response } from "express";
import QcRCN from "../../model/qcRCNmodel";
import RcnPrimary from "../../model/RcnEntryModel";
import { Op } from "sequelize";

const SearchQcRCN = async (req: Request, res: Response) => {
    try {
        const { reportStatus,blConNo, fromDate, toDate, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;
        console.log(reportStatus)
        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (blConNo) {
            whereClause.push({
                [Op.or]: [
                    { blNo: { [Op.like]: `%${blConNo}%` } },
                    { conNo: { [Op.like]: `%${blConNo}%` } }
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

        if (reportStatus!==undefined) {
            whereClause.push({
                reportStatus: {
                    [Op.eq]: `%${reportStatus}%`
                }
            });
        }

        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await QcRCN.findAll({
                where,
                order: [['date', 'DESC']], // Order by date descending
                include: [{
                    model: RcnPrimary,
                    required: false 
                  }]
                
            });
        }
        else{
             rcnEntries = await QcRCN.findAll({
                where,
                order: [['date', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset,
                include: [{
                    model: RcnPrimary,
                    required: false // this is optional since 'required: false' is the default behavior for LEFT JOIN
                  }]
            });
        }
       
        return res.status(200).json({ msg: 'Rcn Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default SearchQcRCN