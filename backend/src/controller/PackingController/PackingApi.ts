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


const CY_FY = process.env.CY_FY ? process.env.CY_FY : '2025-26';
function formatNumber(num:any) {
    return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
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
                        ordStatus:0
                    }
                ]});
            }
            if(orderStatus==='Closed'){
                whereClause.push({  [Op.and]: [
                    {
                        ordMappingStatus: 1
                    },
                    
                    {
                        ordStatus:1
                    }
                ]});
            }
            
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
        const { origin,grade, section } = req.body;
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
    
            return res.status(200).json({ message: 'Prod Stock Entry found', rcnEntries })
        
       
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

                    await orderPrimaryModel.create({
                        orderID: newSequence,
                        orderDate: data.ordDate,
                        orderInvDate: data.invDate,
                        origin: data.origin,
                        gradeName: data.grade,
                        vendorName: data.Vendor,
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
        res.status(200).json({ message: "Purchase Order Rejected Successfully" });
    }

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
        const orderupdate = await orderPrimaryModel.update(
            {
                ordApproveStatus: 'Approved',
                approvedBy:actionedBy
            },
            {
                where: {
                    id:item.id
                }, transaction
            }
        );
        if (orderupdate) {
          
            const packingEntry = await orderPackingModel.create({
                origin: item.origin,
                orderID: item.orderID,
                orderDate: item.orderInvDate,
                gradeName:item.gradeName,
                vendorName:item.vendorName,
                demandQuantity: item.quantity,
                unitRate:item.unitRate,
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

            if (mappingEntry && packingEntry) {
                res.status(200).json({ message: "Purchase Order Approved Successfully" });
            }
            else{
                return res.status(500).json({ message: 'Error in Creating Mapping'})
            }
        }
        else{
            return res.status(500).json({ message: 'Error in Approving Order'})
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
                    LotNo:LotNo,origin:origin,Status: 1, editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: [grade],
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
                    LotNo:LotNo,origin:origin,Status: 1, editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: [grade],
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
                    LotNo:LotNo,origin:origin,Status: 1, editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: [grade],
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
                  group: [grade],
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
                    LotNo:LotNo,origin:origin,Status: 1, editStatus: {[Op.notLike]:'Pending'},
                  },
                  group: [grade],
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
                  group: [grade],
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


export const updateMappingOrder = async (req: Request, res: Response) => {
    try {
        const {   LotNo,packingpk,
            porigin,
            section,
            grade,
            stockquantity,
            prcntg,
            mixquantity,
            remarks,orderpk} = req.body.data;

        const id=req.params.id;
        const amount=req.params.amount;
        const createdBy = req.cookies.user;
        let skuData = await lotoriginmodel.findOne({ where: { LotNo:LotNo,origin:porigin } });
        if(!skuData ){
            return res.status(500).json({ message: "Lot No Does Not Exist" });
        }
        else{
            await sequelize.transaction( async (transaction) =>{
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
                    prcntgMix:prcntg,
                    mappedQuantity:mixquantity,
                    remarks,
                    createdBy,mappingStatus:1
                }, {
                    where: {
                        id: id
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
                
                
                if(orderupdate && mappingupdate && packingInitial){
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
        const amount = req.params.amount;
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
            remarks, orderpk } = firstrow;
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
                    if (data.stockquantity < data.mixquantity) {
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

                        LotNo:data.LotNo,
                        productionOrigin:data.porigin,
                        productionSection:data.section,
                        productionGrade:data.grade,
                        sectionQuantity:data.stockquantity,
                        prcntgMix:data.prcntg,
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
                    prcntgMix:prcntg,
                    mappedQuantity:mixquantity,
                    remarks,
                    createdBy,mappingStatus:1
                }, {
                    where: {
                        id: id
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



                if(orderupdate && mappingupdate && packingInitial){
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