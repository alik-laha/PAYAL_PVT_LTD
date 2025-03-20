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

const CY_FY = process.env.CY_FY ? process.env.CY_FY : '2025-26';

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
                    res.status(200).json({ message: "Order Entry Made Successfully" });
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