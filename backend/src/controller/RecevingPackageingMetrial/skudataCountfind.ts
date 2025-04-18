import { Request, Response } from "express";

import { Op } from "sequelize";
import sequelize from "../../config/databaseConfig";
import ItemIssue from "../../model/itemissueModel";
import StoreStockModel from "../../model/stoteStock";


function formatNumber(num:any) {
    return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
}
const SkudataCountFind = async (req: Request, res: Response) => {
    try {
        let finalSum=0;
        let stockSum=0;
        let finalconsumedSum=0;
        const material = req.body.sku
        // const StockStorePrimary = await storePrimaryModel.findAll({
        //     attributes: [
        //         'sku',
        //         [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']
        //     ],
        //     where: {
                
        //         [Op.or]: [
        //             { editStatus: 'Accepted' },
        //             { editStatus: 'N/A' }
        //         ],
        //         sku: {
        //             [Op.like]: `%${material}%`
        //         }
        //     },
        //     group: ['sku']
        // });

        // if(StockStorePrimary && StockStorePrimary.length>0){
        //     if(StockStorePrimary[0].dataValues.totalQuantity){ 
        //         stockSum = Number(parseFloat(StockStorePrimary[0].dataValues.totalQuantity).toFixed(2));   
        //     }
            
        // }

        const StockStorePrimary = await StoreStockModel.findAll({
            attributes: [
                'quantity',
            ],
            where: {
                sku: {
                    [Op.like]: `%${material}%`
                }
            },
            
        });

        if(StockStorePrimary && StockStorePrimary.length>0){
            if(StockStorePrimary[0].dataValues.quantity){ 
                stockSum = Number(parseFloat(StockStorePrimary[0].dataValues.quantity).toFixed(2));   
            }
            
        }

        console.log(stockSum)
        const itemIssueSum = await ItemIssue.findAll({
            attributes: [
                'materialName',
                [sequelize.fn('sum', sequelize.col('quantity')), 'totalIssue']
            
            ],
            where: {
               
                editStatus: {
                    [Op.notLike]: 'Pending'
                },
                
                materialName: {
                    [Op.like]: `%${material}%`
                }
            },
            group: ['materialName']
        });

        if(itemIssueSum && itemIssueSum.length>0){
            if(itemIssueSum[0].dataValues.totalIssue){ 
                finalconsumedSum = Number(parseFloat(itemIssueSum[0].dataValues.totalIssue).toFixed(2));   
            }
            
        }
        console.log(finalconsumedSum);
        
         finalSum = formatNumber(stockSum - finalconsumedSum);

        // Send the result as a response
        return res.status(200).json({ finalSum});
       
    } catch (error) {
        return res.status(500).json({ message: "internal error while finding issue Sum" });
    }
}
export default SkudataCountFind;