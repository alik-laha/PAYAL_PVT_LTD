import { Request, Response } from "express";

import cashewOutEditModel from "../../model/cashewOutEditModel";
import cashewOutModel from "../../model/cashewOutModel";
import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import orderPackingModel from "../../model/orderPackingModel";
import { cashewOutRcvData } from "../../type/type";
import WhatsappMsg from "../../helper/WhatsappMsg";

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
                    { editStatus: 'NA' }
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
                        { dispatchStatus: { [Op.ne]: 1 } },
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

export const updateCashewOut = async (req: Request, res: Response) => {
    try {
        const { batchNo,
            partyName,
            gradeName,
            quantity,
            actualquantity,
            noOfBags,
            noOfActualBags,
            origin,
            invoice } = req.body.data;
    
        const id=req.params.id;
        const createdBy = req.cookies.user;
       
        const newPackageMaterial = await cashewOutModel.update({
            batchNo: batchNo,
            partyName: partyName,
            gradeName:gradeName,
            quantity:quantity,
            actualquantity:actualquantity,
            noOfBags:noOfBags,
            noOfActualBags:noOfActualBags,
            origin:origin,
            invoice:invoice,
            status: 1,
           createdBy:createdBy
        }, {
            where: {
                id: id
            }
        });
        if(newPackageMaterial){
            const packupdate=await orderPackingModel.update({
                        dispatchStatus: 1
                    }, {
                        where: {
                            BatchID: batchNo
                        }
                    });
                    if(packupdate){
                        return res.status(201).json({ message: "Finished Cashew dispatched successfully", newPackageMaterial });
                    }
                    else{
                         return res.status(500).json({ message: "Internal error while Dispatching Mark in Packing" });
                    }
            
        }
        else{
            return res.status(500).json({ message: "Internal error while Dispatching Cashew" });
        }
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal error while Dispatching Cashew" });

    }
}

export const updateCashewOutEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const { batchNo,
            partyName,
            gradeName,
            quantity,
            actualquantity,
            noOfBags,
            noOfActualBags,
            origin,
            invoice  } = firstrow;


      await sequelize.transaction(async (transaction: any) => {

            const newPackageMaterial = await cashewOutModel.update({
                batchNo: batchNo,
                partyName: partyName,
                gradeName: gradeName,
                quantity: quantity,
                actualquantity: actualquantity,
                noOfBags: noOfBags,
                noOfActualBags: noOfActualBags,
                origin: origin,
                invoice: invoice, status: 1,
                createdBy: createdBy
            }, {
                where: {
                    id: id
                },transaction
            });
          const packupdate = await orderPackingModel.update({
              dispatchStatus: 1
          }, {
              where: {
                  BatchID: batchNo
              }
          });
            if (newPackageMaterial && packupdate) {
                const dataToUpdate = formData.slice(1)
                for (let data of dataToUpdate) {
                    //console.log(data)
                    await cashewOutModel.create({
                        gatePassNo: data.GatePassNo,
                        date: data.recevingDate,
                        grossWt: data.GrossWt,
                        truckNo: data.TruckNo,

                        batchNo: data.batchNo,
                        partyName: data.partyName,
                        gradeName: data.gradeName,
                        quantity: data.quantity,
                        actualquantity: data.actualquantity,
                        noOfBags: data.noOfBags,
                        noOfActualBags: data.noOfActualBags,
                        origin: data.origin,
                        invoice: data.invoice, status: 1,
                        createdBy: createdBy
                    }, { transaction })

                    await orderPackingModel.update({
                        dispatchStatus: 1
                    }, {
                        where: {
                            BatchID: data.batchNo
                        }, transaction
                    });
                }

                
                return res.status(201).json({ message: "Finished Cashew Dispatched successfully" });

            }
            else{
                return res.status(500).json({ message: "internal error while dispatching Finshed Cashew" });
            }

        })

    } catch (error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "internal error while creating Agarbati Entry" ,error});
        }
   

    }
}

export const SearchCashewOutPrimary = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin,grade } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                [Op.or]: [
                    { gatePassNo: { [Op.like]: `%${searchitem}%` } },
                    { invoice: { [Op.like]: `%${searchitem}%` } }
                ]
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                date: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }
        if (grade) {
            whereClause.push({
                gradeName: {
                    [Op.like]: `%${grade}%`
                }
            });
        }
       
        whereClause.push({
            status: {
                [Op.eq]: 1
            }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await cashewOutModel.findAll({
                where,
                order: [['gatePassNo','DESC'],['date', 'DESC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await cashewOutModel.findAll({
                where,
                order: [['gatePassNo','DESC'],['date', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ msg: 'Cashew Out Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
 
}

export const EditCashewOutEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        console.log('Reached Here')
        const {  gatePassNo,invoice,date,
            grossWt, truckNo, noOfBags, noOfactualBags,quantity,actquantity,origin,partyName,gradeName,batchno,oldbatchNo } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        //console.log(req.body)
      
       
        //let vendorData = await VendorName.findOne({ where: { vendorName:VendorNam,type:vendortype,section:'Almond' } });
        // if( !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        // else{
        //     //folllowing code block will enter here
     
        // }

        const packageMaterialData: cashewOutRcvData = await cashewOutModel.findOne({ where: { id } }) as unknown as cashewOutRcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Cashew Out Item not found" });
        let netwt=req.body.netWeight
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await cashewOutEditModel.create({
            id: packageMaterialData.id,
            gatePassNo: gatePassNo,
            grossWt: grossWt,
            netWeight: netwt,
            date: date,
            editStatus: "Pending",
            truckNo: truckNo,
            batchNo: batchno,
            partyName: partyName,
            gradeName: gradeName,
            quantity: quantity,
            actualquantity: actquantity,
            noOfBags: noOfBags,
            noOfActualBags: noOfactualBags,
            origin: origin,
            invoice: invoice, status: 1,
            createdBy: createdBynew,
            approvedBy:oldbatchNo
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Cashew Out Item" });
        const updatePackageMaterial = await cashewOutModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Cashew Out Item" });
        const data = await WhatsappMsg("Finished Cashew Dispatch", createdBynew,"modify_request","Receiving")
        console.log(data)
        return res.status(201).json({ message: "Finished Cashew Item edited successfully" });

        
        

    }
    catch (err) {
        console.log(err);
    }
}

export const EditRejectCashewOut = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await cashewOutModel.update({
            editStatus: "NA",
            approvedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Cashew Out Entry not found" });
        }
        const rcnEdit = await cashewOutEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Cashew Out Entry not found" });
        }
        return res.status(200).json({ message: "Cashew Out Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const approveCashewOut = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const approvedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const rcn: cashewOutRcvData | null = await cashewOutEditModel.findOne({
            where: {
                id
            }
        }) as cashewOutRcvData | null;
        if (!rcn) {
            return res.status(400).json({ message: "Cashew Out Entry not found" });
        }

        if(rcn.approvedBy!==rcn.batchNo){
                await orderPackingModel.update({
                        dispatchStatus: 1
                    }, {
                        where: {
                            BatchID: rcn.batchNo
                        }
                    });

               await orderPackingModel.update({
                        dispatchStatus: 0
                    }, {
                        where: {
                            BatchID: rcn.approvedBy
                        }
                    });    
        }
        const rcnEdit = await cashewOutModel.update({
            batchNo: rcn.batchNo,
            partyName: rcn.partyName,
            gradeName:rcn.gradeName,
            quantity:rcn.quantity,
            actualquantity:rcn.actualquantity,
            noOfBags:rcn.noOfBags,
            noOfActualBags:rcn.noOfActualBags,
            origin:rcn.origin,
            invoice:rcn.invoice,
            editStatus: "Approved",
            approvedBy:approvedBy,
            createdBy:rcn.createdBy,
           
        }, {
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Cashew Out Entry is not found" });
        }
        const rcnEditDelete = await cashewOutEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEditDelete) {
            return res.status(400).json({ message: "Cashew Out Entry is not found" });
        }


        return res.status(200).json({ message: "Edit Request of Cashew Out Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
