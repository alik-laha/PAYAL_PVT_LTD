import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import RcnGrading from "../../model/RcnGradingModel";
import RcnPrimary from "../../model/RcnEntryModel";

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
                stockSum=AllOriginRcnPrimary[0].dataValues.totalBags;
            }
            
        }

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
       
        if(AllOriginGrading.length>0){
          
            finalconsumedSum=(AllOriginGrading[0].dataValues.totalA ? AllOriginGrading[0].dataValues.totalA : 0)
                +(AllOriginGrading[0].dataValues.totalB ?AllOriginGrading[0].dataValues.totalB:0)
                +(AllOriginGrading[0].dataValues.totalC ?AllOriginGrading[0].dataValues.totalC:0)
                +(AllOriginGrading[0].dataValues.totalD ?AllOriginGrading[0].dataValues.totalD:0)
                +(AllOriginGrading[0].dataValues.totalE ?AllOriginGrading[0].dataValues.totalE:0)
                +(AllOriginGrading[0].dataValues.totalF ? AllOriginGrading[0].dataValues.totalF:0)
                +(AllOriginGrading[0].dataValues.totalG? AllOriginGrading[0].dataValues.totalG:0)
                +(AllOriginGrading[0].dataValues.totalDust ? AllOriginGrading[0].dataValues.totalDust:0)
        }

        finalSum=stockSum-finalconsumedSum

        // Send the result as a response
        return res.status(200).json({ finalSum});
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default getGradingStockByOrigin;