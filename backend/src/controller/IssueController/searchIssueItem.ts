import { Request, Response } from "express";

import { Op } from "sequelize";

import RcnAllScooping from "../../model/scoopingAllmodel";
import RcnScooping from "../../model/scoopingModel";
import ItemIssue from "../../model/itemissueModel";

const SearchIssueItem = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { isssueId, fromDate, toDate, unit, section,type } = req.body;
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
        if (isssueId) {
            if (type == 'ItemWise') {
                whereClause.push({
                    issueID: {
                        [Op.like]: `%${isssueId}%`
                    }
    
                })
            }
        }
        if (unit) {
            whereClause.push({
                sectionunit:unit
            })
        }
        if (section) {
            whereClause.push({
                section:section
            })
        }
   
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let GradingEntries;
        if (limit === 0 && offset === 0) {

            if (type == 'ItemWise') {
                GradingEntries = await ItemIssue.findAll({
                    where,
                    order: [['issueID', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            } 
            // else {
            //     GradingEntries = await RcnScooping.findAll({
            //         where,
            //         order: [['LotNo', 'DESC'], ['Scooping_Line_Mc','ASC'],['date', 'DESC']] // Order by date descending

            //     });

            // }

        }
        else {
            if (type == 'ItemWise') {
                GradingEntries = await ItemIssue.findAll({
                    where,
                    order: [['issueID', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            }
            // else {
            //     GradingEntries = await RcnScooping.findAll({
            //         where,
            //         order: [['LotNo', 'DESC'], ['Scooping_Line_Mc','ASC'],['date', 'DESC']],
            //         limit,
            //         offset
            //     });

            // }

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export default SearchIssueItem;