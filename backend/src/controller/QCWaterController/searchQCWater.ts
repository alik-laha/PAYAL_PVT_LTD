import { Request, Response } from "express";

import { Op } from "sequelize";
import QCWater from "../../model/QCWaterModel";

const SearchQCWater = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { type,fromDate, toDate } = req.body;
       
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
        if (type) {
          
            whereClause.push({
                boilertype:type
            })
            
        }
       
   
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await QCWater.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await QCWater.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export default SearchQCWater;