import { Request, Response } from "express";

import { Op } from "sequelize";
import RcnBoiling from "../../model/RcnBoilingModel";
import sequelize from "../../config/databaseConfig";

const SearchBoiling = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { blConNo, fromDate, toDate, origin,SizeName,type } = req.body;
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
        if (blConNo) {
            whereClause.push({
                [Op.or]: [

                    { LotNo: { [Op.like]: `%${blConNo}%` } },
                    { Scooping_Line_Mc: { [Op.like]: `%${blConNo}%` } }
                ]
            });
        }
        if (origin) {
            whereClause.push({
                origin
            })
        }
        if (SizeName) {
            whereClause.push({
                SizeName
            })
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let GradingEntries;
        if(type==='line'){
             if (limit === 0 && offset === 0) {
            GradingEntries = await RcnBoiling.findAll({
                where,
                order: [['id','DESC']], // Order by date descending

            });
        }
        else {
            GradingEntries = await RcnBoiling.findAll({
                where,
                order: [['id','DESC']], // Order by date descending
                limit,
                offset
            });
        }
        }
        else{
            GradingEntries = await RcnBoiling.findAll({
            attributes: [
                'LotNo','date','CreatedBy','noOfEmployees',
                [sequelize.fn('sum', sequelize.col('Size')), 'quantity']
            ],where, // Apply filters to the grouping
            group: ['LotNo','date','CreatedBy','noOfEmployees'],
            order: [['LotNo', 'DESC']], // Optional: Order the final grouped results
        });
        }
       
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export default SearchBoiling;