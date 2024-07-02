import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import RcnGrading from "../../model/RcnGradingModel";
import RcnPrimary from "../../model/RcnEntryModel";

function formatNumber(num:any) {
    return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
}

const getGradingStockByOrigin = async (req: Request, res: Response) => {
    try {
       
        let finalSum=0;
        let stockSum=0;
        let finalconsumedSum=0;
        const originName = req.params.origin;
        const AllOriginRcnPrimary = await RcnPrimary.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('noOfBags')), 'totalBags']
            ],
            where: {
                rcnStatus: 'QC Approved',
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'NA' }
                ],
                origin: {
                    [Op.like]: `%${originName}%`
                }
            },
            group: ['origin']
        });

        if(AllOriginRcnPrimary && AllOriginRcnPrimary.length>0){
            if(AllOriginRcnPrimary[0].dataValues.totalBags){
                //stockSum=AllOriginRcnPrimary[0].dataValues.totalBags;
                //const formattedstockSum=formatNumber(parseFloat(AllOriginRcnPrimary[0].dataValues.totalBags));
                
                stockSum = Number(parseFloat(AllOriginRcnPrimary[0].dataValues.totalBags).toFixed(2));
                
            }
            
        }
        
        //console.log(AllOriginRcnPrimary)
        console.log(stockSum)
        const AllOriginGrading = await RcnGrading.findAll({
            attributes: [
                
                [sequelize.fn('sum', sequelize.col('A')), 'totalA'],
                [sequelize.fn('sum', sequelize.col('B')), 'totalB'],
                [sequelize.fn('sum', sequelize.col('C')), 'totalC'],
                [sequelize.fn('sum', sequelize.col('D')), 'totalD'],
                [sequelize.fn('sum', sequelize.col('E')), 'totalE'],
                [sequelize.fn('sum', sequelize.col('F')), 'totalF'],
                [sequelize.fn('sum', sequelize.col('G')), 'totalG'],
                [sequelize.fn('sum', sequelize.col('dust')), 'totalDust']
            ],
            where: {
                
                origin: {
                    [Op.like]: `%${originName}%`
                }
            },
            group: ['origin']
        });
        //console.log(AllOriginGrading)
       
   

        if (AllOriginGrading.length > 0) {
            const dataValues = AllOriginGrading[0].dataValues;
            finalconsumedSum = [
                'totalA',
                'totalB',
                'totalC',
                'totalD',
                'totalE',
                'totalF',
                'totalG',
                'totalDust'
            ].reduce((sum, key) => {
                const value = dataValues[key] ? parseFloat(dataValues[key]) : 0;
                return sum + value;
            }, 0);
        }
        
        const formattedFinalConsumedSum = formatNumber(finalconsumedSum);
        console.log(formattedFinalConsumedSum);
        
         finalSum = formatNumber(stockSum - formattedFinalConsumedSum);

        // Send the result as a response
        return res.status(200).json({ finalSum});
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default getGradingStockByOrigin;