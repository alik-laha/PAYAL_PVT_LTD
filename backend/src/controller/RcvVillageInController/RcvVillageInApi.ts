import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import RcvVillageInModel from "../../model/RcvVillageInModel";
import VendorName from "../../model/vendorNameModel";
import { Op } from "sequelize";
import RcvVillageInEditModel from "../../model/RcvVillageInEditModel";

export const getUnEntriedRcvVillageIn = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await RcvVillageInModel.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('gatePassNo')),'gatePassNo']],
            where: {
                status:status
            }

        });
        if(rcnLot){
            res.status(200).json({ message: "UnEntried Village In Primary Items Found", rcnLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const getRcvVillageInbyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await RcvVillageInModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Village In Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const updateRcvVillageIn = async (req: Request, res: Response) => {
    try {
        const { gateType,sku, vendorN, quantity ,invoice,type,remarks,totalWt,
            origin,
            wholes,
            wholesprcntg,
            lw,
            lwprcntg,
            jb,
            jbprcntg,
            sdp,
            sdpprcntg,
            husk,
            huskprcntg,
            piece,
            pieceprcntg,
            dp,
            dpprcntg
        } = req.body.data;
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
        const id=req.params.id;
        const createdBy = req.cookies.user;
      
        let vendorData = await VendorName.findOne({ where: { vendorName:vendorN,type:vendortype,section:'Village' } });
        if(!vendorData){
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }
        else{
            const newPackageMaterial = await RcvVillageInModel.update({
               
                sku,invoice,type,
                vendorName:vendorN,
                quantity,origin,
                remarks,totalWt,
                wholes_quantity:wholes,
                wholes_prcntg:wholesprcntg,
                pieces_quantity: piece,
                pieces_prcntg: pieceprcntg,
                lw_quantity: lw,
                lw_prcntg: lwprcntg,
                dp_quantity: dp,
                dp_prcntg: dpprcntg,
                jb_quantity: jb,
                jb_prcntg: jbprcntg,
                sdp_quantity: sdp,
                sdp_prcntg: sdpprcntg,
                husk_quantity: husk,
                husk_prcntg: huskprcntg,
                createdBy,status:1
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "Village material Received successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating Village Entry" });
            }
        }
      
            

        
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating Village Entry" });

    }
}

export const updateRcvVillageInEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const { sku, vendorN, quantity, invoice, type, remarks, totalWt,origin,
            wholes,
            wholesprcntg,
            lw,
            lwprcntg,
            jb,
            jbprcntg,
            sdp,
            sdpprcntg,
            husk,
            huskprcntg,
            piece,
            pieceprcntg,
            dp,
            dpprcntg } = firstrow;
        let vendorData = await VendorName.findOne({ where: { vendorName:vendorN,type:'Vendor',section:'Village' } });
        if(!vendorData){
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }
        else{
            await RcvVillageInModel.sequelize?.transaction(async (transaction) => {
                const newPackageMaterial = await RcvVillageInModel.update({
                    sku, invoice, type,
                    vendorName:vendorN,
                    quantity,origin,
                    wholes_quantity:wholes,
                wholes_prcntg:wholesprcntg,
                pieces_quantity: piece,
                pieces_prcntg: pieceprcntg,
                lw_quantity: lw,
                lw_prcntg: lwprcntg,
                dp_quantity: dp,
                dp_prcntg: dpprcntg,
                jb_quantity: jb,
                jb_prcntg: jbprcntg,
                sdp_quantity: sdp,
                sdp_prcntg: sdpprcntg,
                husk_quantity: husk,
                husk_prcntg: huskprcntg,
                    remarks, totalWt,
                    createdBy, status: 1
                }, {
                    where: {
                        id: id
                    }, transaction
                });
                if (newPackageMaterial) {
                    const dataToUpdate = formData.slice(1)
                    for (let data of dataToUpdate) {
                        console.log(data)
                        let vendorData = await VendorName.findOne({ where: { vendorName:data.vendorN,type:'Vendor',section:'Village' } });
                    if (!vendorData) {
                        res.status(500).json({ message: "Vendor Does Not Exist" });
                        throw new Error('Transaction Aborted')
                    }
                        await RcvVillageInModel.create({
                            gatePassNo: data.GatePassNo, grossWt: data.GrossWt, truckNo: data.TruckNo,
                            recevingDate: data.recevingDate,
                            sku: data.sku, invoice: data.invoice,
                            vendorName: data.vendorN, type: data.type,
                            quantity: data.quantity,
                            wholes_quantity:wholes,origin:data.origin,
                wholes_prcntg:data.wholesprcntg,
                pieces_quantity: data.piece,
                pieces_prcntg: data.pieceprcntg,
                lw_quantity: data.lw,
                lw_prcntg: data.lwprcntg,
                dp_quantity: data.dp,
                dp_prcntg: data.dpprcntg,
                jb_quantity: data.jb,
                jb_prcntg: data.jbprcntg,
                sdp_quantity: data.sdp,
                sdp_prcntg: data.sdpprcntg,
                husk_quantity: data.husk,
                husk_prcntg: data.huskprcntg,
                            remarks: data.remarks, totalWt: data.totalWt,
                            createdBy, status: 1, gateType: data.gateType
                        }, { transaction })
                    }
                    return res.status(201).json({ message: "Village Item received successfully" });
                }
                else {
                    return res.status(500).json({ message: "internal error while creating Village Receive Entry" });
                }
    
               
            })
        }

        
    
    } catch (error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "internal error while creating Village Entry" ,error});
        }
   

    }
}

export const deleteVillageInPrimary = async (req: Request, res: Response) => {
    try{
    const id = req.body.id
    const gatepass = req.body.gatepass
    await RcvVillageInModel.update(
        {
            sku:null,
            invoice:null,
            vendorName:null,
            quantity:null,
            origin:null,
            type:null,
            wholes_prcntg:null,
            pieces_quantity: null,
            pieces_prcntg: null,
            lw_quantity: null,
            lw_prcntg: null,
            dp_quantity: null,
            dp_prcntg: null,
            jb_quantity: null,
            jb_prcntg: null,
            sdp_quantity: null,
            sdp_prcntg: null,
            husk_quantity: null,
            husk_prcntg: null,
            createdBy:null,
            status:0,remarks:null,totalWt:null
           
        },
        {
            where: {
                id:id
            },
        }
    );
   

    await RcvVillageInModel.destroy({
        where: {
            gatePassNo: gatepass,
            id: { [Op.notLike]: id } 
            
        }
    });
    return res.status(200).json({ message: "Village Item Entry Is deleted successfully" })
}

    catch{
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export const searchRcvVillageIn = async (req: Request, res: Response) => {
    try {
        const { searchitem, gatetype,fromDate, toDate, almondtype,almondgrade } = req.body;
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
                recevingDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        if (almondtype) {
            whereClause.push({
                type:almondtype
            });
        }
        if (almondgrade) {
            whereClause.push({
                sku: {
                    [Op.like]: `%${almondgrade}%`
                }
            });
        }
        if (gatetype) {
            whereClause.push({
                gateType: {
                    [Op.like]: `%${gatetype}%`
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
             rcnEntries = await RcvVillageInModel.findAll({
                where,
                order: [['gatePassNo','DESC'],['recevingDate', 'DESC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await RcvVillageInModel.findAll({
                where,
                order: [['gatePassNo','DESC'],['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ msg: 'Rcv Village Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
 
}

export const sumofRcvVillageInPrimary = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0, 0, 0, 0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else {
            targetDate = new Date(`${Year}-04-01`);
        }


        targetDate.setHours(0, 0, 0, 0)
        if (today.getHours() < 5 || (today.getHours() === 5 && today.getMinutes() <= 30)) {
            today.setHours(today.getHours() + 5);
            today.setMinutes(today.getMinutes() + 30);
        }
        const sumofRcvVillageInPrimary = await RcvVillageInModel.count({
            where: {
                recevingDate: {
                    [Op.between]: [targetDate, today]
                }
                ,editStatus:{
                    [Op.notLike]:'Pending'
                },status:1
            },distinct:true,col:'gatePassNo'
        });
    
        const RcvVillageInPrimary = await RcvVillageInEditModel.count();
        return res.status(200).json({ sumofRcvVillageInPrimary, RcvVillageInPrimary });
    }
    catch (err) {
        console.log(err)
    }
}

export const getEditRcvVillageInPrimary = async (req: Request, res: Response) => {
    try {
        const editPackageMaterial = await RcvVillageInEditModel.findAll({
            order: [['recevingDate', 'DESC']]
        });
        if (!editPackageMaterial) {
            return res.status(200).send({ message: "No pending edit Available" });
        }
        return res.status(200).send(editPackageMaterial);
    }
    catch (err) {
        console.log(err);
    }
}
