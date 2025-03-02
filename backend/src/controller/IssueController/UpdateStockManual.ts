import { Request, Response } from 'express';
import { updateStock } from '../../Cronjobs/stockupdate';


export const manualStockUpdate = async (req: Request, res: Response) => {
    try {
        await updateStock();
        res.status(200).json({ message: 'Stock update triggered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock.' });
    }
};