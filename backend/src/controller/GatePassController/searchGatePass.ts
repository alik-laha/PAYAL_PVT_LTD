import { Request, Response } from "express";

import { Op } from "sequelize";
import gatePassMaster from "../../model/gatePassMasterModel";


const SearchGatePass = async (req: Request, res: Response) => {
    try {
        const { blConNo, fromDate, toDate, section } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (blConNo) {
            whereClause.push({
                [Op.or]: [
                    { gatePassNo: { [Op.like]: `%${blConNo}%` } },
                    { DocNo: { [Op.like]: `%${blConNo}%` } }
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

        if (section) {
            whereClause.push({
                section: {
                    [Op.like]: `%${section}%`
                }
            });
        }
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await gatePassMaster.findAll({
                where,
                order: [['date', 'DESC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await gatePassMaster.findAll({
                where,
                order: [['date', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ msg: 'gatePass Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
 
}
export default SearchGatePass