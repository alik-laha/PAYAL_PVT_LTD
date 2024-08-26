import { Request, Response } from "express";
import { Op } from "sequelize";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";


const SearchAlmondPrimary = async (req: Request, res: Response) => {
    try {
        const { searchitem, gatetype,fromDate, toDate, almondtype,almondgrade } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                [Op.or]: [
                    { gatePassNo: { [Op.like]: `%${searchitem}%` } },
                    { invoice: { [Op.like]: `%${searchitem}%` } }
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

        if (almondtype) {
            whereClause.push({
                type: {
                    [Op.like]: `%${almondtype}%`
                }
            });
        }
        if (almondgrade) {
            whereClause.push({
                grade: {
                    [Op.like]: `%${almondgrade}%`
                }
            });
        }
        if (gatetype) {
            whereClause.push({
                gateType: {
                    [Op.like]: `%${gatetype}%`
                }
            });
        }
        whereClause.push({
            status: {
                [Op.eq]: 1
            }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await almondPrimaryEntryModel.findAll({
                where,
                order: [['gatePassNo','DESC'],['recevingDate', 'DESC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await almondPrimaryEntryModel.findAll({
                where,
                order: [['gatePassNo','DESC'],['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ msg: 'Almond Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
 
}
export default SearchAlmondPrimary