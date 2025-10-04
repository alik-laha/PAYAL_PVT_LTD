import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import RcvVillageInModel from "../../model/RcvVillageInModel";
//import VendorName from "../../model/vendorNameModel";
import { Op, Sequelize } from "sequelize";

import { creditNotercvData, rlotNoData, vlotNoData } from "../../type/type";
//import WhatsappMsg from "../../helper/WhatsappMsg";
import VLotNo from "../../model/vlotNomodel";
import VLotDetails from "../../model/vLotDetailsModel";
import RcnPeeling from "../../model/peelingModel";
import creditNoteEditModel from "../../model/creditNoteEditModel";
import creditNoteModel from "../../model/creditNoteModel";
import RLotDetails from "../../model/rLotDetailsModel";
import RLotNo from "../../model/rlotNomodel";


export const getCreditNoteeditpending = async (req: Request, res: Response) => {
    try {
        const rcnEdit = await creditNoteEditModel.findAll({
            order: [['recevingDate', 'DESC']], // Order by date descending
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
export const sumofAllTypeCreditNote = async (req: Request, res: Response): Promise<Response> => {
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
        const AllOriginRcnPrimary = await creditNoteModel.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('quantity')), 'quantity']
            ],
            where: {
               
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'N/A' }
                ],status:1,
                recevingDate: {
                    [Op.between]: [targetDate, today]
                }
            },
            group: ['origin']
        });

        const CountPendingEdit = await creditNoteEditModel.count();

        // Send the result as a response
        return res.status(200).json({ AllOriginRcnPrimary, CountPendingEdit });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
   
};
export const getUnEntriedCreditNote = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await creditNoteModel.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('gatePassNo')),'gatePassNo']],
            where: {
                status:status
            }

        });
        if(rcnLot){
            res.status(200).json({ message: "UnEntried Credit Note Found", rcnLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Credit Note Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const getCreditNoteByGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await creditNoteModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Credit Note Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in UnEntried Credit Note Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const updateCreditNote = async (req: Request, res: Response) => {
    try {
        const {  creditNoteNo,
    grade,
    origin,
    vendorName,
    quantity,
    totalWt,
    type,
    unitPrice,
    remarks,
    totalBill } = req.body.data;
    
        const id=req.params.id;
        const createdBy = req.cookies.user;
       
        const newPackageMaterial = await creditNoteModel.update(
          {
            creditNoteNo,
            gradeName:grade,
            origin,
            vendorName,
            quantity,
            totalWt,
            type,
            unitPrice,
            remarks,
            totalBill,
            status: 1,
            createdBy: createdBy,
          },
          {
            where: {
              id: id,
            },
          }
        );
        if(newPackageMaterial){
            return res.status(201).json({ message: "Credit Note Items Received Successfully", newPackageMaterial });
        }
        else{
            return res.status(500).json({ message: "internal error while creating Credit Note Receiving" });
        }
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal error while Receiving Credit Note" });

    }
}
export const updateCreditNoteEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const { creditNoteNo,
    grade,
    origin,
    vendorName,
    quantity,
    totalWt,
    type,
    unitPrice,
    remarks,
        totalBill   } = firstrow;


      await sequelize.transaction(async (transaction: any) => {

            const newPackageMaterial = await creditNoteModel.update({
            creditNoteNo,
            gradeName:grade,
            origin,
            vendorName,
            quantity,
            totalWt,
            type,
            unitPrice,
            remarks,
            totalBill,
            status: 1,
            createdBy: createdBy
            }, {
                where: {
                    id: id
                },transaction
            });
        
            if (newPackageMaterial ) {
                const dataToUpdate = formData.slice(1)
                for (let data of dataToUpdate) {
                    //console.log(data)
                    await creditNoteModel.create({
                        gatePassNo: data.GatePassNo,
                        recevingDate: data.recevingDate,
                        grossWt: data.GrossWt,
                        truckNo: data.TruckNo,
                        gateType: data.gateType,

                        creditNoteNo:data.creditNoteNo,
            gradeName:data.grade,
            origin:data.origin,
            vendorName:data.vendorName,
            quantity:data.quantity,
            totalWt:data.totalWt,
            type:data.type,
            unitPrice:data.unitPrice,
            remarks:data.remarks,
            totalBill:data.totalBill,
            status: 1,
            createdBy: createdBy
                    }, { transaction })

                }

                
                return res.status(201).json({ message: "Credit Note Items Received successfully" });

            }
            else{
                return res.status(500).json({ message: "internal error while receiving Credit Note" });
            }

        })

   } catch (error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "internal error while receiving CreditNote Entry" ,error});
        }
   

    }
}
export const searchCreditNote = async (req: Request, res: Response) => {
    try {
        const { searchitem, fromDate, toDate, almondtype, origin } = req.body;
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
                    { creditNoteNo: { [Op.like]: `%${searchitem}%` } }
                ]
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                recevingDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        if (almondtype) {
            whereClause.push({
                type: almondtype
            });
        }
     
   
        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
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
        if (limit === 0 && offset === 0) {
            rcnEntries = await creditNoteModel.findAll({
                where,
                order: [['gatePassNo', 'DESC'], ['recevingDate', 'DESC']], // Order by date descending

            });
        }
        else {
            rcnEntries = await creditNoteModel.findAll({
                where,
                order: [['gatePassNo', 'DESC'], ['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }

        return res.status(200).json({ msg: 'Credit Note Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }

}
export const EditCreditNoteEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        console.log('Reached Here')
        const {   gatePassNo,gatetype,date,
        grossWt,
        truckNo,
        creditNoteNo,
        gradeName,
        origin,
        vendorName,
        quantity,
        totalWt,
        unitPrice,
        type,
        totalBill,
        remarks } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        //console.log(req.body)
        let vendortype:string
        if(gatetype==='IN'){
            vendortype='Vendor'
        }
        else{
            vendortype='Party'
        }
       
        //let vendorData = await VendorName.findOne({ where: { vendorName:VendorNam,type:vendortype,section:'Almond' } });
        // if( !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        // else{
        //     //folllowing code block will enter here
     
        // }

        const packageMaterialData: creditNotercvData = await creditNoteModel.findOne({ where: { id } }) as unknown as creditNotercvData;
        if (!packageMaterialData) return res.status(404).json({ message: "CreditNote Item not found" });
        let netwt=req.body.netWeight
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await creditNoteEditModel.create({
            id: packageMaterialData.id,
            gateType:gatetype,
            gatePassNo:gatePassNo,
            grossWt:grossWt,
            netWeight:netwt,
            recevingDate:date,
            status:1, gradeName, origin,
            createdBy: createdBynew,
            editStatus: "Pending",
            quantity,remarks,
            truckNo,
            creditNoteNo,unitPrice,
            type,vendorName,totalWt,totalBill
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Credit Note Item" });
        const updatePackageMaterial = await creditNoteModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Credit Note Item" });
        //const data = await WhatsappMsg("OilMill Dispatch", createdBynew,"modify_request","Receiving")
        //console.log(data)
        return res.status(201).json({ message: "Credit Note Item Edited successfully" });
    }
    catch (err) {
        console.log(err);
    }
}
export const approveEditCreditNote = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const editPackageMaterial: creditNotercvData = await creditNoteEditModel.findOne({ where: { id } }) as unknown as creditNotercvData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit credit note material not found" });

        // const vendor = await VendorName.findOne({ where: { vendorName:editPackageMaterial.vendorName } });
        // if (!vendor) {
        //     VendorName.create({ vendorName:editPackageMaterial.vendorName, createdBy: editPackageMaterial.createdBy });
        // }
        // const skuData = await SkuModel.findOne({ where: { sku:editPackageMaterial.sku } });
        // if (!skuData) {
        //     SkuModel.create({ sku:editPackageMaterial.sku, unit:editPackageMaterial.unit,createdBy: editPackageMaterial.createdBy });
        // }


        const updatePackageMaterial = await creditNoteModel.update({
            gradeName: editPackageMaterial.gradeName,
            origin: editPackageMaterial.origin,
            quantity: editPackageMaterial.quantity,
            remarks: editPackageMaterial.remarks,
            totalWt: editPackageMaterial.totalWt,
            creditNoteNo: editPackageMaterial.creditNoteNo,
            type: editPackageMaterial.type,
            unitPrice: editPackageMaterial.unitPrice,
            vendorName: editPackageMaterial.vendorName,
            totalBill: editPackageMaterial.totalBill,
            editStatus: "Approved",
            approvedBy: req.cookies.user,
            createdBy: editPackageMaterial.createdBy
        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting Credit Note material" });
        const deleteEditPackageMaterial = await creditNoteEditModel.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting credit note material" });
        return res.status(200).json({ message: "Credit Note material accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}
export const rejectCreditNotePrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await creditNoteEditModel.destroy({ where: { id } });
        if (EditPackagingMaterialdata) {
            const packageMaterialData = await creditNoteModel.update({
                editStatus: "Rejected",
                approvedBy: req.cookies.user,
            }, { where: { id } });


            if (packageMaterialData) {
                return res.status(200).json({ message: "Rejected" })
            }
        }



    }
    catch (err) {
        console.log(err)
    }
}
export const getUnEntriedRcvCreditNoteRLOT = async (req: Request, res: Response) => {

    try {

        const rlotsum = await creditNoteModel.findAll({
            attributes: [
                'recevingDate',
                [sequelize.fn('SUM', sequelize.col('totalWt')), 'totalWeight']
            ],
            where: {

                editStatus: {
                    [Op.notLike]: 'Pending'
                },
                recevingDate: {
                    [Op.notIn]: Sequelize.literal(`(SELECT DISTINCT recevingDate FROM rlotNos)`)
                }
            },
            group: ['recevingDate']
        });
        if (rlotsum) {
            res.status(200).json({ message: "UnEntried RLOT Credit Note Primary Items Found", rlotsum });
        }
        else {
            res.status(500).json({ message: "Error in Finding UnEntried CreditNote RLOT In Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const getRcvCreditNotebyDate = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const rcnmainLot = await creditNoteModel.findAll({
            where: {
                recevingDate: lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if (rcnmainLot) {
            res.status(200).json({ message: "UnEntried Credit Note Entry", rcnmainLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding UnEntried Credit Note In Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}








export const searchRLOTDetails = async (req: Request, res: Response) => {
    try {
        const { searchitem, fromDate, toDate, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                vlotNo: {
                    [Op.like]: `%${searchitem}%`
                }
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                recevingDate: {
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





        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if (limit === 0 && offset === 0) {
            rcnEntries = await RLotDetails.findAll({
                where,
                order: [['recevingDate', 'DESC']], // Order by date descending

            });
        }
        else {
            rcnEntries = await RLotDetails.findAll({
                where,
                order: [['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }

        return res.status(200).json({ msg: 'RLOT Details Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }

}



export const createEntireRLOT = async (req: Request, res: Response) => {

    try {
        const feeledBy = req.cookies.user;
        const formData = req.body.formData
        const date = req.body.date

        const currentDate = new Date();
        const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

        // Get the latest sequence ID from the database
        const latestSequence: rlotNoData | null = await RLotNo.findOne({
            order: [['id', 'DESC']],
        }) as rlotNoData | null;

        //let sequenceId = 0;
        let sequenceId = Number(process.env.START_RLOTNO)
        if (latestSequence) {
            const latestYear = parseInt(latestSequence.rlotNo.split('-R')[0], 10);
            if (latestYear === currentYear) {
                sequenceId = parseInt(latestSequence.rlotNo.split('-R')[1], 10) + 1;
            }
        }
        // Generate the new sequence
        const newSequence = currentYear + '-R' + sequenceId.toString().padStart(3, '0');


        await sequelize.transaction(async (transaction: any) => {
            const lotGen = await RLotNo.create({ rlotNo: newSequence, recevingDate: date, createdBy: feeledBy }, { transaction })
            if (lotGen) {
                for (let data of formData) {

                    const rlotcreate = await RLotDetails.create({
                        rlotNo: newSequence,
                        recevingDate: date,
                        origin: data.origin,
                        qty: data.Receiving_Qty,
                        actual_qty: data.actual_Receiving_Qty,
                        loss: data.Loss,
                        loss_prcntg: ((Number(data.Receiving_Qty) - Number(data.actual_Receiving_Qty)) / Number(data.Receiving_Qty)) * 100,
                        createdBy: feeledBy


                    }, { transaction });

                    await RcnPeeling.create({
                        id: 20000 + parseInt(rlotcreate.dataValues.id),
                        LotNo: newSequence,
                        origin: data.origin,
                        //InputMoisture:data.OutputMoisture,
                        TotalInput: data.actual_Receiving_Qty,
                        noOfOperators: 0
                        //NoOfTrolley: data.NoOfTrolley,

                    }, { transaction });
                }
                res.status(200).json({ message: `R-LOT Entry ${newSequence} Generated Successfully` });

            }
        })




    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating V-LOT Entry", error });
        }
    }

}

export const getStatusRLOT = async (req: Request, res: Response) => {

    try {
        const date = req.body.date
        const completed = await RLotNo.count({
            where: { recevingDate: date }
        });


        res.status(200).json({ message: "RLOT Count", completed });
    }
    catch (err) {
        res.status(500).json({ message: "Error in RLOT COUNT", error: err });
    }

}
