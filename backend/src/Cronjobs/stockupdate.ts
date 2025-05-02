import cron from 'node-cron';

import { Op } from 'sequelize';
import sequelize from '../config/databaseConfig';
import StoreStockModel from '../model/stoteStock';
import storePrimaryModel from "../model/storePrimaryModel";
import { StoreStockData } from '../type/type';

// Function to fetch and update stock quantities
const updateStock = async () => {
    try {
       
        // Step 1: Fetch IN stock grouped by SKU
        const inStockData = await storePrimaryModel.findAll({
            attributes: [
                'sku',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalInQuantity']
            ],
            where: {
                gateType: 'IN',
                editStatus: {
                    [Op.notLike]: 'Pending'
                }
            },
            group: ['sku']
        });

        // Step 2: Fetch OUT stock grouped by SKU
        const outStockData = await storePrimaryModel.findAll({
            attributes: [
                'sku',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalOutQuantity']
            ],
            where: {
                gateType: 'OUT',
                editStatus: {
                    [Op.notLike]: 'Pending'
                }
            },
            group: ['sku']
        });

        // Step 3: Build lookup maps for easy access
        const inStockMap = new Map<string, number>();
        inStockData.forEach((stock) => {
            inStockMap.set(stock.dataValues.sku, parseFloat(stock.dataValues.totalInQuantity || 0));
        });

        const outStockMap = new Map<string, number>();
        outStockData.forEach((stock) => {
            outStockMap.set(stock.dataValues.sku, parseFloat(stock.dataValues.totalOutQuantity || 0));
        });

        // Step 4: Merge all SKUs from both IN and OUT
        const allSkus = new Set([...inStockMap.keys(), ...outStockMap.keys()]);

        

        // for (const stock of stockData) {
        //     const { sku, totalQuantity } = stock.dataValues;

            
        //     // await StoreStockModel.upsert({ sku, quantity: totalQuantity });

        //     // Fetch existing threshold quantity (default 0)
        //     const existingStock:StoreStockData = await StoreStockModel.findOne({ where: { sku } }) as unknown as StoreStockData;
        //     const thresholdQuantity = existingStock ? existingStock.thresoldquantity : '0';

        //     if(existingStock){
        //         await StoreStockModel.update({
        //             quantity: parseFloat(totalQuantity) + parseFloat(thresholdQuantity),
        //             thresoldQuantity: thresholdQuantity, // Ensure threshold remains unchanged
        //         }, { where: { sku:existingStock.sku } });

        //     }
        //     else{
        //         await StoreStockModel.create({
        //             sku,
        //             quantity:totalQuantity,
        //             thresoldQuantity:0
        //         })
        //     }
        //     // Upsert with new quantity calculation
        //     // await StoreStockModel.upsert({
        //     //     sku,
        //     //     quantity: parseFloat(totalQuantity) + parseFloat(thresholdQuantity),
        //     //     thresoldQuantity: thresholdQuantity, // Ensure threshold remains unchanged
        //     // });
        // }

        // Step 5: Process each SKU
        for (const sku of allSkus) {
            const totalIn = inStockMap.get(sku) || 0;
            const totalOut = outStockMap.get(sku) || 0;
            const totalStock = totalIn - totalOut;

            const existingStock: StoreStockData = await StoreStockModel.findOne({ where: { sku } }) as unknown as StoreStockData;
            const thresholdQuantity = existingStock ? parseFloat(existingStock.thresoldquantity || '0') : 0;

            if (existingStock) {
                await StoreStockModel.update({
                    quantity: totalStock + thresholdQuantity,
                    thresoldQuantity: thresholdQuantity // preserve existing
                }, {
                    where: { sku }
                });
            } else {
                await StoreStockModel.create({
                    sku,
                    quantity: totalStock,
                    thresoldQuantity: 0
                });
            }
        }

        console.log('Stock data updated successfully.');
    } catch (error) {
        console.error('Error updating stock data:', error);
    }
};

// Schedule the job to run at 6 PM and 12 AM
cron.schedule('0 18,0 * * *', () => {
    console.log('Running scheduled stock update job...');
    updateStock();
});

export { updateStock };