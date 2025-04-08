import { Request, Response } from "express";
import StoreStockModel from "../../model/stoteStock";
import ItemIssue from "../../model/itemissueModel";
import sequelize from '../../config/databaseConfig';
import { Op } from 'sequelize';


const skuDataExcelDownload = async (req: Request, res: Response) => {
    let finalData=[]
    const stockData = await StoreStockModel.findAll({
        attributes: [
            'sku',"thresoldquantity","quantity"
        ],
    });
    finalData=stockData
    stockData.map(async(item)=>{
        const stockConsumeData = await ItemIssue.findOne({
            attributes: [
                'materialName',
                [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']
            ],
            where: {
                [Op.and]: [{ materialName: `${item.dataValues.sku}` }, 
                    { editStatus: { [Op.notLike]: 'Pending'} }]
            },
            group: ["materialName"]
        });


    })

    
    // return res.status(200).json({Data: await ItemIssue.findAll()});
}
export default skuDataExcelDownload