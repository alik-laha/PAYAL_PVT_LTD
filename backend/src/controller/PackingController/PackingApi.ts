import { Request, Response } from 'express';
import { updateProductionGradeStock2425 } from '../../Cronjobs/stockupdateProductionGrade';
import { Op } from 'sequelize';
import productionStockGrade2425 from '../../model/productionStockgrade2425';
import OrderID from '../../model/orderIDModel';
import { orderNoData } from '../../type/type';
import sequelize from '../../config/databaseConfig';
import orderPrimaryModel from '../../model/orderModel';


export const manualProdStockUpdate = async (req: Request, res: Response) => {
    try {
        await updateProductionGradeStock2425();
        res.status(200).json({ message: 'Production Stock update triggered successfully.' });
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
    
            return res.status(200).json({ message: 'Prod Stock Entry found', rcnEntries })
        }
       
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
                        CreatedBy: feeledBy


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