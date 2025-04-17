import { Request, Response } from "express";
import StoreStockModel from "../../model/stoteStock";
import ItemIssue from "../../model/itemissueModel";
import {Op, fn, col } from 'sequelize';


const skuDataExcelDownload = async (req: Request, res: Response) => {
    let finalData=[]
    const stockData = await StoreStockModel.findAll({
        attributes: [
            'sku',"thresoldquantity","quantity"
        ],
    });


    finalData = await Promise.all(stockData.map(async (item) => {
        const stockConsumeData = await ItemIssue.findOne({
          attributes: [
            'materialName',
            [fn('sum', col('quantity')), 'consumedquantity']
          ],
          where: {
            materialName: item.dataValues.sku,
            editStatus: {
              [Op.notLike]: 'Pending'
            }
          },
          group: ['materialName'],
          //raw: true
        });

        return {
            sku: item.dataValues.sku,
            thresoldquantity: item.dataValues.thresoldquantity,
            quantity: item.dataValues.quantity,
            consumedquantity: stockConsumeData && stockConsumeData.dataValues.consumedquantity ? parseFloat(stockConsumeData.dataValues.consumedquantity) : 0
          };
        }));


        console.log("finalData",finalData)


    // stockData.map(async(item)=>{
    //     const stockConsumeData = await ItemIssue.findOne({
    //         attributes: [
    //             'materialName',
    //             [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']
    //         ],
    //         where: {
    //             [Op.and]: [{ materialName: `${item.dataValues.sku}` }, 
    //                 { editStatus: { [Op.notLike]: 'Pending'} }]
    //         },
    //         group: ["materialName"]
    //     });


    // })

    
     return res.status(200).json({message:'Stock Fetched Successfully',data:finalData});
}
export default skuDataExcelDownload