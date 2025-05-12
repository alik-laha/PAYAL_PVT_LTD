import { Request, Response } from "express";

import cashewOutEditModel from "../../model/cashewOutEditModel";
import cashewOutModel from "../../model/cashewOutModel";
import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import orderPackingModel from "../../model/orderPackingModel";

export const getAllcashewOutEditPending = async (req: Request, res: Response) => {
    try {
        const rcnEdit = await cashewOutEditModel.findAll({
            order: [['date', 'DESC']], // Order by date descending
        }
            

        );
        if (!rcnEdit) {
            return res.status(200).send({ message: "No pending edit Available" });
        }
        return res.status(200).send(rcnEdit);
    }
    catch (err) {
        console.log(err);
    }
}

export const sumofAllTypeCashewOut = async (req: Request, res: Response): Promise<Response> => {
    try {
        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0,0,0,0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else{
            targetDate = new Date(`${Year}-04-01`);
        }

        
        targetDate.setHours(0,0,0,0)
        if(today.getHours()<5 || (today.getHours()===5 && today.getMinutes()<=30)){
            today.setHours(today.getHours()+5);
            today.setMinutes(today.getMinutes()+30);
        }
        const AllOriginRcnPrimary = await cashewOutModel.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('quantity')), 'quantity']
            ],
            where: {
               
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'N/A' }
                ],status:1,
                date: {
                    [Op.between]: [targetDate, today]
                }
            },
            group: ['origin']
        });

        const CountPendingEdit = await cashewOutEditModel.count();

        // Send the result as a response
        return res.status(200).json({ AllOriginRcnPrimary, CountPendingEdit });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
   
};

export const getUnEntriedCashewOut = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await cashewOutModel.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('gatePassNo')),'gatePassNo']],
            where: {
                status:status
            }

        });
        if(rcnLot){
            res.status(200).json({ message: "UnEntried Cashew Out Found", rcnLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Cashew Out Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const getCashewOutByGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await cashewOutModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Cashew Out Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in UnEntried Cashew Out Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const batchdataFind = async (req: Request, res: Response) => {
    try {
        const { LotNo } = req.body;
    
        let where
    
            where = {
                [Op.and]: [
                    { BatchID: { [Op.like]: `%${LotNo}%` } },
                    { packingStatus: { [Op.eq]: 1 } },
                    { editStatus: { [Op.notLike]: 'Pending' } },
                ]
            }

        
      
        const skuData = await orderPackingModel.findAll({  attributes:['id','BatchID','convpackingquantity','fulfillquantity','gradeName','vendorName','origin'],
            where });
        if (!skuData) return res.status(404).json({ message: "Batch Not found" });
        return res.status(200).json({ skuData });
    } catch (error) {
        return res.status(500).json({ message: "internal error while finding Batch No data" });
    }
}
