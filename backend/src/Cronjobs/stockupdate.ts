import cron from 'node-cron';

import { Op } from 'sequelize';
import sequelize from '../config/databaseConfig';
import StoreStockModel from '../model/stoteStock';
import storePrimaryModel from "../model/storePrimaryModel";
import { StoreStockData } from '../type/type';

// Function to fetch and update stock quantities
const updateStock = async () => {
    try {
        const stockData = await storePrimaryModel.findAll({
            attributes: [
                'sku',
                [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']
            ],
            where: {
                [Op.or]: [{ editStatus: 'Accepted' }, { editStatus: 'N/A' }]
            },
            group: ['sku']
        });

        for (const stock of stockData) {
            const { sku, totalQuantity } = stock.dataValues;

            
            // await StoreStockModel.upsert({ sku, quantity: totalQuantity });

            // Fetch existing threshold quantity (default 0)
            const existingStock:StoreStockData = await StoreStockModel.findOne({ where: { sku } }) as unknown as StoreStockData;
            const thresholdQuantity = existingStock ? existingStock.thresoldquantity : '0';

            if(existingStock){
                await StoreStockModel.update({
                    quantity: parseFloat(totalQuantity) + parseFloat(thresholdQuantity),
                    thresoldQuantity: thresholdQuantity, // Ensure threshold remains unchanged
                }, { where: { sku:existingStock.sku } });

            }
            else{
                await StoreStockModel.create({
                    sku,
                    quantity:totalQuantity,
                    thresoldQuantity:0
                })
            }
            // Upsert with new quantity calculation
            // await StoreStockModel.upsert({
            //     sku,
            //     quantity: parseFloat(totalQuantity) + parseFloat(thresholdQuantity),
            //     thresoldQuantity: thresholdQuantity, // Ensure threshold remains unchanged
            // });
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