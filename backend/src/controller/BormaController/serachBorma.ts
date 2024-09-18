import { Request, Response } from "express";
import { Op } from "sequelize";
import RcnBorma from "../../model/bormaModel";


const SearchRCNBorma = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin} = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                LotNo: {
                    [Op.like]: `%${searchitem}%`
                }
            });
        }
        if (fromDate && toDate) {
            whereClause.push({
                recevingDate: {
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
        whereClause.push({
            BormaStatus: {
                [Op.eq]: 1
            }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await RcnBorma.findAll({
                where,
                order: [['LotNo','DESC'],['date', 'DESC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await RcnBorma.findAll({
                where,
                order: [['LotNo','DESC'],['date', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ msg: 'Borma Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Borma server error', error: err })
    }
 
}
export default SearchRCNBorma