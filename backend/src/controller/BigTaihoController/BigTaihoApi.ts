import { Request, Response } from "express";


import Mayur from "../../model/mayurModel";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import DPDS from "../../model/dpdsmodel";
import DPDSEdit from "../../model/dpdsEditModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import mixingModel from "../../model/mixingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import bigTaihoEditModel from "../../model/bigTaihoEditModel";


// //BigTaiho.tsx
export const findEditBigTaihoSAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await bigTaihoEditModel.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditBigTaihoAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error });
    }
}
export const sumOfallBigTaiho = async (req: Request, res: Response) => {

    
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

        const data = await bigTaihoModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_ssp')), 'issue_ssp'],
                [sequelize.fn('sum', sequelize.col('issue_ssp_small')), 'issue_ssp_small'],
                [sequelize.fn('sum', sequelize.col('issue_swp_1')), 'issue_swp_1'],
                [sequelize.fn('sum', sequelize.col('issue_wsp')), 'issue_wsp'],
                [sequelize.fn('sum', sequelize.col('issue_bits')), 'issue_bits'],
                [sequelize.fn('sum', sequelize.col('issue_swp')), 'issue_swp'],
                [sequelize.fn('sum', sequelize.col('issue_bb')), 'issue_bb'],
                [sequelize.fn('sum', sequelize.col('issue_w_bb')), 'issue_w_bb'],
                [sequelize.fn('sum', sequelize.col('issue_bb_A')), 'issue_bb_A'],
                [sequelize.fn('sum', sequelize.col('issue_bb1')), 'issue_bb1'],
                [sequelize.fn('sum', sequelize.col('issue_bb1_A')), 'issue_bb1_A'],
                [sequelize.fn('sum', sequelize.col('issue_bb_2')), 'issue_bb_2'],
                [sequelize.fn('sum', sequelize.col('issue_ssp_1')), 'issue_ssp_1'],
                [sequelize.fn('sum', sequelize.col('issue_ssp_1_small')), 'issue_ssp_1_small'],
                [sequelize.fn('sum', sequelize.col('issue_ssp_2')), 'issue_ssp_2'],
                [sequelize.fn('sum', sequelize.col('issue_ssp_2_small')), 'issue_ssp_2_small'],
                [sequelize.fn('sum', sequelize.col('issue_sdp')), 'issue_sdp'],
             
                [sequelize.fn('sum', sequelize.col('issue_add_1')), 'issue_add_1'],
                [sequelize.fn('sum', sequelize.col('issue_add_2')), 'issue_add_2'],
                [sequelize.fn('sum', sequelize.col('issue_add_3')), 'issue_add_3'],
                [sequelize.fn('sum', sequelize.col('issue_add_4')), 'issue_add_4'],
                [sequelize.fn('sum', sequelize.col('issue_add_5')), 'issue_add_5'],
                [sequelize.fn('sum', sequelize.col('issue_add_6')), 'issue_add_6'],
                [sequelize.fn('sum', sequelize.col('issue_add_7')), 'issue_add_7'],
                [sequelize.fn('sum', sequelize.col('issue_add_8')), 'issue_add_8'],
                [sequelize.fn('sum', sequelize.col('issue_add_9')), 'issue_add_9'],
                [sequelize.fn('sum', sequelize.col('issue_add_10')), 'issue_add_10'],
                [sequelize.fn('sum', sequelize.col('issue_rejection')), 'issue_rejection'],
                [sequelize.fn('sum', sequelize.col('issue_village')), 'issue_village'],
                [sequelize.fn('sum', sequelize.col('issue_dpds')), 'issue_dpds'],
                [sequelize.fn('sum', sequelize.col('issue_husk')), 'issue_husk'],
                [sequelize.fn('sum', sequelize.col('issue_sorting')), 'issue_sorting'],
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        const EditData = await bigTaihoEditModel.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getBigTaihoLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await bigTaihoModel.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog'],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un BigTaiho Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding BigTaiho Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //BigTaihoInitial.tsx
export const getBigTaihoBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await bigTaihoModel.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un BigTaiho Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding BigTaiho Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //DPDSCreateForm.tsx
export const CreateEntireDPDS= async (req: Request, res: Response) => {
   

    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {     
            if((parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)+(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)
                +(data.rcv_transfer? parseFloat(data.rcv_transfer):0)
           )< (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
           +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
           parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
           + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
           +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
           +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
           +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
               +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
               +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
               +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
               +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
               ))
               {
                console.log(parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                    +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                    +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                    +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            const DPDSUpdate = await DPDS.update(
                {
                    date: data.Date,              
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    issue_m_ds: data.issue_m_ds,
                    issue_m_dp: data.issue_m_dp,
                    issue_k_dp: data.issue_k_dp,
                    issue_ds_1: data.issue_ds_1,
                    issue_ds_2: data.issue_ds_2,
                    issue_sp_2: data.issue_sp_2,
                    issue_yjh: data.issue_yjh,
                    issue_yk: data.issue_yk,
                    issue_kp: data.issue_kp,
                    issue_wp: data.issue_wp,
                    issue_rs: data.issue_rs,
                    issue_dp_2: data.issue_dp_2,
                    issue_dp_3: data.issue_dp_3,
                    issue_dp_4: data.issue_dp_4,
                    issue_dp_3l: data.issue_dp_3l,
                    issue_ss: data.issue_ss,
                    issue_os: data.issue_os,
                    issue_os1: data.issue_os1,
                    issue_add_1: data.issue_add_1,
                    issue_add_2: data.issue_add_2,
                    issue_add_3:data.issue_add_3,
                    issue_add_4: data.issue_add_4,
                    issue_add_5: data.issue_add_5,
                    issue_add_6: data.issue_add_6,
                    issue_add_7: data.issue_add_7,
                    issue_add_8: data.issue_add_8,
                    issue_add_9: data.issue_add_9,
                    issue_add_10: data.issue_add_10,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_mayur: data.issue_mayur, 
                    entry_backlog: (parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)
                    +(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)+(data.rcv_transfer? parseFloat(data.rcv_transfer):0)) 
                    - (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                    +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                    parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                    +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                    +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                    +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                    +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                    +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                    +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                        ),
                    current_backlog: (parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)
                    +(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)+(data.rcv_transfer? parseFloat(data.rcv_transfer):0)) 
                    - (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                    +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                    parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                    +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                    +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                    +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                    +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                    +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                    +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                        ),
                    Status: 1,
                    CreatedBy: feeledBy
                },
                {
                    where: {
                        id: data.id
                    }, transaction
                }
            );
            if (DPDSUpdate) {
                const mayur_backlog = await Mayur.findOne({
                    attributes: ['current_backlog','rcv_DPDS'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(mayur_backlog)
                if (mayur_backlog && mayur_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_mayur,
                        issueid:1,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'Mayur',
                        toSectionBeforeBacklog:mayur_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(mayur_backlog.dataValues.current_backlog)+parseFloat(data.issue_mayur),
                        createdBy: feeledBy
                     },{transaction});
                     if(mayur_backlog.dataValues.rcv_DPDS){
                        await Mayur.update(
                            { 
                                rcv_DPDS:sequelize.literal(`rcv_DPDS+ ${data.issue_mayur}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     else{
                        await Mayur.update(
                            { 
                                rcv_DPDS:data.issue_mayur,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     

                    
                }
                else{
                    res.status(500).json({ message: "Error In Creating Transaction History" });
                    throw new Error('Transaction Aborted')
                } 



                const bigT_backlog = await bigTaihoModel.findOne({
                    attributes: ['current_backlog','rcv_dpds'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(bigT_backlog)
                if (bigT_backlog && bigT_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_bigTaiho,
                        issueid:1,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy
                     },{transaction});
                     if(bigT_backlog.dataValues.rcv_dpds){
                        await bigTaihoModel.update(
                            { 
                                rcv_dpds:sequelize.literal(`rcv_dpds+ ${data.issue_bigTaiho}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     else{
                        await bigTaihoModel.update(
                            { 
                                rcv_dpds:data.issue_bigTaiho,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     

                    
                }
                else{
                    res.status(500).json({ message: "Error In Creating Transaction History" });
                    throw new Error('Transaction Aborted')
                } 
                
                await LotNo.update(
                    { 
                      modifiedBy:'Next Interconnected'
                    },
                    {
                        where: {
                            lotNo:LotNO
                        },transaction
                    }
                );
                const lotupdate = await lotoriginmodel.update(
                    {
                        latest_section: 'DPDS',
                        dPDSStatus: 1
                    },
                    {
                        where: {
                            lotNo: LotNO,
                            origin: data.origin
                        }, transaction
                    }
                );
                if (lotupdate) {
                    res.status(200).json({ message: "DPDS Entry Made Successfully" });
                }
                else {
                    console.log('No Need For Update')
                }
            }


        }

    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating DPDS Entry" ,error});
        }
    }
}

// //DPDSTable.tsx
export const SearchRCNDPDS = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin} = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                LotNo: {
                    [Op.like]: `%${searchitem}%`
                }
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
        whereClause.push({
            Status: {
                [Op.eq]: 1
            }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await DPDS.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await DPDS.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'DPDS Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}
// //DPDSRecreate.tsx
export const CreateReissueDPDS= async (req: Request, res: Response) => {
   

    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
            
            //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
            if(parseFloat(data.rcv_peeling)< (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
            +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
            parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
            + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
            +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
            +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
            +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                ))
                {
                 console.log(parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                 +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                 parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                 + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                 +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                 +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                 +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                     +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                     +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                     +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                     +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur))
                 res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                 throw new Error('Transaction Aborted due to negative value')
 
             }
            
            const dpdsupdate=await DPDS.update(
                {
                    latest:0
                    
                },{
                    where: {
                        id: data.id
                    }, transaction
                }
                   
                
            );
            if(dpdsupdate)
            {
                const reissuecreate=await DPDS.create(
                    {     
                        date:data.Date,
                        altid:parseInt(data.alt_id)+1,
                        LotNo:data.LotNo,
                        origin:data.origin,
                        mixingLot:data.mixingLot,
                        rcv_dp: data.rcv_dp,
                        rcv_ds: data.rcv_ds,
                        rcv_dp1: data.rcv_dp1,
                        rcv_Sorting:data.rcv_Sorting,
                        
                        noOfdayOperators:data.dayoperator,
                        noOfnightOperators:data.nightoperator,
                        rcv_transfer:data.rcv_transfer,
                        issue_m_ds: data.issue_m_ds,
                        issue_m_dp: data.issue_m_dp,
                        issue_k_dp: data.issue_k_dp,
                        issue_ds_1: data.issue_ds_1,
                        issue_ds_2: data.issue_ds_2,
                        issue_sp_2: data.issue_sp_2,
                        issue_yjh: data.issue_yjh,
                        issue_yk: data.issue_yk,
                        issue_kp: data.issue_kp,
                        issue_wp: data.issue_wp,
                        issue_rs: data.issue_rs,
                        issue_dp_2: data.issue_dp_2,
                        issue_dp_3: data.issue_dp_3,
                        issue_dp_4: data.issue_dp_4,
                        issue_dp_3l: data.issue_dp_3l,
                        issue_ss: data.issue_ss,
                        issue_os: data.issue_os,
                        issue_os1: data.issue_os1,
                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3:data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_mayur: data.issue_mayur,
                      
                        entry_backlog:parseFloat(data.rcv_peeling)- (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                        +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                        parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                        + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                        +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                        +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                        +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                        +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                        +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                        +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                        +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                            ),
                       current_backlog:parseFloat(data.rcv_peeling)- (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                       +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                       parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                       + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                       +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                       +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                       +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                       +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                       +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                       +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                       +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                           ),
                        Status: 1,
                        CreatedBy: feeledBy 
                    },
                    {
                        transaction
                    }
                );
                if(reissuecreate)
                {
                    const mayur_backlog = await Mayur.findOne({
                        attributes: ['current_backlog','rcv_DPDS'],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(mayur_backlog)
                    if (mayur_backlog && mayur_backlog.dataValues.current_backlog>=0)
                    {
                        await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_mayur,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'Mayur',
                        toSectionBeforeBacklog:mayur_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(mayur_backlog.dataValues.current_backlog)+parseFloat(data.issue_mayur),
                        createdBy: feeledBy,
                        issueid:parseInt(data.alt_id)+1,
                        },{transaction});
                        if(mayur_backlog.dataValues.rcv_DPDS)
                            {
                        await Mayur.update(
                            { 
                                rcv_DPDS:sequelize.literal(`rcv_DPDS+ ${data.issue_mayur}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                            }
                        else{
                        await Mayur.update(
                            { 
                                rcv_DPDS:data.issue_mayur,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                            }
                     
                       
                    }
                    else{
                        res.status(500).json({ message: "Error In Creating Reissue Mayur Transaction History" });
                        throw new Error('Transaction Aborted')
                    }  

                    const bigT_backlog = await bigTaihoModel.findOne({
                        attributes: ['current_backlog','rcv_dpds'],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(bigT_backlog)
                    if (bigT_backlog && bigT_backlog.dataValues.current_backlog>=0)
                    {
                        await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_bigTaiho,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy,
                        issueid:parseInt(data.alt_id)+1,
                        },{transaction});
                        if(bigT_backlog.dataValues.rcv_dpds)
                            {
                        await bigTaihoModel.update(
                            { 
                                rcv_DPDS:sequelize.literal(`rcv_dpds+ ${data.issue_bigTaiho}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                            }
                        else{
                        await bigTaihoModel.update(
                            { 
                                rcv_dpds:data.issue_bigTaiho,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                            }
                     
                       
                    }
                    else{
                        res.status(500).json({ message: "Error In Creating Reissue BigTaiho Transaction History" });
                        throw new Error('Transaction Aborted')
                    } 

                    const lotupdate = await lotoriginmodel.update(
                        {
                            latest_section: 'DPDS',
                            dPDSStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                        );
                        if (lotupdate) {
                        res.status(200).json({ message: "DPDS Re-Issue Entry Made Successfully" });
                        }
                        else {
                        console.log('No Need For Update')
                        }
                }
                else{
                    return res.status(500).json({ message: "Error while creating Mayur Re Issue Entry"});
                }
            }
            
           
        }
       
        


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating DPDS Re-Issue Entry" ,error});
        }
    }
    


}

export const updateEntireDPDS= async (req: Request, res: Response) => {
   

    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
         
         
            if((parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)+(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)
            +(data.rcv_transfer? parseFloat(data.rcv_transfer):0))< (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
            +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
            parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
            + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
            +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
            +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
            +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                ))
                {
                 console.log(parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                 +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                 parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                 + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                 +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                 +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                 +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                     +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                     +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                     +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                     +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur))
                 res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                 throw new Error('Transaction Aborted due to negative value')
 
             }
           
            
            await DPDSEdit.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                    altid:data.alt_id,
                    mixingLot:data.mixingLot,
                    rcv_dp: data.rcv_dp,
                    rcv_ds: data.rcv_ds,
                    rcv_dp1: data.rcv_ds,
                    rcv_Sorting:data.rcv_Sorting,
                    rcv_transfer:data.rcv_transfer,
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    issue_m_ds: data.issue_m_ds,
                    issue_m_dp: data.issue_m_dp,
                    issue_k_dp: data.issue_k_dp,
                    issue_ds_1: data.issue_ds_1,
                    issue_ds_2: data.issue_ds_2,
                    issue_sp_2: data.issue_sp_2,
                    issue_yjh: data.issue_yjh,
                    issue_yk: data.issue_yk,
                    issue_kp: data.issue_kp,
                    issue_wp: data.issue_wp,
                    issue_rs: data.issue_rs,
                    issue_dp_2: data.issue_dp_2,
                    issue_dp_3: data.issue_dp_3,
                    issue_dp_4: data.issue_dp_4,
                    issue_dp_3l: data.issue_dp_3l,
                    issue_ss: data.issue_ss,
                    issue_os: data.issue_os,
                    issue_os1: data.issue_os1,
                    issue_add_1: data.issue_add_1,
                    issue_add_2: data.issue_add_2,
                    issue_add_3:data.issue_add_3,
                    issue_add_4: data.issue_add_4,
                    issue_add_5: data.issue_add_5,
                    issue_add_6: data.issue_add_6,
                    issue_add_7: data.issue_add_7,
                    issue_add_8: data.issue_add_8,
                    issue_add_9: data.issue_add_9,
                    issue_add_10: data.issue_add_10,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_mayur: data.issue_mayur, 
                    entry_backlog: (parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)
                    +(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)+(data.rcv_transfer? parseFloat(data.rcv_transfer):0)) 
                    - (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                    +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                    parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                    +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                    +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                    +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                    +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                    +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                    +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                        ),
                    current_backlog: (parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)
                    +(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)+(data.rcv_transfer? parseFloat(data.rcv_transfer):0)) 
                    - (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                    +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                    parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                    +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                    +parseFloat(data.issue_ss)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                    +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                    +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                    +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                    +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                
                  ),
                    Status: 1,
                    CreatedBy: feeledBy,
                    editStatus:'Pending'
                },
                {
                    transaction
                }
            );
            
            await lotoriginmodel.update(
                { 
                    editStatus:'Pending',
                 
                },
                {
                    where: {
                        lotNo:LotNO,
                        origin:data.origin
                    },transaction
                }
            );
            const lotupdate= await DPDS.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    const data = await WhatsappMsg("DPDS", feeledBy,"modify_request","Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of DPDS Entry Raised successfully" });
               
                }
                else{
                    console.log('No Need For Update')
                }

        }
       
       
       


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while Editing Mayur Entry" ,error});
        }
    }
    


}

export const approveDPDS = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await DPDSEdit.findOne({
            where: {
                id
            }
        }) as any;
        
        if (!data) {
            return res.status(400).json({ message: "DPDS Edit Entry not found" });
        }
        else{
            const transferMayurdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'DPDS',
                    toSection:'Mayur'
                }
            }) as any

            const transferBigTaihodata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'DPDS',
                    toSection:'BigTaiho'
                }
            }) as any

            if(transferMayurdata && transferBigTaihodata){
                await sequelize.transaction(async (transaction: any) => {

                    const bormaEdit = await DPDS.update({
                        date:data.date,
                     
                        noOfdayOperators:data.noOfdayOperators,
                        noOfnightOperators:data.noOfnightOperators,
                        
                        issue_m_ds: data.issue_m_ds,
                        issue_m_dp: data.issue_m_dp,
                        issue_k_dp: data.issue_k_dp,
                        issue_ds_1: data.issue_ds_1,
                        issue_ds_2: data.issue_ds_2,
                        issue_sp_2: data.issue_sp_2,
                        issue_yjh: data.issue_yjh,
                        issue_yk: data.issue_yk,
                        issue_kp: data.issue_kp,
                        issue_wp: data.issue_wp,
                        issue_rs: data.issue_rs,
                        issue_dp_2: data.issue_dp_2,
                        issue_dp_3: data.issue_dp_3,
                        issue_dp_4: data.issue_dp_4,
                        issue_dp_3l: data.issue_dp_3l,
                        issue_ss: data.issue_ss,
                        issue_os: data.issue_os,
                        issue_os1: data.issue_os1,
                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3:data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_mayur: data.issue_mayur, 
                      
                        entry_backlog:data.entry_backlog,
                       current_backlog:data.current_backlog,
                        CreatedBy: data.CreatedBy,
                        editStatus: "Approved",
                        modifiedBy:approvedBy,
            
            
            
                    }, {
                        where: {
                            id
                        }, transaction
                    });
                    if(bormaEdit){
                        console.log(transferMayurdata)
                        console.log(transferBigTaihodata)
                        if(parseFloat(transferMayurdata.amount)!==parseFloat(data.issue_mayur)){
                            console.log('Needs Update In Mayur')
                            const difference_mayur=parseFloat(data.issue_mayur)-parseFloat(transferMayurdata.amount)
                            console.log(difference_mayur)
                            const backlog = await Mayur.findOne({
                                attributes: ['current_backlog','rcv_DPDS'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await Mayur.update(
                                    {
                                        rcv_DPDS: sequelize.literal(`rcv_DPDS+ ${difference_mayur}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_mayur}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNo,
                                            origin: origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );

                                await sectionTransfer.update({
                                    date: data.Date,
                                    amount:data.issue_mayur,
                                    toSectionBeforeBacklog:transferMayurdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferMayurdata.toSectionBeforeBacklog)+parseFloat(data.issue_mayur)
                        
                                }, {
                                    where: {
                                        id:transferMayurdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Mayur Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferBigTaihodata.amount)!==parseFloat(data.issue_bigTaiho)){
                            console.log('Needs Update In bigTaiho')
                            const difference_bigT=parseFloat(data.issue_bigTaiho)-parseFloat(transferBigTaihodata.amount)
                            console.log(difference_bigT)
                            const backlog = await bigTaihoModel.findOne({
                                attributes: ['current_backlog','rcv_dpds'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await bigTaihoModel.update(
                                    {
                                        rcv_dpds: sequelize.literal(`rcv_dpds+ ${difference_bigT}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_bigT}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNo,
                                            origin: origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );

                                await sectionTransfer.update({
                                    date: data.Date,
                                    amount:data.issue_bigTaiho,
                                    toSectionBeforeBacklog:transferBigTaihodata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferBigTaihodata.toSectionBeforeBacklog)+parseFloat(data.issue_bigTaiho)
                        
                                }, {
                                    where: {
                                        id:transferBigTaihodata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated BigTaiho Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }
                        
                        await lotoriginmodel.update(
                            { 
                                editStatus:'NA',
                             
                            },
                            {
                                where: {
                                    lotNo:LotNo,
                                    origin:origin
                                },transaction
                            }
                        );
                        await DPDSEdit.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of DPDS Entry is Approved Successfully" });
                    }
                    
                })
            }
            else{
                return res.status(400).json({ message: "DPDS Transfer Entry is not found" });
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectDPDS = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await DPDS.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "DPDS Entry not found" });
        }
        await lotoriginmodel.update(
            { 
                editStatus:'NA',
             
            },
            {
                where: {
                    lotNo:LotNo,
                    origin:origin
                }
            }
        );
        const rcnEdit = await DPDSEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "DPDS Entry not found" });
        }
        return res.status(200).json({ message: "DPDS Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
// //RCNDPDSMix.tsx
export const SearchRCNDPDSMix = async (req: Request, res: Response) => {
    try {
        const { lotNo, origin} = req.body;
       
        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (lotNo) {
            whereClause.push({
                LotNo: lotNo
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
            latest: {
                [Op.eq]: 1
            }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        
             rcnEntries = await DPDS.findOne({
                attributes: ['id','rcv_transfer','current_backlog','rcv_dp','rcv_dp1','rcv_ds','rcv_Sorting','editStatus'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const CreateMixDPDS = async (req: Request, res: Response) => {

    try{
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid= req.body.fsourceid;
        const sourcelot= req.body.fsourcelot;
        const sourceorigin= req.body.fsourceorigin;
        const source_rcv_dp= req.body.fsourcercv_dp;
        const source_rcv_ds= req.body.fsourcercv_ds;
        const source_rcv_dp1= req.body.fsourcercv_dp1;
      
        const source_sorting= req.body.fsourcercv_sorting;
        const source_bigT= req.body.fsourcercv_bigT;
        const source_backlog= req.body.fsourcebacklog;

        const transfer_amount =req.body.amount

        const destid= req.body.destid;
        const destlot= req.body.destlot;
        const destorigin= req.body.destorigin;
        const dest_rcv_dp= req.body.destrcv_dp;
        const dest_rcv_ds= req.body.destrcv_ds;
        const dest_rcv_dp1= req.body.destrcv_dp1;
     
        const dest_sorting= req.body.destrcv_sorting;
        const dest_bigT= req.body.destrcv_bigT;
        const dest_backlog= req.body.destbacklog;

        const b_soucre_backlog= req.body.bsourcebacklog;
        const b_dest_backlog= req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourceupdate=await DPDS.update(
                { 
                    rcv_dp: source_rcv_dp,
                    rcv_ds: source_rcv_ds,
                    rcv_dp1: source_rcv_dp1,
                  
                    rcv_Sorting:source_sorting,
                    rcv_transfer:source_bigT,
                    current_backlog:source_backlog,                   
                },
                {
                    where: {
                        id:sourceid
                    }, transaction
                }
            );
            const destdata=await DPDS.findOne({
                attributes: ['mixingLot'],
                where: {
                    id:destid
        
                },
        
            });
            if (destdata && destdata.dataValues.mixingLot){
                const destupdate=await DPDS.update(
                    { 
                        rcv_dp: dest_rcv_dp,
                        rcv_ds: dest_rcv_ds,
                        rcv_dp1: dest_rcv_dp1,
                        
                        rcv_Sorting:dest_sorting,
                        rcv_transfer:dest_bigT,
                        current_backlog:dest_backlog, 
                        mixingLot:sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`)                  
                    },
                    {
                        where: {
                            id:destid
                        }, transaction
                    }
                );
                if(sourceupdate && destupdate){
                    const mixcreate=await mixingModel.create(
                        {     
                            FromLotNo:sourcelot,
                            Fromorigin:sourceorigin,
                            ToLotNo:destlot,
                            Toorigin:destorigin,
                            amount:transfer_amount,
                            date:new Date(),
                            Section:'DPDS',
                            amountBeforeBacklog:b_soucre_backlog,
                            amountAfterBacklog:source_backlog,
                            destamountBeforeBacklog: b_dest_backlog,
                            destamountAfterBacklog: dest_backlog,
                            createdBy: createdBy,
                        },
                        {
                            transaction
                        }
                    );
                    if(mixcreate){
                        return res.status(200).json({ message: "Mixing Performed Successfully" });

                    }
                    else{
                        return res.status(500).json({ message: "Internal Server Error"});
                    }
                }
                else{
                    return res.status(500).json({ message: "Internal Server Error"});
                }
            }
            else{
                const destupdate=await DPDS.update(
                    { 
                        rcv_dp: dest_rcv_dp,
                        rcv_ds: dest_rcv_ds,
                        rcv_dp1:dest_rcv_dp1,
                        rcv_Sorting:dest_sorting,
                  
                        current_backlog:dest_backlog, 
                        mixingLot:`${sourcelot}(${sourceorigin})`             
                    },
                    {
                        where: {
                            id:destid
                        }, transaction
                    }
                );
                if(sourceupdate && destupdate){
                    const mixcreate=await mixingModel.create(
                        {     
                            FromLotNo:sourcelot,
                            Fromorigin:sourceorigin,
                            ToLotNo:destlot,
                            Toorigin:destorigin,
                            amount:transfer_amount,
                            date:new Date(),
                            Section:'DPDS',
                            amountBeforeBacklog:b_soucre_backlog,
                            amountAfterBacklog:source_backlog,
                            destamountBeforeBacklog: b_dest_backlog,
                            destamountAfterBacklog: dest_backlog,
                            createdBy: createdBy,
                        },
                        {
                            transaction
                        }
                    );
                    if(mixcreate){
                        return res.status(200).json({ message: "Mixing Performed Successfully" });

                    }
                    else{
                        return res.status(500).json({ message: "Internal Server Error"});
                    }
                }
                else{
                    return res.status(500).json({ message: "Internal Server Error"});
                }
            }

           

        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}







