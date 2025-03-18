import { Request, Response } from 'express';
import { updateProductionGradeStock } from '../../Cronjobs/stockupdateProductionGrade';
import { Op } from 'sequelize';
import productionStockGrade from '../../model/productionStockgrade';


export const manualProdStockUpdate = async (req: Request, res: Response) => {
    try {
        await updateProductionGradeStock();
        res.status(200).json({ message: 'Production Stock update triggered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update production stock.' });
    }
};

export const prodStockSearch = async (req: Request, res: Response) => {
    try {
        const { grade,section, origin} = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
      
      
        if (origin) {
            whereClause.push({
                origin:origin
            });
        }
        
        if (section) {
            whereClause.push({
                section:section
            });
        }

        if (grade) {
            whereClause.push({
                grade: grade
            });
        }

  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await productionStockGrade.findAll({
                where,
                order: [['section','ASC'],['origin','ASC'],['grade', 'ASC']], // Order by ASC
                
            });
        }
        else{
             rcnEntries = await productionStockGrade.findAll({
                where,
                order: [['id','ASC']],// Order by ASC
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Prod Stock Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};