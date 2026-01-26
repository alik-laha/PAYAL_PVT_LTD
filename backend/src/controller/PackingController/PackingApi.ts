import { Request, Response } from 'express';
import { updateProductionGradeStock2425, updateProductionGradeStock2526 } from '../../Cronjobs/stockupdateProductionGrade';
import { Op } from 'sequelize';
import productionStockGrade2425 from '../../model/productionStockgrade2425';
import OrderID from '../../model/orderIDModel';
import { orderNoData } from '../../type/type';
import sequelize from '../../config/databaseConfig';
import orderPrimaryModel from '../../model/orderModel';
import orderStockGrade2425 from '../../model/orderStockGrade2425';
import productionStockGrade2526 from '../../model/productionStockgrade2526';
import orderStockGrade2526 from '../../model/orderStockGrade2526';
import orderMappingModel from '../../model/orderMappingModel';
import lotoriginmodel from '../../model/lotoriginModel';
import WholesModel from '../../model/wholesModel';
import LWModel from '../../model/lowerGradeModel';
import SortingModel from '../../model/sortingModel';
import bigTaihoModel from '../../model/bigTaihoModel';
import DPDS from '../../model/dpdsmodel';
import rejectionModel from '../../model/rejectionModel';
import orderPackingModel from '../../model/orderPackingModel';
import orderMappingModelAll from '../../model/orderMappingAllModel';
import qcOutgoingModel from '../../model/outgoingQcModel';
import SkuModel from '../../model/SkuModel';


const CY_FY = process.env.CY_FY ? process.env.CY_FY : '2025-26';
function formatNumber(num:any) {
    return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
}

export const getActvOrderCount = async (req: Request, res: Response) => {
    try {
            const Issued = await orderPrimaryModel.count({ col:'orderID'});
            const Approved  = await orderPrimaryModel.count({ col:'orderID',
                where: { ordMappingStatus: 1 } });
            const Completed  = await orderPrimaryModel.count({ col:'orderID',
                where: { ordApproveStatus: { [Op.like]: 'Closed' } }});
            const Rejected = await orderPrimaryModel.count({col:'orderID',
                where: { ordApproveStatus: { [Op.like]: 'Rejected' } }});

            const Cancelled = await orderPrimaryModel.count({col:'orderID',
                    where: { ordApproveStatus: { [Op.like]: 'Cancelled' } }});

            const PendingApproval = await orderPrimaryModel.count({ col:'orderID',
                where: { ordApproveStatus: { [Op.like]: 'Pending' }} });
            const PendingMapping = await orderMappingModel.count({ col:'orderID',
                where: { mappingStatus: 0 } });
            const PendingPacking = await orderPrimaryModel.count({ col:'orderID',
                    where: { actualquantity: { [Op.eq]: 0 } } });
                    
        res.status(200).json({ message: "Order Count", Issued,Approved,Completed, Rejected,Cancelled,PendingApproval,PendingMapping,PendingPacking});
    }
    catch (err) {
        res.status(500).json({ message: "Error in Finding Order Count", error: err });
    }
}
export const manualProdStockUpdate = async (req: Request, res: Response) => {
    try {
        if(CY_FY==='2024-25'){
            await updateProductionGradeStock2425();
            res.status(200).json({ message: '2024-25 Production Stock update triggered successfully.' });
        }
        else if(CY_FY==='2025-26'){
            await updateProductionGradeStock2526();
            res.status(200).json({ message: '2025-26 Production Stock update triggered successfully.' });
        }
        else{
            res.status(500).json({ error: 'FY Not Found/Internal Server Error' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to update production stock.' });
    }
};
export const prodStockSearch = async (req: Request, res: Response) => {
    try {
        const { FY,grade, section, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause


        if (origin) {
            whereClause.push({
                origin: origin
            });
        }

        if (section) {
            whereClause.push({
                section: section
            });
        }

        if (grade) {
            whereClause.push({
                grade: grade
            });
        }


        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(FY=='2024-25'){
            if (limit === 0 && offset === 0) {
                rcnEntries = await productionStockGrade2425.findAll({
                    where,
                    order: [['section', 'ASC'], ['origin', 'ASC'], ['grade', 'ASC']], // Order by ASC
    
                });
            }
            else {
                rcnEntries = await productionStockGrade2425.findAll({
                    where,
                    order: [['id', 'ASC']],// Order by ASC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: '2024-25 Prod Stock Entry found', rcnEntries })
        }
        else if(FY=='2025-26'){
            if (limit === 0 && offset === 0) {
                rcnEntries = await productionStockGrade2526.findAll({
                    where,
                    order: [['section', 'ASC'], ['origin', 'ASC'], ['grade', 'ASC']], // Order by ASC
    
                });
            }
            else {
                rcnEntries = await productionStockGrade2526.findAll({
                    where,
                    order: [['id', 'ASC']],// Order by ASC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: '2025-26 Prod Stock Entry found', rcnEntries })
        }
        else{
            return res.status(500).json({ message: 'FY Not Found'})
        }
       
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};
export const ordStockSearch = async (req: Request, res: Response) => {
    try {
        const { FY,grade, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause


        if (origin) {
            whereClause.push({
                origin: origin
            });
        }

        if (grade) {
            whereClause.push({
                grade: grade
            });
        }


        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(FY=='2024-25'){
            if (limit === 0 && offset === 0) {
                rcnEntries = await orderStockGrade2425.findAll({
                    where,
                    order: [ ['origin', 'ASC'], ['grade', 'ASC']], // Order by ASC
    
                });
            }
            else {
                rcnEntries = await orderStockGrade2425.findAll({
                    where,
                    order: [['id', 'ASC']],// Order by ASC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: '2024-25 Order Stock Entry found', rcnEntries })
        }
        else if(FY=='2025-26'){
            if (limit === 0 && offset === 0) {
                rcnEntries = await orderStockGrade2526.findAll({
                    where,
                    order: [ ['origin', 'ASC'], ['grade', 'ASC']], // Order by ASC
    
                });
            }
            else {
                rcnEntries = await orderStockGrade2526.findAll({
                    where,
                    order: [['id', 'ASC']],// Order by ASC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: '2025-26 Order Stock Entry found', rcnEntries })
        }
        else{
            return res.status(500).json({ message: 'FY Not Found / Internal server error' })  
        }
       
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};
export const orderSearch = async (req: Request, res: Response) => {
    try {
        const { origin,blConNo, fromDate, toDate,orderStatus } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause


        if (origin) {
            whereClause.push({
                origin: origin
            });
        }

        if (blConNo) {
            whereClause.push({
                orderID: {
                    [Op.like]: `%${blConNo}%`
                }
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                orderInvDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }
        if (orderStatus) {

            if(orderStatus==='Pending Approval'){
                whereClause.push({  [Op.and]: [
                    {
                        ordMappingStatus: 0
                    },
                    
                    {
                        ordApproveStatus:'Pending'
                    }
                ]});
            }
            if(orderStatus==='Pending Mapping'){
                whereClause.push({  [Op.and]: [
                    {
                        ordMappingStatus: 0
                    },
                    
                    {
                        ordApproveStatus:'Approved'
                    }
                ]});
            }
            if(orderStatus==='Pending Packing'){
                whereClause.push({  [Op.and]: [
                    {
                        ordMappingStatus: 1
                    },
                    
                    {
                        actualquantity:0
                    },
                    { ordApproveStatus: { [Op.notLike]: 'Closed' } },
                ]});
            }
            if(orderStatus==='Closed'){
                whereClause.push({  [Op.and]: [
                   
                    
                    {
                        ordStatus:1
                    },
                    {
                        ordApproveStatus:'Closed'
                    }

                ]});
            }
            if(orderStatus==='Cancelled'){
                whereClause.push({  [Op.and]: [
                    {
                        ordApproveStatus:'Cancelled'
                    },
                    
                    {
                        ordStatus:1
                    }
                ]});
            }
            
        }
        else{
            whereClause.push({   [Op.and]: [
                { ordApproveStatus: { [Op.notLike]: 'Pending' } },
                // { ordApproveStatus: { [Op.notLike]: 'Rejected' } },
                // { ordApproveStatus: { [Op.notLike]: 'Cancelled' } },
              
            ]});
        }


        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        
            if (limit === 0 && offset === 0) {
                rcnEntries = await orderPrimaryModel.findAll({
                    where,
                    order: [['orderID', 'DESC']], // Order by DESC
    
                });
            }
            else {
                rcnEntries = await orderPrimaryModel.findAll({
                    where,
                    order: [['orderID', 'DESC']], // Order by DESC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: 'Order Entry found', rcnEntries })
        
       
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};
export const packingSearch = async (req: Request, res: Response) => {
    try {
        const { origin,blConNo, fromDate, toDate } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause


        if (origin) {
            whereClause.push({
                origin: origin
            });
        }

        if (blConNo) {
            whereClause.push({
                orderID: {
                    [Op.like]: `%${blConNo}%`
                }
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                orderInvDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        whereClause.push({
            fulfillquantity: {
                [Op.gt]: 0
            }
        });
       


        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        
            if (limit === 0 && offset === 0) {
                rcnEntries = await orderPackingModel.findAll({
                    where,
                    order: [['orderID', 'DESC'],['origin','ASC'],['gradeName','ASC'],['altid','ASC']], // Order by DESC
    
                });
            }
            else {
                rcnEntries = await orderPackingModel.findAll({
                    where,
                    order: [['orderID', 'DESC'],['origin','ASC'],['gradeName','ASC'],['altid','ASC']], // Order by DESC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: 'Order Packing found', rcnEntries })
        
       
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};
export const mappingSearch = async (req: Request, res: Response) => {
    try {
        const { origin,blConNo, fromDate, toDate } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause


        if (origin) {
            whereClause.push({
                origin: origin
            });
        }

        if (blConNo) {
            whereClause.push({
                orderID: {
                    [Op.like]: `%${blConNo}%`
                }
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                orderInvDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }
        whereClause.push({
            mappingStatus: 1
        });
       


        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        
            if (limit === 0 && offset === 0) {
                rcnEntries = await orderMappingModel.findAll({
                    where,
                    order: [['orderID', 'DESC'],['origin','ASC'],['finalgradeName','ASC'],['altid','ASC'],['productionSection','ASC']], // Order by DESC
    
                });
            }
            else {
                rcnEntries = await orderMappingModel.findAll({
                    where,
                    order: [['orderID', 'DESC'],['origin','ASC'],['finalgradeName','ASC'],['altid','ASC'],['productionSection','ASC']], // Order by DESC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: 'Order Mapping found', rcnEntries })
        
       
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};
export const mappingSearchAll = async (req: Request, res: Response) => {
    try {
        const { origin,blConNo, fromDate, toDate } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause


        if (origin) {
            whereClause.push({
                origin: origin
            });
        }

        if (blConNo) {
            whereClause.push({
                orderID: {
                    [Op.like]: `%${blConNo}%`
                }
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                orderInvDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }
        whereClause.push({
            mappingStatus: 1
        });
       


        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        
            if (limit === 0 && offset === 0) {
                rcnEntries = await orderMappingModelAll.findAll({
                    where,
                    order: [['orderID', 'DESC'],['origin','ASC'],['finalgradeName','ASC'],['altid','ASC']], // Order by DESC
    
                });
            }
            else {
                rcnEntries = await orderMappingModelAll.findAll({
                    where,
                    order: [['orderID', 'DESC'],['origin','ASC'],['finalgradeName','ASC'],['altid','ASC']], // Order by DESC
                    limit: limit,
                    offset: offset
                });
            }
    
            return res.status(200).json({ message: 'Order Mapping All found', rcnEntries })
        
       
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};
export const createOrderEntire = async (req: Request, res: Response) => {

    try {
        const feeledBy = req.cookies.user;
        const formData = req.body.data
        const currentDate = new Date();
        const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

        // Get the latest sequence ID from the database
        const latestSequence: orderNoData | null = await OrderID.findOne({
            order: [['id', 'DESC']],
        }) as orderNoData | null;

        //let sequenceId = 0;
        let sequenceId = Number(process.env.START_ORDNO)
        if (latestSequence) {
            const latestYear = parseInt(latestSequence.orderNo.split('/')[2].split('-')[0], 10);
            console.log(latestYear)
            if (latestYear === currentYear) {
                sequenceId = sequenceId = parseInt(latestSequence.orderNo.split('/')[2].split('-')[1], 10) + 1;
            }
        }
        console.log(sequenceId)
        // Generate the new sequence
        const newSequence = `PAYAL/ORD/${currentYear + '-' + sequenceId.toString().padStart(5, '0')}`;


        await sequelize.transaction(async (transaction: any) => {
            const ordGen = await OrderID.create({
                orderNo: newSequence,
                createdBy: feeledBy
            }, { transaction })
            if (ordGen) {
                for (let data of formData) {
                    if (!data.grade || !data.origin) {
                        res.status(500).json({ message: "All Fields Are Required" })
                        throw new Error('Transaction Aborted 1')
                    }

                    let gradedata = await SkuModel.findOne({ where: { sku: data.grade, type: 'Final Grade', section: 'Packing' } });
                    if (!gradedata) {
                        res.status(500).json({ message: "Final Grade Do Not Exists" })
                        throw new Error('Transaction Aborted 2')
                    }

                    await orderPrimaryModel.create({
                        orderID: newSequence,
                        orderDate: data.ordDate,
                        orderInvDate: data.invDate,
                        origin: data.origin,
                        gradeName: data.grade,
                        vendorName: data.Vendor,
                        brokerName: data.Broker,
                        quantity: data.quantity,
                        unitRate: data.unitrate,
                        actualquantity: 0,
                        gst: data.gst,
                        totalBill: data.totalprice,
                        remarks: data.remarks,
                        ordApproveStatus: 'Pending',
                        createdBy: feeledBy


                    }, { transaction });



                }
                const orderupdate = await OrderID.update(
                    {
                        modifiedBy: 'Created'
                    },
                    {
                        where: {
                            orderNo: newSequence
                        }, transaction
                    }
                );
                if (orderupdate) {
                    res.status(200).json({ message: `Order ID ${newSequence} Generated Successfully` });
                }
            }

        }
        )



    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating Order Entry", error });
        }
    }






}
export const rejectPurchaseOrder = async (req: Request, res: Response) => {
   try{
    const { id } = req.body;
    const actionedBy = req.cookies.user;

    const orderupdate = await orderPrimaryModel.update(
        {
            ordApproveStatus: 'Rejected',
            approvedBy:actionedBy
        },
        {
            where: {
                id
            }
        }
    );
    if (orderupdate) {
        res.status(200).json({ message: "Sales Order Rejected Successfully" });
    }

   }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
};

export const closePurchaseOrder = async (req: Request, res: Response) => {
    try{
     const { id } = req.body;
     const actionedBy = req.cookies.user;
 
     const orderupdate = await orderPrimaryModel.update(
         {
             ordApproveStatus: 'Closed',
             ordStatus:1,
             approvedBy:actionedBy
         },
         {
             where: {
                 id
             }
         }
     );
     if (orderupdate) {
         res.status(200).json({ message: "Sales Order Closed Successfully" });
     }
 
    }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error', error: err })
     }
 };

 export const cancelPurchaseOrder = async (req: Request, res: Response) => {
    try{
     const { id } = req.body;
     const actionedBy = req.cookies.user;
     await sequelize.transaction(async (transaction: any) => {

        const orderupdate = await orderPrimaryModel.update(
            {
                ordApproveStatus: 'Cancelled',
                ordStatus:1,
                ordMappingStatus:0,
                mapquantity:0,
                actualquantity:0,
                approvedBy:actionedBy
            },
            {
                where: {
                    id
                },transaction
            }
        );

        if(orderupdate){
            const mappingdelete=await orderMappingModel.destroy({
                where: {
                    orderpk: id
                },transaction
            });

            const mappingAlldelete=await orderMappingModelAll.destroy({
                where: {
                    orderpk: id
                },transaction
            });

            const packingdelete=await orderPackingModel.destroy({
                where: {
                    orderpk: id
                },transaction
            });
            if (mappingdelete && mappingAlldelete && packingdelete) {
                res.status(200).json({ message: "Sales Order Cancelled Successfully" });
            }

        }
        

     })
   
 
    }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error', error: err })
     }
 };
export const approvePurchaseOrder = async (req: Request, res: Response) => {
    try{
     const { item } = req.body;
   
     const actionedBy = req.cookies.user;

     await sequelize.transaction( async (transaction) =>{
        
      
          
            const packingEntry = await orderPackingModel.create({
                origin: item.origin,
                orderID: item.orderID,
                orderDate: item.orderInvDate,
                gradeName:item.gradeName,
                vendorName:item.vendorName,
                gst:item.gst,
                demandquantity: item.quantity,
                unitRate:item.unitRate,
                orderpk:item.id,
                totalBill:item.totalBill
            },{transaction});

            const mappingEntry = await orderMappingModel.create({
                origin: item.origin,
                orderID: item.orderID,
                orderDate: item.orderInvDate,
                finalgradeName:item.gradeName,
                vendorName:item.vendorName,
                demandQuantity: item.quantity,
                orderpk:item.id,
                packingpk:packingEntry.dataValues.id
            },{transaction});

            const mappingAllEntry = await orderMappingModelAll.create({
                origin: item.origin,
                orderID: item.orderID,
                orderDate: item.orderInvDate,
                finalgradeName:item.gradeName,
                vendorName:item.vendorName,
                demandQuantity: item.quantity,
                orderpk:item.id,
                packingpk:packingEntry.dataValues.id
            },{transaction});

            const orderupdate = await orderPrimaryModel.update(
                {
                    ordApproveStatus: 'Approved',
                    approvedBy:actionedBy,
                    mappingpk:mappingEntry.dataValues.id
                },
                {
                    where: {
                        id:item.id
                    }, transaction
                }
            );


            

            if (mappingEntry && packingEntry  && mappingAllEntry && orderupdate) {
                res.status(200).json({ message: "Sales Order Approved Successfully" });
            }
            else{
                return res.status(500).json({ message: 'Error in Creating Mapping'})
            }
        
     
     })
 
    }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error', error: err })
     }
 };
 export const getMappingLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await orderMappingModel.findAll({
            
            attributes: ['orderID', 'origin','orderDate','finalgradeName','vendorName','demandQuantity'],
            where: {
                mappingStatus:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un OrderMapping Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Order Mapping Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const getMappingByGradeOrigin = async (req: Request, res: Response) => {

    try {
        const {orderId,origin,grade}=req.body

        const scoopingLot = await orderMappingModel.findAll({
            where: {
                orderID:orderId,origin:origin,finalgradeName:grade
            }, order: [['orderId', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un Mapping Order Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Mapping Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const lotdataFind = async (req: Request, res: Response) => {
    try {
        const { LotNo,section,origin } = req.body;
        let status:string=''
        if(section==='DPDS'){
            status='dPDSStatus'
        }
        else  if(section==='Sorting'){
            status='sortingStatus'
        }
        else  if(section==='Wholes'){
            status='wholesgradeStatus'
        }
        else  if(section==='bigTaiho'){
            status='bigTaihoStatus'
        }
        else  if(section==='rejection'){
            status='rejectionStatus'
        }
        else  if(section==='LW'){
            status='lowergradeStatus'
        }

        let where
    
            where = {
                [Op.and]: [
                    { LotNo: { [Op.like]: `%${LotNo}%` } },
                    { origin: { [Op.like]: `%${origin}%` } },
                    { [status]: { [Op.eq]: 1 } },
                    { editStatus: { [Op.notLike]: 'Pending' } },
                ]
            }

        
      
        const skuData = await lotoriginmodel.findAll({  attributes:['id','LotNo'],
            where });
        if (!skuData) return res.status(404).json({ message: "Lot Not found" });
        return res.status(200).json({ skuData });
    } catch (error) {
        return res.status(500).json({ message: "internal error while finding Lot data" });
    }
}
export const lotQtydataFind = async (req: Request, res: Response) => {
    try {
        let finalSum=0;
        let stockSum=0;
        let finalconsumedSum=0;
        const {LotNo,section,grade,origin} = req.body
        let ProdStockPrimary:any
        if(section==='Wholes'){
            ProdStockPrimary = await WholesModel.findAll({
                attributes: [
                   
                    // SUM each issue field and alias the result properly
                    [sequelize.fn('SUM', sequelize.col(grade)), 'quantity'],
                  ],
                  where: {
                    LotNo:LotNo,origin:origin,Status: {[Op.notLike]:0},editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: ['LotNo'],
                  // raw: true,
                });
        }
        if(section==='LW'){
            ProdStockPrimary = await LWModel.findAll({
                attributes: [
                  
                    // SUM each issue field and alias the result properly
                    [sequelize.fn('SUM', sequelize.col(grade)), 'quantity'],
                  ],
                  where: {
                    LotNo:LotNo,origin:origin,Status: 1,editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: ['LotNo'],
                  // raw: true,
                });
        }
        if(section==='Sorting'){
            ProdStockPrimary = await SortingModel.findAll({
                attributes: [
                 
                    // SUM each issue field and alias the result properly
                    [sequelize.fn('SUM', sequelize.col(grade)), 'quantity'],
                  ],
                  where: {
                    LotNo:LotNo,origin:origin,Status: 1,editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: ['LotNo'],
                  // raw: true,
                });
        }
        if(section==='BigTaiho'){
            ProdStockPrimary = await bigTaihoModel.findAll({
                attributes: [
                 
                    // SUM each issue field and alias the result properly
                    [sequelize.fn('SUM', sequelize.col(grade)), 'quantity'],
                  ],
                  where: {
                    LotNo:LotNo,origin:origin,Status: 1, editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: ['LotNo'],
                  // raw: true,
                });
        }
        if(section==='DPDS'){
            ProdStockPrimary = await DPDS.findAll({
                attributes: [
                 
                    // SUM each issue field and alias the result properly
                    [sequelize.fn('SUM', sequelize.col(grade)), 'quantity'],
                  ],
                  where: {
                    LotNo:LotNo,origin:origin,Status: 1,editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: ['LotNo'],
                  // raw: true,
                });
        }
        if(section==='Rejection'){
            ProdStockPrimary = await rejectionModel.findAll({
                attributes: [
                
                    // SUM each issue field and alias the result properly
                    [sequelize.fn('SUM', sequelize.col(grade)), 'quantity'],
                  ],
                  where: {
                    LotNo:LotNo,origin:origin,Status: 1, editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: ['LotNo'],
                  // raw: true,
                });
        }
       

        if(ProdStockPrimary && ProdStockPrimary.length>0){
            if(ProdStockPrimary[0].dataValues.quantity){ 
                stockSum = Number(parseFloat(ProdStockPrimary[0].dataValues.quantity).toFixed(2));   
            }
            
        }

        console.log(stockSum)
        const itemIssueSum = await orderMappingModel.findAll({
            attributes: [
                'productionGrade',
                // SUM each issue field and alias the result properly
                [sequelize.fn('SUM', sequelize.col('mappedQuantity')), 'mapquantity'],
              ],
              where: {
                LotNo:LotNo,productionOrigin:origin,
                mappingStatus: 1, productionSection:section,
                editStatus: {[Op.notLike]:'Pending'},
                productionGrade:grade,
              },
              group: ['productionGrade'],
              // raw: true,
            });

        if(itemIssueSum && itemIssueSum.length>0){
            if(itemIssueSum[0].dataValues.mapquantity){ 
                finalconsumedSum = Number(parseFloat(itemIssueSum[0].dataValues.mapquantity).toFixed(2));   
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


export const lotQtydataFindAll = async (req: Request, res: Response) => {
  try {
    const { section, grade, origin } = req.body;

    // pick the correct model dynamically
    let model: any;
    if (section === "Wholes") model = WholesModel;
    else if (section === "LW") model = LWModel;
    else if (section === "Sorting") model = SortingModel;
    else if (section === "BigTaiho") model = bigTaihoModel;
    else if (section === "DPDS") model = DPDS;
    else if (section === "Rejection") model = rejectionModel;
    else
      return res
        .status(400)
        .json({ message: "Invalid section provided", section });

    // 1️⃣ Get all lot numbers for that section & origin
    const lots = await model.findAll({
      attributes: ["LotNo"],
      where: { origin },
      group: ["LotNo"],
      raw: true,
    });

    if (!lots || lots.length === 0)
      return res.status(404).json({ message: "No lots found" });

    const stockResults: { LotNo: string; stock: number }[] = [];

    // 2️⃣ Loop each lot and calculate stock
    for (const lot of lots) {
      const { LotNo } = lot;
      let stockSum = 0;
      let consumedSum = 0;

      // fetch total stock for this lot
      const stock = await model.findAll({
        attributes: [[sequelize.fn("SUM", sequelize.col(grade)), "quantity"]],
        where: {
          LotNo,
          origin,
          Status: { [Op.notLike]: 0 },
          editStatus: { [Op.notLike]: "Pending" },
        },
        group: [grade],
        raw: true,
      });

      if (stock && stock.length > 0 && stock[0].quantity)
        stockSum = parseFloat(stock[0].quantity).toFixed(2) as any;

      // fetch total consumed (mapped) quantity
      const consumed = await orderMappingModel.findAll({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("mappedQuantity")), "mapquantity"],
        ],
        where: {
          LotNo,
          productionOrigin: origin,
          productionSection: section,
          productionGrade: grade,
          mappingStatus: 1,
          editStatus: { [Op.notLike]: "Pending" },
        },
        group: ["productionGrade"],
        raw: true,
      });

      if (consumed && consumed.length > 0 && consumed[0].dataValues.mapquantity)
        consumedSum = parseFloat(consumed[0].dataValues.mapquantity);

      const finalStock = formatNumber(stockSum - consumedSum);

      stockResults.push({
        LotNo,
        stock: finalStock,
      });
    }

    // 3️⃣ Send response
    return res.status(200).json(stockResults);
  } catch (error) {
    console.error("Error in lotQtydataFindAll:", error);
    return res
      .status(500)
      .json({ message: "Internal error while finding lot-wise stock" });
  }
};

interface LotOriginPair {
  LotNo: string;
  origin: string;
}

export const lotQtydataFindAllOriginWise = async (req: Request, res: Response) => {
  try {
    const { section, grade } = req.body;

    if (!section || !grade)
      return res.status(400).json({ message: "Both 'section' and 'grade' are required" });

    // 🧩 pick model dynamically
    let model: any;
    switch (section) {
      case "Wholes":
        model = WholesModel;
        break;
      case "LW":
        model = LWModel;
        break;
      case "Sorting":
        model = SortingModel;
        break;
      case "BigTaiho":
        model = bigTaihoModel;
        break;
      case "DPDS":
        model = DPDS;
        break;
      case "Rejection":
        model = rejectionModel;
        break;
      default:
        return res.status(400).json({ message: "Invalid section provided", section });
    }

    // 1️⃣ Get all unique (LotNo, origin) pairs
    const lotOriginPairs: LotOriginPair[] = await model.findAll({
      attributes: ["LotNo", "origin"],
      group: ["origin", "LotNo"],
      where: {
            Status: { [Op.notLike]: 0 },
            [grade]: { [Op.ne]: 0 },      // ✅ dynamic column
          },
      raw: true,
    });

    if (!lotOriginPairs.length)
      return res.status(404).json({ message: "No lots found for this section" });

    // 2️⃣ Compute all stocks in parallel
    const stockResults = await Promise.all(
      lotOriginPairs.map(async (pair) => {
        const LotNo = pair.LotNo;
        const origin = pair.origin;

        let stockSum = 0;
        let consumedSum = 0;

        // 🔹 Total Stock
        const stock = await model.findAll({
          attributes: [[sequelize.fn("SUM", sequelize.col(grade)), "quantity"]],
          where: {
            LotNo,
            origin,
            Status: { [Op.notLike]: 0 },
            
            editStatus: { [Op.notLike]: "Pending" },
          },
          group: ['LotNo'],
          raw: true,
        });

        if (stock && stock.length > 0 && stock[0].quantity)
          stockSum = parseFloat(stock[0].quantity);

        // 🔹 Total Consumed
        const consumed = await orderMappingModel.findAll({
          attributes: [
            [sequelize.fn("SUM", sequelize.col("mappedQuantity")), "mapquantity"],
          ],
          where: {
            LotNo,
            productionOrigin: origin,
            productionSection: section,
            productionGrade: grade,
            mappingStatus: 1,
            editStatus: { [Op.notLike]: "Pending" },
          },
          group: ["productionGrade"],
          //raw: true,
        });

        if (consumed && consumed.length > 0 && consumed[0].dataValues.mapquantity)
          consumedSum = parseFloat(consumed[0].dataValues.mapquantity);

        // 🔹 Final Stock
        const finalStock = formatNumber(stockSum - consumedSum);
        // 🚫 DISCARD zero or negative stock
        if (Number(finalStock) <= 0) return null;

        // ✅ return fully typed object
        return {
          LotNo,
          origin,
          stock: finalStock,
        };

         
      })
    );
     // 3️⃣ Remove nulls (discarded zero-stock lots)
    const filteredResults = stockResults.filter(Boolean);

    // 3️⃣ Respond
    return res.status(200).json(filteredResults);
  } catch (error) {
    console.error("Error in lotQtydataFindAllOriginWise:", error);
    return res.status(500).json({
      message: "Internal error while finding lot-wise origin stock",
      error: (error as Error).message,
    });
  }
};

export const updateMappingOrder = async (req: Request, res: Response) => {
    try {
        const {   LotNo,packingpk,
            porigin,
            section,
            grade,
            stockquantity,
            prcntg,
            mixquantity,
            remarks,orderpk,mappingDate,actual_stockquantity} = req.body.data;

        const id=req.params.id;
        const amount=req.params.mixQuantitySum;
        const createdBy = req.cookies.user;
        let skuData = await lotoriginmodel.findOne({ where: { LotNo:LotNo,origin:porigin } });
        if(!skuData ){
            return res.status(500).json({ message: "Lot No Does Not Exist" });
        }
        else{
            await sequelize.transaction( async (transaction) =>{
                if (actual_stockquantity < mixquantity) {
                    res.status(500).json({ message: "Mapping Quantity Can't Be Greater than 100%" });
                    throw new Error('Transaction Aborted 1')
                }
                const mappingupdate = await orderMappingModel.update({ 
                    LotNo,
                    mappingDate:mappingDate,
                    productionOrigin:porigin,
                    productionSection:section,
                    productionGrade:grade,
                    sectionQuantity:stockquantity,
                    sectionQuantityActual:actual_stockquantity,
         
                    prcntgMix:prcntg,
                    mappedQuantity:mixquantity,
                    remarks,
                    createdBy,mappingStatus:1
                }, {
                    where: {
                        id: id
                    },transaction
                });

                const mappingupAlldate = await orderMappingModelAll.update({ 
                    mappingDate:mappingDate,
                    
                    mappedQuantity:amount,
                    createdBy,mappingStatus:1
                }, {
                    where: {
                        orderpk:orderpk,altid:1
                    },transaction
                });
                
                const orderupdate = await orderPrimaryModel.update({ 
                    ordMappingStatus:1,
                    mapquantity:sequelize.literal(`mapquantity+ ${amount}`),
                }, {
                    where: {
                        id:orderpk
                    },transaction
                });

                const packingInitial = await orderPackingModel.update({ 
                    fulfillquantity:amount
                }, {
                    where: {
                        id:packingpk
                    },transaction
                });
                
                
                if(orderupdate && mappingupdate && mappingupAlldate && packingInitial){
                    return res.status(201).json({ message: "Order Id Mapped successfully" });
                }
                else{
                    return res.status(500).json({ message: "Internal Error while Creating Order Mapping Entry" });
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Error while Creating Order Mapping Entry" });

    }
}
export const updateMappingOrderEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const amount = req.params.mixQuantitySum;
        const createdBy = req.cookies.user;
        const formData = req.body.data
        const firstrow = formData[0]
        const { LotNo, packingpk,
            porigin,
            section,
            grade,
            stockquantity,
            prcntg,
            mixquantity,
            remarks, orderpk,mappingDate,actual_stockquantity } = firstrow;
        let skuData = await lotoriginmodel.findOne({ where: { LotNo: LotNo, origin: porigin } });
        if (!skuData) {
            return res.status(500).json({ message: "Lot No Does Not Exist" });
        }
        else {
            await sequelize.transaction(async (transaction) => {
                const dataToUpdate = formData.slice(1)
                //console.log(dataToUpdate)
                for (let data of dataToUpdate) {
                    //console.log(data)
                    let skuData = await lotoriginmodel.findOne({ where: { LotNo: data.LotNo, origin: data.porigin } });
                    if (!skuData) {
                        res.status(500).json({ message: "Lot No Does Not Exist" });
                        throw new Error('Transaction Aborted 1')
                    }
                    if (data.actual_stockquantity < data.mixquantity) {
                        res.status(500).json({ message: "Mapping Quantity Can't Be Greater than 100%" });
                        throw new Error('Transaction Aborted 2')
                    }

                    await orderMappingModel.create({
                        origin: data.origin,
                        orderID: data.orderID,
                        orderDate: data.orderDate,
                        finalgradeName:data.finalgradeName,
                        vendorName:data.vendorName,
                        demandQuantity: data.demandQuantity,
                        orderpk:data.orderpk,
                        packingpk:data.packingpk,
                        mappingDate:data.mappingDate,
                        LotNo:data.LotNo,
                        productionOrigin:data.porigin,
                        productionSection:data.section,
                        productionGrade:data.grade,
                        sectionQuantity:data.stockquantity,
                        prcntgMix:data.prcntg,
                        sectionQuantityActual:data.actual_stockquantity,
                        mappedQuantity:data.mixquantity,
                        remarks:data.remarks,
                        createdBy,mappingStatus:1
                    }, { transaction })
                }


                if (stockquantity < mixquantity) {
                    res.status(500).json({ message: "Mapping Quantity Can't Be Greater than 100%" });
                    throw new Error('Transaction Aborted 1')
                }
                const mappingupdate = await orderMappingModel.update({ 
                    LotNo,
                    productionOrigin:porigin,
                    productionSection:section,
                    productionGrade:grade,
                    sectionQuantity:stockquantity,
                    mappingDate:mappingDate,
                    sectionQuantityActual:actual_stockquantity,
            
                    prcntgMix:prcntg,
                    mappedQuantity:mixquantity,
                    remarks,
                    createdBy,mappingStatus:1
                }, {
                    where: {
                        id: id
                    },transaction
                });

                const mappingupAlldate = await orderMappingModelAll.update({ 
                    mappingDate:mappingDate,
                    
                    mappedQuantity:amount,
                    createdBy,mappingStatus:1
                }, {
                    where: {
                        orderpk:orderpk,altid:1
                    },transaction
                });

                const orderupdate = await orderPrimaryModel.update({ 
                    ordMappingStatus:1,
                    mapquantity:sequelize.literal(`mapquantity+ ${amount}`),
                }, {
                    where: {
                        id:orderpk
                    },transaction
                });

                const packingInitial = await orderPackingModel.update({ 
                    fulfillquantity:amount
                }, {
                    where: {
                        id:packingpk
                    },transaction
                });



                if(orderupdate && mappingupAlldate && mappingupdate && packingInitial){
                    return res.status(201).json({ message: "Order Id Mapped successfully" });
                }
                else{
                    return res.status(500).json({ message: "Internal Error while Creating Order Mapping Entry" });
                }
            })
        }


    } catch (error) {

        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating Order Mapping Entry", error });
        }
    }
}
export const updateReMappingOrderEntire = async (req: Request, res: Response) => {
    try {
    
        // console.log(req.body)
        const amount = req.params.mixQuantitySum;
        const createdBy = req.cookies.user;
        const formData = req.body.data
        const {gst,totalBill,unitRate}=req.body
        const firstrow = formData[0]
        const {  orderpk } = firstrow;
       

            await sequelize.transaction(async (transaction) => {
                
                const packing_prev = await orderPackingModel.findOne({
                    attributes: ['altid'],
                    where: {
                        orderpk: orderpk

                    },
                    order: [['id', 'DESC']],

                });
                const mapping_prev = await orderMappingModel.findOne({
                    attributes: ['altid'],
                    where: {
                        orderpk: orderpk

                    },
                    order: [['id', 'DESC']],

                });
                const packingupdate = await orderPackingModel.update(
                    {
                        latest: 0

                    }, {
                    where: {
                        orderpk: orderpk
                    }, transaction
                }
                );
                const packingEntry = await orderPackingModel.create({
                    altid:packing_prev ?(parseInt(packing_prev.dataValues.altid)+1):1,
                    origin: firstrow.origin,
                    orderID: firstrow.orderID,
                    orderDate: firstrow.orderDate,
                    gradeName: firstrow.finalgradeName,
                    vendorName: firstrow.vendorName,
                    gst: gst,
                    demandquantity: firstrow.demandQuantity,
                    unitRate: unitRate,
                    orderpk: firstrow.orderpk,
                    totalBill: totalBill,
                    fulfillquantity:amount
                },{transaction});

                const mappingAllEntry = await orderMappingModelAll.create({

                        altid:mapping_prev ?(parseInt(mapping_prev.dataValues.altid)+1):1,
                        origin: firstrow.origin,
                        orderID: firstrow.orderID,
                        orderDate: firstrow.orderDate,
                        finalgradeName:firstrow.finalgradeName,
                        vendorName:firstrow.vendorName,
                        demandQuantity: firstrow.demandQuantity,
                        orderpk:firstrow.orderpk,
                        packingpk:packingEntry.dataValues.id,
                        mappingDate:formData[0].mappingDate,
                        mappedQuantity:amount,mappingStatus:1,createdBy
                },{transaction});
              
                //console.log(dataToUpdate)
                for (let data of formData) {
                     //console.log(data)
                     let skuData = await lotoriginmodel.findOne({ where: { LotNo: data.LotNo, origin: data.porigin } });
                     if (!skuData) {
                         res.status(500).json({ message: "Lot No Does Not Exist" });
                         throw new Error('Transaction Aborted 1')
                     }
                     if (data.actual_stockquantity < data.mixquantity) {
                         res.status(500).json({ message: "Mapping Quantity Can't Be Greater than 100%" });
                         throw new Error('Transaction Aborted 2')
                     }

                    await orderMappingModel.create({
                        altid:mapping_prev ?(parseInt(mapping_prev.dataValues.altid)+1):1,
                        origin: data.origin,
                        orderID: data.orderID,
                        orderDate: data.orderDate,
                        finalgradeName:data.finalgradeName,
                        vendorName:data.vendorName,
                        demandQuantity: data.demandQuantity,
                        orderpk:data.orderpk,
                        packingpk:packingEntry.dataValues.id,
                        mappingDate:data.mappingDate,
                        LotNo:data.LotNo,
                        productionOrigin:data.porigin,
                        productionSection:data.section,
                        productionGrade:data.grade,
                        sectionQuantity:data.stockquantity,
                        prcntgMix:data.prcntg,
                        sectionQuantityActual:data.actual_stockquantity,
                        mappedQuantity:data.mixquantity,
                        remarks:data.remarks,
                        createdBy,mappingStatus:1
                    }, { transaction })
                }

                const orderupdate = await orderPrimaryModel.update({ 
                    mapquantity:sequelize.literal(`mapquantity+ ${amount}`),
                }, {
                    where: {
                        id:orderpk
                    },transaction
                });

        

                if(packingupdate && orderupdate &&  packingEntry && mappingAllEntry){
                    return res.status(201).json({ message: "Order Id Re-Mapped successfully" });
                }
                else{
                    return res.status(500).json({ message: "Internal Error while Creating Order Re-Mapping Entry" });
                }


            })


        


    } catch (error) {

        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating Order Mapping Entry", error });
        }


    }
}

export const modifyOrder = async (req: Request, res: Response) => {
    try{
     const { origin,gradeName,orderDate,invDate,vendor,broker,quantity,gst,totalBill,unitRate,remarks,mappingStatus } = req.body;
        const id=req.params.id
     const actionedBy = req.cookies.user;

     await sequelize.transaction( async (transaction) =>{
        
        const orderupdate = await orderPrimaryModel.update(
            {
               origin,gradeName,orderDate,orderInvDate:invDate,
               vendorName:vendor,brokerName:broker,quantity,gst,
               totalBill,unitRate,remarks,approvedBy:actionedBy

            },
            {
                where: {
                    id
                }, transaction
            }
        );
        let packingEntry,mappingEntry,mappingAllEntry
          if(mappingStatus===0){
             packingEntry = await orderPackingModel.update({
                origin: origin,
                orderDate: invDate,
                gradeName:gradeName,
                vendorName:vendor,
                gst,
                demandquantity:quantity,
                unitRate,approvedBy:actionedBy,
               
                totalBill:totalBill
            },
            {
                where: {
                    orderpk:id
                }, transaction
            });

            mappingEntry = await orderMappingModel.update({
                origin,
                
                orderDate: invDate,
                finalgradeName:gradeName,
                vendorName:vendor,
                demandQuantity: quantity
                ,approvedBy:actionedBy
            },
            {
                where: {
                    orderpk:id
                }, transaction
            });

            mappingAllEntry = await orderMappingModelAll.update({
                origin,
                orderDate: invDate,
                finalgradeName:gradeName,
                vendorName:vendor,
                demandQuantity: quantity
                ,approvedBy:actionedBy
            },
            {
                where: {
                    orderpk:id
                }, transaction
            });


          }
          else{
                packingEntry = await orderPackingModel.update({
                origin: origin,
                orderDate: invDate,
                gradeName:gradeName,
                vendorName:vendor,
                gst,
                unitRate,approvedBy:actionedBy,
                totalBill:totalBill
            },
            {
                where: {
                    orderpk:id
                }, transaction
            });

            mappingEntry = await orderMappingModel.update({
                origin,
                orderDate: invDate,
                finalgradeName:gradeName,
                vendorName:vendor,
                approvedBy:actionedBy
            },
            {
                where: {
                    orderpk:id
                }, transaction
            });

            mappingAllEntry = await orderMappingModelAll.update({
                origin,
                orderDate: invDate,
                finalgradeName:gradeName,
                vendorName:vendor,
                approvedBy:actionedBy
            },
            {
                where: {
                    orderpk:id
                }, transaction
            });
          }

          
            

            if (mappingEntry && mappingAllEntry && packingEntry && orderupdate) {
                res.status(200).json({ message: "Sales Order Modified Successfully" });
            }
            else{
                return res.status(500).json({ message: 'Error in Modifying Sales Order'})
            }
        
     
     })
 
    }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error', error: err })
     }
 };

export const deleteOrderMapping = async (req: Request, res: Response) => {
    try {
        const { item } = req.body;

        await sequelize.transaction(async (transaction) => {

            const order_entry = await orderPrimaryModel.findOne({
                attributes: ['gst', 'unitRate', 'totalBill', 'quantity', 'ordApproveStatus'],
                where: {
                    id: item.orderpk

                },
            });

            const mapping_entry = await orderPackingModel.findOne({
                attributes: ['altid'],
                where: {
                    orderpk: item.orderpk

                },
                order: [['id', 'DESC']],

            });

            if (order_entry?.dataValues.ordApproveStatus === 'Closed') {
                res.status(500).json({ message: "Sales Order Already Closed. Mapping Can't Be Deleted" });
                throw new Error('Transaction Aborted 1')
            }

            const packing_entry = await orderPackingModel.findOne({
                attributes: ['dispatchStatus', 'packingStatus'],
                where: {
                    id: item.packingpk

                },

            });

            if (packing_entry?.dataValues.dispatchStatus === 1) {
                res.status(500).json({ message: "Item has Already Dispatched. Mapping Can't be Deleted" });
                throw new Error('Transaction Aborted 2')
            }
            if (packing_entry?.dataValues.packingStatus === 1) {
                res.status(500).json({ message: "Item has Already Packed. Please Unpack First" });
                throw new Error('Transaction Aborted 3')
            }
            console.log(mapping_entry?.dataValues.altid)
            console.log(item.altid)

            if (parseInt(item.altid) === 1 && parseInt(mapping_entry?.dataValues.altid)===1) {
                console.log('Entered Here 1')
                const mappingdelete = await orderMappingModel.destroy({
                    where: {
                        orderpk: item.orderpk, altid: item.altid
                    },transaction
                });

                const mappingAlldelete = await orderMappingModelAll.destroy({
                    where: {
                        orderpk: item.orderpk, altid: item.altid
                    },transaction
                });

                const packingdelete = await orderPackingModel.destroy({
                    where: {
                        orderpk: item.orderpk, altid: item.altid
                    },transaction
                });

                const packingEntry = await orderPackingModel.create({
                    origin: item.origin,
                    orderID: item.orderID,
                    orderDate: item.orderDate,
                    gradeName: item.finalgradeName,
                    vendorName: item.vendorName,
                    gst: order_entry?.dataValues.gst,
                    unitRate: order_entry?.dataValues.unitRate,
                    totalBill: order_entry?.dataValues.totalBill,
                    demandquantity: order_entry?.dataValues.quantity,
                    orderpk: item.orderpk,

                }, { transaction });

                const mappingEntry = await orderMappingModel.create({
                    origin: item.origin,
                    orderID: item.orderID,
                    orderDate: item.orderDate,
                    finalgradeName: item.finalgradeName,
                    vendorName: item.vendorName,
                    demandQuantity: order_entry?.dataValues.quantity,
                    orderpk: item.orderpk,
                    packingpk: packingEntry.dataValues.id
                }, { transaction });

                const mappingAllEntry = await orderMappingModelAll.create({
                    origin: item.origin,
                    orderID: item.orderID,
                    orderDate: item.orderDate,
                    finalgradeName: item.finalgradeName,
                    vendorName: item.vendorName,
                    demandQuantity: order_entry?.dataValues.quantity,
                    orderpk: item.orderpk,
                    packingpk: packingEntry.dataValues.id
                }, { transaction });

                const orderupdate = await orderPrimaryModel.update(
                    {
                        ordMappingStatus: 0,
                        mapquantity: sequelize.literal(`mapquantity- ${item.mappedQuantity}`),
                        ordApproveStatus: 'Approved',
                        mappingpk: mappingEntry.dataValues.id
                    },
                    {
                        where: {
                            id: item.orderpk
                        }, transaction
                    }
                );

                if (mappingdelete && mappingAlldelete && packingdelete && packingEntry && mappingEntry && mappingAllEntry && orderupdate) {
                    res.status(200).json({ message: "Mapping Deleted Successfully" });
                }
                else {
                    return res.status(500).json({ message: 'Error in Deleting Mapping' })
                }


            }
            else {
                console.log('Entered Here 2')
                const mappingdelete = await orderMappingModel.destroy({
                    where: {
                        orderpk: item.orderpk, altid: item.altid
                    },transaction
                });

                const mappingAlldelete = await orderMappingModelAll.destroy({
                    where: {
                        orderpk: item.orderpk, altid: item.altid
                    },transaction
                });

                const packingdelete = await orderPackingModel.destroy({
                    where: {
                        orderpk: item.orderpk, altid: item.altid
                    },transaction
                });
         
                const orderupdate = await orderPrimaryModel.update(
                    {
                        mapquantity: sequelize.literal(`mapquantity- ${item.mappedQuantity}`),           
                    },
                    {
                        where: {
                            id: item.orderpk
                        }, transaction
                    }
                );

                if (mappingdelete && mappingAlldelete && packingdelete && orderupdate) {
                    res.status(200).json({ message: "Mapping Deleted Successfully" });
                }
                else {
                    return res.status(500).json({ message: 'Error in Deleting Mapping' })
                }
            }

        })

    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while Deleting Mapping Entry", error });
        }
    }
};

export const createPacking = async (req: Request, res: Response) => {
    try{
     const { mfgDate, noOfBags, batchID, orderpk, remarks,
        noOfSystemBags,orderID,gradeName,origin,fulfillquantity } = req.body;
     const id=req.params.id
     const actionedBy = req.cookies.user;

     await sequelize.transaction( async (transaction) =>{
        
      
        const packingUpdate = await orderPackingModel.update(
            {
                BatchID:batchID,
                mfgDate:mfgDate,
                packingStatus:1,
                packingquantity:noOfSystemBags,
                convpackingquantity:noOfBags,
                createdBy:actionedBy,
                remarks:remarks
            },
            {
                where: {
                    id
                }, transaction
            }
        );
        if(packingUpdate){
            const qcoutEntry = await qcOutgoingModel.create({
                mfgDate:mfgDate,
                orderID:orderID,
                packingpk:id,
                batchNo:batchID,
                origin:origin,
                gradeName:gradeName,
            },{transaction});

            const orderupdate = await orderPrimaryModel.update(
                {
                    actualquantity:sequelize.literal(`actualquantity+ ${fulfillquantity}`),
                },
                {
                    where: {
                        id:orderpk
                    }, transaction
                }
            );
            if (qcoutEntry && orderupdate) {
                res.status(200).json({ message: "Sales Order Packed Successfully" });
            }
            else{
                return res.status(500).json({ message: 'Error in Creating Packing Entry'})
            }
        }

     
     })
 
    }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error', error: err })
     }
 };

 export const createunPacking = async (req: Request, res: Response) => {
    try{
     const { id, orderpk, 
        fulfillquantity } = req.body.item;
   
     const actionedBy = req.cookies.user;

     await sequelize.transaction( async (transaction) =>{
        
      
        const packingUpdate = await orderPackingModel.update(
            {
                BatchID:null,
                mfgDate:null,
                packingStatus:0,
                packingquantity:null,
                convpackingquantity:null,
                remarks:null,
                createdBy:actionedBy
            },
            {
                where: {
                    id
                }, transaction
            }
        );
        if(packingUpdate){
          

            const orderupdate = await orderPrimaryModel.update(
                {
                    actualquantity:sequelize.literal(`actualquantity- ${fulfillquantity}`),
                },
                {
                    where: {
                        id:orderpk
                    }, transaction
                }
            );
            if ( orderupdate) {
                res.status(200).json({ message: "Sales Order unPacked Successfully" });
            }
            else{
                return res.status(500).json({ message: 'Error in Creating UnPacking'})
            }
        }

     
     })
 
    }
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Internal server error', error: err })
     }
 };