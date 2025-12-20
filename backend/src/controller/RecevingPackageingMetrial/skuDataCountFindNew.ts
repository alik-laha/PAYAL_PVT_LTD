import { Request, Response } from "express";



import StoreStockNew from "../../model/storeStockModelNew";

function formatNumber(num: any) {
    const value = Number(num); // convert string → number
    return Number.isInteger(value) ? value : value.toFixed(2);
}

const SkudataCountFindNew = async (req: Request, res: Response) => {
    try {
        let finalSum ;
        const material = req.body.sku;

        const StockStorePrimary = await StoreStockNew.findOne({
            attributes: ['currentStock'],
            where: { sku: material },
            //raw: true
        });

      if (StockStorePrimary?.dataValues.currentStock !== undefined) {
    finalSum = formatNumber(StockStorePrimary.dataValues.currentStock);
}

        return res.status(200).json({ finalSum });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal error while finding issue Sum" });
    }
};

export default SkudataCountFindNew;