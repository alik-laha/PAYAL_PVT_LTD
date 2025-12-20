import { Request, Response } from "express";
import StoreStockNew from "../../model/storeStockModelNew";



const skuDataExcelDownloadNew = async (req: Request, res: Response) => {

    const stockData = await StoreStockNew.findAll({
    });
     return res.status(200).json({message:'Stock Fetched Successfully',data:stockData});
}
export default skuDataExcelDownloadNew