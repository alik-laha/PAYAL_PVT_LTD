import { Request, Response } from 'express';
import { updateProductionGradeStock } from '../../Cronjobs/stockupdateProductionGrade';


export const manualProdStockUpdate = async (req: Request, res: Response) => {
    try {
        await updateProductionGradeStock();
        res.status(200).json({ message: 'Production Stock update triggered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update production stock.' });
    }
};