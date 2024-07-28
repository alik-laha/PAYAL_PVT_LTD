import { Request, Response } from "express";

import { Op } from "sequelize";

import RcnAllScooping from "../../model/scoopingAllmodel";
import RcnScooping from "../../model/scoopingModel";

const SearchScooping = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { blConNo, fromDate, toDate, origin, type } = req.body;
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
            if (type == 'LineWise') {
                whereClause.push({
                
                    [Op.or]: [
                        { LotNo: { [Op.like]: `%${blConNo}%` } },
                        { Scooping_Line_Mc: { [Op.like]: `%${blConNo}%` } }
                    ]
    
                })
            }
            else{
                whereClause.push({
                    LotNo: {
                        [Op.like]:  `%${blConNo}%`
                    }
                });

            }
           

        }
        if (origin) {
            whereClause.push({
                origin
            })
        }
        if (type == 'LineWise') {
            whereClause.push({
                scoopStatus: { [Op.eq]: 1 }
            })
        }


        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let GradingEntries;
        if (limit === 0 && offset === 0) {

            if (type == 'LotWise') {
                GradingEntries = await RcnAllScooping.findAll({
                    where,
                    order: [['LotNo', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            } else {
                GradingEntries = await RcnScooping.findAll({
                    where,
                    order: [['LotNo', 'DESC'], ['Scooping_Line_Mc','ASC'],['date', 'DESC']] // Order by date descending

                });

            }

        }
        else {
            if (type == 'LotWise') {
                GradingEntries = await RcnAllScooping.findAll({
                    where,
                    order: [['LotNo', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            }
            else {
                GradingEntries = await RcnScooping.findAll({
                    where,
                    order: [['LotNo', 'DESC'], ['Scooping_Line_Mc','ASC'],['date', 'DESC']],
                    limit,
                    offset
                });

            }

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export default SearchScooping;