import { Request, Response } from "express";
import { Op } from "sequelize";
import RcnPeeling from "../../model/peelingModel";


const SearchRCNPeeling = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin,type} = req.body;
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
       if (type === "LOT") {
         whereClause.push({
           [Op.and]: [
             { LotNo: { [Op.notLike]: "%V%" } },
             { LotNo: { [Op.notLike]: "%R%" } },
           ],
         });
       } else if (type === "RLOT") {
         whereClause.push({
           LotNo: {
             [Op.like]: "%R%",
           },
         });
       } else {
         whereClause.push({
           LotNo: {
             [Op.like]: "%V%",
           },
         });
       }
        whereClause.push({
            Status: {
                [Op.eq]: 1
            }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await RcnPeeling.findAll({
                where,
                order: [['date', 'DESC'],['LotNo','DESC'],], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await RcnPeeling.findAll({
                where,
                order: [['date', 'DESC'],['LotNo','DESC'],], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Peeling Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}
export default SearchRCNPeeling