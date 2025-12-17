import { Request, Response } from "express";

import { Op } from "sequelize";

import ItemIssue from "../../model/itemissueModel";
import sequelize from "../../config/databaseConfig";

const SearchIssueItem = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { isssueId, unit, section,type,fromDate, toDate,sku } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
        let whereClause2 = []
        if (fromDate && toDate) {
            if(type == 'ItemWise'){
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            }
            else{
                whereClause2.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            }
           
            
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
        if (sku) {
            if (type == 'ItemWise') {
                whereClause.push({
                    materialName: {
                        [Op.like]: `%${sku}%`
                    }
    
                })
            }
        }
        if (unit) {
            if (type == 'ItemWise') {
                whereClause.push({
                    sectionunit:unit
                })
            }
            else{
                whereClause2.push({
                    sectionunit:unit
                })
            }
           
        }
        if (section) {
            if (type == 'ItemWise') {
                whereClause.push({
                    section:section
                })
            }
            else{
                whereClause2.push({
                    section:section
                })
            }
           
        }
        if (type == 'ItemWise') {
            whereClause2.push({
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'NA' }
                ]
            })
        }
   
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        const where2 = whereClause2.length > 0 ? { [Op.and]: whereClause2} : {};
        let GradingEntries;
        if (limit === 0 && offset === 0) {

            if (type == 'ItemWise') {
                GradingEntries = await ItemIssue.findAll({
                    where,
                    order: [['issueID', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            } 
            else {
               GradingEntries = await ItemIssue.findAll({
                    attributes: [
                        'sectionunit',
                        [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalIssuePrice']
                        
                    ],
                    where:where2,
                    group: ['date','sectionunit','category'],
                    order: [['date', 'DESC'], ['sectionunit', 'ASC'],['category', 'ASC']]
                });

            }

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
            else {
                
                GradingEntries = await ItemIssue.findAll({
                    attributes: [
                        'date','sectionunit','category',
                        [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalIssuePrice']
                        
                    ],
                    where: where2,
                    group: ['date','sectionunit','category'],
                    order: [['date', 'DESC'], ['sectionunit', 'ASC'],['category', 'ASC']],limit,
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
export default SearchIssueItem;