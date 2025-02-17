import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import mixingModel from "../../model/mixingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import hamsaEditModel from "../../model/hamsaeditModel";
import hamsaModel from "../../model/hamsamodel";
import SortingModel from "../../model/sortingModel";
import SortingEditModel from "../../model/sortingEditModel";
import DPDS from "../../model/dpdsmodel";
import Mayur from "../../model/mayurModel";


// //Sorting.tsx
export const findEditSortingAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await SortingEditModel.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditSortingAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error });
    }
}
export const sumOfallSorting = async (req: Request, res: Response) => {

    
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

        const data = await SortingModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_jjh')), 'issue_jjh'],
                [sequelize.fn('sum', sequelize.col('issue_jjh1')), 'issue_jjh1'],
                [sequelize.fn('sum', sequelize.col('issue_sjh')), 'issue_sjh'],
                [sequelize.fn('sum', sequelize.col('issue_jk')), 'issue_jk'],
                [sequelize.fn('sum', sequelize.col('issue_jk1')), 'issue_jk1'],
                [sequelize.fn('sum', sequelize.col('issue_k')), 'issue_k'],
                [sequelize.fn('sum', sequelize.col('issue_k1')), 'issue_k1'],
                [sequelize.fn('sum', sequelize.col('issue_lwp1')), 'issue_lwp1'],
                [sequelize.fn('sum', sequelize.col('issue_lwp')), 'issue_lwp'],
                [sequelize.fn('sum', sequelize.col('issue_s')), 'issue_s'],
                [sequelize.fn('sum', sequelize.col('issue_ss')), 'issue_ss'],
                [sequelize.fn('sum', sequelize.col('issue_yk')), 'issue_yk'],
                [sequelize.fn('sum', sequelize.col('issue_sp2')), 'issue_sp2'],
                [sequelize.fn('sum', sequelize.col('issue_kp')), 'issue_kp'],
                [sequelize.fn('sum', sequelize.col('issue_rejection')), 'issue_rejection'],
                [sequelize.fn('sum', sequelize.col('issue_village')), 'issue_village'],
                [sequelize.fn('sum', sequelize.col('issue_bigTaiho')), 'issue_bigTaiho'],
                [sequelize.fn('sum', sequelize.col('issue_mayur')), 'issue_mayur'],
                [sequelize.fn('sum', sequelize.col('issue_dpds')), 'issue_dpds'],
             
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
        const EditData = await SortingEditModel.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getSortingLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await SortingModel.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog','rcv_jjh','rcv_sjh','rcv_sjh1','rcv_jh1','rcv_jk_k','rcv_sp1'],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un Sorting Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Sorting Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //SortingInitial.tsx
export const getSortingBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await SortingModel.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un Sorting Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Sorting Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //SortingCreateForm.tsx
export const CreateEntireSorting= async (req: Request, res: Response) => {
   
    
    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {           
            if((parseFloat(data.rcv_sjhN)+parseFloat(data.rcv_sjh1N)+parseFloat(data.rcv_jjhN)+parseFloat(data.rcv_jh1N)
                +parseFloat(data.rcv_jk_kN)+parseFloat(data.rcv_sp1N) +(data.rcv_bigTaiho? parseFloat(data.rcv_bigTaiho):0))
            < (parseFloat(data.issue_jjh)
            +parseFloat(data.issue_jjh1)+parseFloat(data.issue_sjh)+parseFloat(data.issue_jk)+parseFloat(data.issue_jk1)
            +parseFloat(data.issue_k)+parseFloat(data.issue_k1)+parseFloat(data.issue_lwp1)+parseFloat(data.issue_lwp)
            +parseFloat(data.issue_s)+parseFloat(data.issue_ss)+parseFloat(data.issue_yk)+parseFloat(data.issue_sp2)
            +parseFloat(data.issue_kp)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)+parseFloat(data.issue_bigTaiho)
            +parseFloat(data.issue_mayur)+parseFloat(data.issue_dpds)+parseFloat(data.issue_add_10)
        ))
               
               {
                console.log(parseFloat(data.issue_jjh)
                +parseFloat(data.issue_jjh1)+parseFloat(data.issue_sjh)+parseFloat(data.issue_jk)+parseFloat(data.issue_jk1)
                +parseFloat(data.issue_k)+parseFloat(data.issue_k1)+parseFloat(data.issue_lwp1)+parseFloat(data.issue_lwp)
                +parseFloat(data.issue_s)+parseFloat(data.issue_ss)+parseFloat(data.issue_yk)+parseFloat(data.issue_sp2)
                +parseFloat(data.issue_kp)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)+parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_mayur)+parseFloat(data.issue_dpds)+parseFloat(data.issue_add_10))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            const SortingUpdate = await SortingModel.update(
                {
                    date: data.Date,              
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    
                    issue_sjh: data.issue_sjh,
                    issue_jjh: data.issue_jjh,
                    issue_jjh1: data.issue_jjh1,
                    issue_jk: data.issue_jk,
                    issue_jk1: data.issue_jk1,
                    issue_k: data.issue_k,
                    issue_k1: data.issue_k1,
                    issue_lwp1: data.issue_lwp1,
                    issue_lwp: data.issue_lwp,
                    issue_s: data.issue_s,
                    issue_ss: data.issue_ss,
                    issue_yk: data.issue_yk,
                    issue_sp2: data.issue_sp2,
                    issue_kp: data.issue_kp,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_mayur: data.issue_mayur,
                    issue_dpds: data.issue_dpds,
                    issue_add_1: data.issue_add_1,
                    issue_add_2: data.issue_add_2,
                    issue_add_3:data.issue_add_3,
                    issue_add_4: data.rcv_jjhN,
                    issue_add_5: data.rcv_sjhN,
                    issue_add_6: data.rcv_sjh1N,
                    issue_add_7: data.rcv_jh1N,
                    issue_add_8: data.rcv_jk_kN,
                    issue_add_9: data.rcv_sp1N,
                    issue_add_10: data.issue_add_10,        
                    entry_backlog: (parseFloat(data.rcv_sjhN)+parseFloat(data.rcv_sjh1N)+parseFloat(data.rcv_jjhN)+parseFloat(data.rcv_jh1N)
                    +parseFloat(data.rcv_jk_kN)+parseFloat(data.rcv_sp1N) +(data.rcv_bigTaiho? parseFloat(data.rcv_bigTaiho):0))
                    - (parseFloat(data.issue_jjh)
                    +parseFloat(data.issue_jjh1)+parseFloat(data.issue_sjh)+parseFloat(data.issue_jk)+parseFloat(data.issue_jk1)
                    +parseFloat(data.issue_k)+parseFloat(data.issue_k1)+parseFloat(data.issue_lwp1)+parseFloat(data.issue_lwp)
                    +parseFloat(data.issue_s)+parseFloat(data.issue_ss)+parseFloat(data.issue_yk)+parseFloat(data.issue_sp2)
                    +parseFloat(data.issue_kp)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)+parseFloat(data.issue_bigTaiho)
                    +parseFloat(data.issue_mayur)+parseFloat(data.issue_dpds)
                    +parseFloat(data.issue_add_10)
                        ),
                    current_backlog: (parseFloat(data.rcv_sjhN)+parseFloat(data.rcv_sjh1N)+parseFloat(data.rcv_jjhN)+parseFloat(data.rcv_jh1N)
                    +parseFloat(data.rcv_jk_kN)+parseFloat(data.rcv_sp1N) +(data.rcv_bigTaiho? parseFloat(data.rcv_bigTaiho):0))
                    - (parseFloat(data.issue_jjh)
                    +parseFloat(data.issue_jjh1)+parseFloat(data.issue_sjh)+parseFloat(data.issue_jk)+parseFloat(data.issue_jk1)
                    +parseFloat(data.issue_k)+parseFloat(data.issue_k1)+parseFloat(data.issue_lwp1)+parseFloat(data.issue_lwp)
                    +parseFloat(data.issue_s)+parseFloat(data.issue_ss)+parseFloat(data.issue_yk)+parseFloat(data.issue_sp2)
                    +parseFloat(data.issue_kp)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)+parseFloat(data.issue_bigTaiho)
                    +parseFloat(data.issue_mayur)+parseFloat(data.issue_dpds)
                    +parseFloat(data.issue_add_10)
                       
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
            if (SortingUpdate) {
                const bigT_backlog = await bigTaihoModel.findOne({
                    attributes: ['current_backlog','rcv_sorting'],
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
                        fromSection:'Sorting',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy
                     },{transaction});
                     if(bigT_backlog.dataValues.rcv_sorting){
                        await bigTaihoModel.update(
                            { 
                                rcv_sorting:sequelize.literal(`rcv_sorting+ ${data.issue_bigTaiho}`),
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
                                rcv_sorting:data.issue_bigTaiho,
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
                    res.status(500).json({ message: "Error In Creating BigTaiho Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                const dpds_backlog = await DPDS.findOne({
                    attributes: ['current_backlog','rcv_Sorting'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(dpds_backlog)
                if (dpds_backlog && dpds_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_dpds,
                        issueid:1,
                        date:data.Date,
                        fromSection:'Sorting',
                        toSection:'DPDS',
                        toSectionBeforeBacklog:dpds_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(dpds_backlog.dataValues.current_backlog)+parseFloat(data.issue_dpds),
                        createdBy: feeledBy
                     },{transaction});
                     if(dpds_backlog.dataValues.rcv_Sorting){
                        await DPDS.update(
                            { 
                                rcv_Sorting:sequelize.literal(`rcv_Sorting+ ${data.issue_dpds}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_dpds}`)
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
                        await DPDS.update(
                            { 
                                rcv_Sorting:data.issue_dpds,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_dpds}`)
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
                    res.status(500).json({ message: "Error In Creating DPDS Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                const mayur_backlog = await Mayur.findOne({
                    attributes: ['current_backlog','rcv_sorting'],
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
                        fromSection:'Sorting',
                        toSection:'Mayur',
                        toSectionBeforeBacklog:mayur_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(mayur_backlog.dataValues.current_backlog)+parseFloat(data.issue_mayur),
                        createdBy: feeledBy
                     },{transaction});
                     if(mayur_backlog.dataValues.rcv_sorting){
                        await Mayur.update(
                            { 
                                rcv_sorting:sequelize.literal(`rcv_sorting+ ${data.issue_mayur}`),
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
                                rcv_sorting:data.issue_mayur,
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
                    res.status(500).json({ message: "Error In Creating Mayur Transaction History" });
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
                        latest_section: 'Sorting',
                        sortingStatus: 1
                    },
                    {
                        where: {
                            lotNo: LotNO,
                            origin: data.origin
                        }, transaction
                    }
                );
                if (lotupdate) {
                    res.status(200).json({ message: "Sorting Entry Made Successfully" });
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
            return res.status(500).json({ message: "Error while creating Sorting Entry" ,error});
        }
    }
}

// //SortingTable.tsx
export const SearchRCNSorting = async (req: Request, res: Response) => {
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
             rcnEntries = await SortingModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await SortingModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Sorting Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}
// //SortingRecreate.tsx
export const CreateReissueSorting = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {
            //console.log(linehumid)
            for (let data of linehumid) {

                //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
                if (parseFloat(data.issue_add_1) < (parseFloat(data.issue_jjh)
                    +parseFloat(data.issue_jjh1)+parseFloat(data.issue_sjh)+parseFloat(data.issue_jk)+parseFloat(data.issue_jk1)
                    +parseFloat(data.issue_k)+parseFloat(data.issue_k1)+parseFloat(data.issue_lwp1)+parseFloat(data.issue_lwp)
                    +parseFloat(data.issue_s)+parseFloat(data.issue_ss)+parseFloat(data.issue_yk)+parseFloat(data.issue_sp2)
                    +parseFloat(data.issue_kp)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)+parseFloat(data.issue_bigTaiho)
                    +parseFloat(data.issue_mayur)+parseFloat(data.issue_dpds)+parseFloat(data.issue_add_10)
                )) {
                    console.log(parseFloat(data.issue_jjh)
                    +parseFloat(data.issue_jjh1)+parseFloat(data.issue_sjh)+parseFloat(data.issue_jk)+parseFloat(data.issue_jk1)
                    +parseFloat(data.issue_k)+parseFloat(data.issue_k1)+parseFloat(data.issue_lwp1)+parseFloat(data.issue_lwp)
                    +parseFloat(data.issue_s)+parseFloat(data.issue_ss)+parseFloat(data.issue_yk)+parseFloat(data.issue_sp2)
                    +parseFloat(data.issue_kp)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)+parseFloat(data.issue_bigTaiho)
                    +parseFloat(data.issue_mayur)+parseFloat(data.issue_dpds)+parseFloat(data.issue_add_10))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }

                const sortingupdate = await SortingModel.update(
                    {
                        latest: 0

                    }, {
                    where: {
                        id: data.id
                    }, transaction
                }


                );
                if (sortingupdate) {
                    const reissuecreate = await SortingModel.create(
                        {
                            date: data.Date,
                            altid: parseInt(data.alt_id) + 1,
                            LotNo: data.LotNo,
                            origin: data.origin,
                            mixingLot: data.mixingLot,
                            rcv_jjh: data.rcv_jjh,
                            rcv_sjh: data.rcv_sjh,
                            rcv_sjh1: data.rcv_sjh1,
                            rcv_jh1: data.rcv_jh1,
                            rcv_jk_k: data.rcv_jk_k,
                            rcv_sp1: data.rcv_sp1,
                            rcv_bigTaiho: data.rcv_bigTaiho,
                            noOfdayOperators: data.dayoperator,
                            noOfnightOperators: data.nightoperator,
                            rcv_transfer: data.rcv_transfer,
                            issue_sjh: data.issue_sjh,
                            issue_jjh: data.issue_jjh,
                            issue_jjh1: data.issue_jjh1,
                            issue_jk: data.issue_jk,
                            issue_jk1: data.issue_jk1,
                            issue_k: data.issue_k,
                            issue_k1: data.issue_k1,
                            issue_lwp1: data.issue_lwp1,
                            issue_lwp: data.issue_lwp,
                            issue_s: data.issue_s,
                            issue_ss: data.issue_ss,
                            issue_yk: data.issue_yk,
                            issue_sp2: data.issue_sp2,
                            issue_kp: data.issue_kp,
                            issue_rejection: data.issue_rejection,
                            issue_village: data.issue_village,
                            issue_bigTaiho: data.issue_bigTaiho,
                            issue_mayur: data.issue_mayur,
                            issue_dpds: data.issue_dpds,
                            issue_add_1: data.issue_add_1,
                            issue_add_2: data.issue_add_2,
                            issue_add_3: data.issue_add_3,
                            issue_add_4: data.issue_add_4,
                            issue_add_5: data.issue_add_5,
                            issue_add_6: data.issue_add_6,
                            issue_add_7: data.issue_add_7,
                            issue_add_8: data.issue_add_8,
                            issue_add_9: data.issue_add_9,
                            issue_add_10: data.issue_add_10,
                            entry_backlog: parseFloat(data.issue_add_1)
                                - (parseFloat(data.issue_jjh)
                                    + parseFloat(data.issue_jjh1) + parseFloat(data.issue_sjh) + parseFloat(data.issue_jk) + parseFloat(data.issue_jk1)
                                    + parseFloat(data.issue_k) + parseFloat(data.issue_k1) + parseFloat(data.issue_lwp1) + parseFloat(data.issue_lwp)
                                    + parseFloat(data.issue_s) + parseFloat(data.issue_ss) + parseFloat(data.issue_yk) + parseFloat(data.issue_sp2)
                                    + parseFloat(data.issue_kp) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village) + parseFloat(data.issue_bigTaiho)
                                    + parseFloat(data.issue_mayur) + parseFloat(data.issue_dpds)
                                    + parseFloat(data.issue_add_10)
                                ),
                            current_backlog: parseFloat(data.issue_add_1) -
                                 (parseFloat(data.issue_jjh)
                                    + parseFloat(data.issue_jjh1) + parseFloat(data.issue_sjh) + parseFloat(data.issue_jk) + parseFloat(data.issue_jk1)
                                    + parseFloat(data.issue_k) + parseFloat(data.issue_k1) + parseFloat(data.issue_lwp1) + parseFloat(data.issue_lwp)
                                    + parseFloat(data.issue_s) + parseFloat(data.issue_ss) + parseFloat(data.issue_yk) + parseFloat(data.issue_sp2)
                                    + parseFloat(data.issue_kp) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village) + parseFloat(data.issue_bigTaiho)
                                    + parseFloat(data.issue_mayur) + parseFloat(data.issue_dpds)
                                    + parseFloat(data.issue_add_10)),


                            Status: 1,
                            CreatedBy: feeledBy
                        },
                        {
                            transaction
                        }
                    );
                    if (reissuecreate) {
                        const mayur_backlog = await Mayur.findOne({
                            attributes: ['current_backlog', 'rcv_sorting'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(mayur_backlog)
                        if (mayur_backlog && mayur_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_mayur,
                                date: data.Date,
                                fromSection: 'Sorting',
                                toSection: 'Mayur',
                                toSectionBeforeBacklog: mayur_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(mayur_backlog.dataValues.current_backlog) + parseFloat(data.issue_mayur),
                                createdBy: feeledBy,
                                issueid: parseInt(data.alt_id) + 1,
                            }, { transaction });
                            if (mayur_backlog.dataValues.rcv_sorting) {
                                await Mayur.update(
                                    {
                                        rcv_sorting: sequelize.literal(`rcv_sorting+ ${data.issue_mayur}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }
                            else {
                                await Mayur.update(
                                    {
                                        rcv_sorting: data.issue_mayur,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }
                        }
                        else {
                            res.status(500).json({ message: "Error In Creating Reissue Mayur Transaction History" });
                            throw new Error('Transaction Aborted')
                        }

                        const bigT_backlog = await bigTaihoModel.findOne({
                            attributes: ['current_backlog', 'rcv_sorting'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(bigT_backlog)
                        if (bigT_backlog && bigT_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_bigTaiho,
                                date: data.Date,
                                fromSection: 'Sorting',
                                toSection: 'BigTaiho',
                                toSectionBeforeBacklog: bigT_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(bigT_backlog.dataValues.current_backlog) + parseFloat(data.issue_bigTaiho),
                                createdBy: feeledBy,
                                issueid: parseInt(data.alt_id) + 1,
                            }, { transaction });
                            if (bigT_backlog.dataValues.rcv_sorting) {
                                await bigTaihoModel.update(
                                    {
                                        rcv_sorting: sequelize.literal(`rcv_sorting+ ${data.issue_bigTaiho}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }
                            else {
                                await bigTaihoModel.update(
                                    {
                                        rcv_sorting: data.issue_bigTaiho,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }


                        }
                        else {
                            res.status(500).json({ message: "Error In Creating Reissue BigTaiho Transaction History" });
                            throw new Error('Transaction Aborted')
                        }


                        const dpds_backlog = await DPDS.findOne({
                            attributes: ['current_backlog','rcv_Sorting'],
                            where: {
                                lotNo:LotNO,
                                origin: data.origin,
                                latest:1
                    
                            },
                            order: [['LotNo', 'ASC']]
                    
                        });
                        console.log(dpds_backlog)
                        if (dpds_backlog && dpds_backlog.dataValues.current_backlog>=0){
                            await sectionTransfer.create({              
                                LotNo:LotNO,
                                origin:data.origin,
                                amount:data.issue_dpds,
                                issueid: parseInt(data.alt_id) + 1,
                                date:data.Date,
                                fromSection:'Sorting',
                                toSection:'DPDS',
                                toSectionBeforeBacklog:dpds_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog:parseFloat(dpds_backlog.dataValues.current_backlog)+parseFloat(data.issue_dpds),
                                createdBy: feeledBy
                             },{transaction});
                             if(dpds_backlog.dataValues.rcv_Sorting){
                                await DPDS.update(
                                    { 
                                        rcv_Sorting:sequelize.literal(`rcv_Sorting+ ${data.issue_dpds}`),
                                        current_backlog:sequelize.literal(`current_backlog+ ${data.issue_dpds}`)
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
                                await DPDS.update(
                                    { 
                                        rcv_Sorting:data.issue_dpds,
                                        current_backlog:sequelize.literal(`current_backlog+ ${data.issue_dpds}`)
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
                            res.status(500).json({ message: "Error In Creating DPDS Transaction History" });
                            throw new Error('Transaction Aborted')
                        } 
        

                        const lotupdate = await lotoriginmodel.update(
                            {
                                latest_section: 'Sorting',
                                sortingStatus: 1
                            },
                            {
                                where: {
                                    lotNo: LotNO,
                                    origin: data.origin
                                }, transaction
                            }
                        );
                        if (lotupdate) {
                            res.status(200).json({ message: "Sorting Re-Issue Entry Made Successfully" });
                        }
                        else {
                            console.log('No Need For Update')
                        }
                    }
                    else {
                        return res.status(500).json({ message: "Error while creating Sorting Re Issue Entry" });
                    }
                }


            }




        })
    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating Sorting Re-Issue Entry", error });
        }
    }



}

export const updateEntireHamsa= async (req: Request, res: Response) => {
    const timeToMilliseconds = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    };
    // Helper function to convert milliseconds to "HH:MM"
    const millisecondsToTime = (milliseconds: number) => {
        const totalMinutes = Math.floor(milliseconds / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const CalculatemachineOnOffTime = (time1: string, time2: string) => {
        const time1InMilliseconds = timeToMilliseconds(time1) - timeToMilliseconds(time2);
        if (time1InMilliseconds < 0) {
            return timeToMilliseconds(time1) - timeToMilliseconds(time2) + 24 * 60 * 60 * 1000;
        }
        return time1InMilliseconds;
    }


    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
         
         
            if (data.otherTime_1 === undefined || data.otherTime_1 === null) {
                data.otherTime_1 = '00:00'
            }
            if (data.Mc_breakdown_1 === undefined || data.Mc_breakdown_1 === null) {
                data.Mc_breakdown_1 = '00:00'
            }
            if (data.otherTime_2 === undefined || data.otherTime_2 === null) {
                data.otherTime_2 = '00:00'
            }
            if (data.Mc_breakdown_2 === undefined || data.Mc_breakdown_2 === null) {
                data.Mc_breakdown_2 = '00:00'
            }
            if (data.otherTime_3 === undefined || data.otherTime_3 === null) {
                data.otherTime_3 = '00:00'
            }
            if (data.Mc_breakdown_3 === undefined || data.Mc_breakdown_3 === null) {
                data.Mc_breakdown_3 = '00:00'
            }

            if (data.Mc_breakdown_4 === undefined || data.Mc_breakdown_4 === null) {
                data.Mc_breakdown_4 = '00:00'
            }

            if (data.otherTime_4 === undefined || data.otherTime_4 === null) {
                data.otherTime_4 = '00:00'
            }
            if (data.otherTime_5 === undefined || data.otherTime_5 === null) {
                data.otherTime_5 = '00:00'
            }
            if (data.Mc_breakdown_5 === undefined || data.Mc_breakdown_5 === null) {
                data.Mc_breakdown_5 = '00:00'
            }
            if (data.otherTime_6 === undefined || data.otherTime_6 === null) {
                data.otherTime_6 = '00:00'
            }
            if (data.Mc_breakdown_6 === undefined || data.Mc_breakdown_6 === null) {
                data.Mc_breakdown_6 = '00:00'
            }
            
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_1, data.Mc_on_1) -
                (timeToMilliseconds(data.Mc_breakdown_1) + timeToMilliseconds(data.otherTime_1))
            const runtime2 = CalculatemachineOnOffTime(data.Mc_off_2, data.Mc_on_2) -
                (timeToMilliseconds(data.Mc_breakdown_2) + timeToMilliseconds(data.otherTime_2))
            const runtime3 = CalculatemachineOnOffTime(data.Mc_off_3, data.Mc_on_3) -
                (timeToMilliseconds(data.Mc_breakdown_3) + timeToMilliseconds(data.otherTime_3))
            const runtime4= CalculatemachineOnOffTime(data.Mc_off_4, data.Mc_on_4) -
                (timeToMilliseconds(data.Mc_breakdown_4) + timeToMilliseconds(data.otherTime_4))   
            const runtime5 = CalculatemachineOnOffTime(data.Mc_off_5, data.Mc_on_5) -
                (timeToMilliseconds(data.Mc_breakdown_5) + timeToMilliseconds(data.otherTime_5))
            const runtime6 = CalculatemachineOnOffTime(data.Mc_off_6, data.Mc_on_6) -
                (timeToMilliseconds(data.Mc_breakdown_6) + timeToMilliseconds(data.otherTime_6))    
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine Hamsa-1 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine Hamsa-2 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine Hamsa-3 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime4 < 0) {
                res.status(500).json({ message: "Machine Hamsa-4 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime5 < 0) {
                res.status(500).json({ message: "Machine Hamsa-5 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime6 < 0) {
                res.status(500).json({ message: "Machine Spectrum Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
          
            
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);
            const Mc_runTime4 = millisecondsToTime(runtime4);
            const Mc_runTime5 = millisecondsToTime(runtime5);
            const Mc_runTime6 = millisecondsToTime(runtime6);
         
            
            if((parseFloat(data.rcv_pw_w)+parseFloat(data.rcv_w_lot)+parseFloat(data.rcv_ww)
                +(data.rcv_village? parseFloat(data.rcv_village):0)
                +(data.rcv_lw? parseFloat(data.rcv_lw):0)+(data.rcv_lw? parseFloat(data.rcv_lw):0)
               
           )< (parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
           +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
              +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_jb)

         
               ))
               {
                console.log(parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                   +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                     +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                     +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                     +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                     +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                     +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                     +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                     +parseFloat(data.issue_jb))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            
            await hamsaEditModel.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                    altid:data.alt_id,
                    mixingLot:data.mixingLot,
                    rcv_village: data.rcv_village,
                    rcv_lw: data.rcv_lw,
                    rcv_pw_w: data.rcv_pw_w,
                    rcv_w_lot: data.rcv_w_lot,
                    rcv_ww: data.rcv_ww,           
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    Mc_on_1: data.Mc_on_1,
                    Mc_off_1: data.Mc_off_1,
                    Mc_runTime_1: Mc_runTime1,
                    Mc_breakdown_1: data.Mc_breakdown_1,
                    otherTime_1: data.otherTime_1,
                    Mc_on_2: data.Mc_on_2,
                    Mc_off_2: data.Mc_off_2,
                    Mc_runTime_2: Mc_runTime2,
                    Mc_breakdown_2: data.Mc_breakdown_2,
                    otherTime_2: data.otherTime_2,
                    Mc_on_3: data.Mc_on_3,
                    Mc_off_3: data.Mc_off_3,
                    Mc_runTime_3: Mc_runTime3,
                    Mc_breakdown_3: data.Mc_breakdown_3,
                    otherTime_3: data.otherTime_3,
                    Mc_on_4: data.Mc_on_4,
                    Mc_off_4: data.Mc_off_4,
                    Mc_runTime_4: Mc_runTime4,
                    Mc_breakdown_4: data.Mc_breakdown_4,
                    otherTime_4: data.otherTime_4,
                    Mc_on_5: data.Mc_on_5,
                    Mc_off_5: data.Mc_off_5,
                    Mc_runTime_5: Mc_runTime5,
                    Mc_breakdown_5: data.Mc_breakdown_5,
                    otherTime_5: data.otherTime_5,
                    Mc_on_6: data.Mc_on_6,
                    Mc_off_6: data.Mc_off_6,
                    Mc_runTime_6: Mc_runTime6,
                    Mc_breakdown_6: data.Mc_breakdown_6,
                    otherTime_6: data.otherTime_6,
                    issue_pw_210: data.issue_pw_210,
                    issue_w_210: data.issue_w_210,
                    issue_ww_210: data.issue_ww_210,
                    issue_pw_240:data.issue_pw_240,
                    issue_w_240: data.issue_w_240,
                    issue_ww_240: data.issue_ww_240,
                    issue_pw_280:data.issue_pw_280,
                    issue_w_280:   data.issue_w_280,
                    issue_ww_280: data.issue_ww_280,
                    issue_pw_320:data.issue_pw_320,
                    issue_w_320: data.issue_w_320,
                    issue_ww_320: data.issue_ww_320,
                    issue_pw_400: data.issue_pw_400,
                    issue_w_400:  data.issue_w_400,
                    issue_ww_400:  data.issue_ww_400,       
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
                    issue_lw: data.issue_lw,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_jb: data.issue_jb,
                   

                    
                    entry_backlog: (parseFloat(data.rcv_pw_w)+parseFloat(data.rcv_w_lot)+parseFloat(data.rcv_ww)
                    +(data.rcv_village? parseFloat(data.rcv_village):0)
                    +(data.rcv_lw? parseFloat(data.rcv_lw):0)+(data.rcv_lw? parseFloat(data.rcv_lw):0))
                    - (parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                    +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                       +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                         +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                         +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                         +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                         +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                         +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                         +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                         +parseFloat(data.issue_jb)
                        ),
                    current_backlog: (parseFloat(data.rcv_pw_w)+parseFloat(data.rcv_w_lot)+parseFloat(data.rcv_ww)
                    +(data.rcv_village? parseFloat(data.rcv_village):0)
                    +(data.rcv_lw? parseFloat(data.rcv_lw):0)+(data.rcv_lw? parseFloat(data.rcv_lw):0))
                    - (parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                    +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                       +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                         +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                         +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                         +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                         +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                         +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                         +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                         +parseFloat(data.issue_jb)
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
            const lotupdate= await hamsaModel.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    const data = await WhatsappMsg("Hamsa", feeledBy,"modify_request","Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of Hamsa Entry Raised successfully" });
               
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
            return res.status(500).json({ message: "Error while Editing Hamsa Entry" ,error});
        }
    }
    


}

export const approveHamsa = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await hamsaEditModel.findOne({
            where: {
                id
            }
        }) as any;
        
        if (!data) {
            return res.status(400).json({ message: "Hamsa Edit Entry not found" });
        }
        else{
            const transferBigTdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Hamsa',
                    toSection:'BigTaiho'
                }
            }) as any

            if(transferBigTdata){
                await sequelize.transaction(async (transaction: any) => {

                    const BigTEdit = await hamsaModel.update({
                        date: data.Date,              
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                        Mc_on_1: data.Mc_on_1,
                        Mc_off_1: data.Mc_off_1,
                        Mc_runTime_1: data.Mc_runTime1,
                        Mc_breakdown_1: data.Mc_breakdown_1,
                        otherTime_1: data.otherTime_1,
                        Mc_on_2: data.Mc_on_2,
                        Mc_off_2: data.Mc_off_2,
                        Mc_runTime_2: data.Mc_runTime2,
                        Mc_breakdown_2: data.Mc_breakdown_2,
                        otherTime_2: data.otherTime_2,
                        Mc_on_3: data.Mc_on_3,
                        Mc_off_3: data.Mc_off_3,
                        Mc_runTime_3: data.Mc_runTime3,
                        Mc_breakdown_3: data.Mc_breakdown_3,
                        otherTime_3: data.otherTime_3,
                        Mc_on_4: data.Mc_on_4,
                        Mc_off_4: data.Mc_off_4,
                        Mc_runTime_4: data.Mc_runTime4,
                        Mc_breakdown_4: data.Mc_breakdown_4,
                        otherTime_4: data.otherTime_4,
                        Mc_on_5: data.Mc_on_5,
                        Mc_off_5: data.Mc_off_5,
                        Mc_runTime_5: data.Mc_runTime5,
                        Mc_breakdown_5: data.Mc_breakdown_5,
                        otherTime_5: data.otherTime_5,
                        Mc_on_6: data.Mc_on_6,
                        Mc_off_6: data.Mc_off_6,
                        Mc_runTime_6: data.Mc_runTime6,
                        Mc_breakdown_6: data.Mc_breakdown_6,
                        otherTime_6: data.otherTime_6,
    
                        issue_pw_210: data.issue_pw_210,
                        issue_w_210: data.issue_w_210,
                        issue_ww_210: data.issue_ww_210,
                        issue_pw_240:data.issue_pw_240,
                        issue_w_240: data.issue_w_240,
                        issue_ww_240: data.issue_ww_240,
                        issue_pw_280:data.issue_pw_280,
                        issue_w_280:   data.issue_w_280,
                        issue_ww_280: data.issue_ww_280,
                        issue_pw_320:data.issue_pw_320,
                        issue_w_320: data.issue_w_320,
                        issue_ww_320: data.issue_ww_320,
                        issue_pw_400: data.issue_pw_400,
                        issue_w_400:  data.issue_w_400,
                        issue_ww_400:  data.issue_ww_400,
                       
                        
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
                      
                       
                        issue_lw: data.issue_lw,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_jb: data.issue_jb,
                        
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
                    if(BigTEdit){
                        console.log(transferBigTdata)
                    
                        if(parseFloat(transferBigTdata.amount)!==parseFloat(data.issue_bigTaiho)){
                            console.log('Needs Update In BigTaiho')
                            const difference_bigT=parseFloat(data.issue_bigTaiho)-parseFloat(transferBigTdata.amount)
                            console.log(difference_bigT)
                            const backlog = await bigTaihoModel.findOne({
                                attributes: ['current_backlog','rcv_hamsa'],
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
                                        rcv_hamsa: sequelize.literal(`rcv_hamsa+ ${difference_bigT}`),
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
                                    toSectionBeforeBacklog:transferBigTdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferBigTdata.toSectionBeforeBacklog)+parseFloat(data.issue_bigTaiho)
                        
                                }, {
                                    where: {
                                        id:transferBigTdata.id
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
                        await hamsaEditModel.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of Hamsa Entry is Approved Successfully" });
                    }
                    
                })
            }
            else{
                return res.status(400).json({ message: "Hamsa Transfer Entry is not found" });
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectHamsa = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await hamsaModel.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Hamsa Entry not found" });
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
        const rcnEdit = await hamsaEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Hamsa Entry not found" });
        }
        return res.status(200).json({ message: "Hamsa Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
// //SortingMix.tsx
export const SearchRCNSortingMix = async (req: Request, res: Response) => {
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
        
             rcnEntries = await SortingModel.findOne({
                attributes: ['id','rcv_sjh','current_backlog','rcv_sjh1','rcv_jjh','rcv_jk_k','rcv_sp1',
                    'rcv_bigTaiho','rcv_jh1','editStatus','Status','issue_add_4','issue_add_5','issue_add_6',
                'issue_add_7','issue_add_8','issue_add_9'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const CreateMixSorting = async (req: Request, res: Response) => {

    try{
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid= req.body.fsourceid;
        const sourcelot= req.body.fsourcelot;
        const sourceorigin= req.body.fsourceorigin;
        const source_rcv_sjh =req.body.fsourcercv_sjh;
        const source_rcv_sjh1= req.body.fsourcercv_sjh1;
        const source_rcv_jjh= req.body.fsourcercv_jjh;
        const source_rcv_sp1= req.body.fsourcercv_sp1;
        const source_rcv_jk_k= req.body.fsourcercv_jkk;
        const source_rcv_jh1= req.body.fsourcercv_jh1;
        const source_rcv_bigTaiho= req.body.fsourcercv_bigt;
    
        const source_backlog= req.body.fsourcebacklog;

        const transfer_amount =req.body.amount

        const destid= req.body.destid;
        const destlot= req.body.destlot;
        const destorigin= req.body.destorigin;
        const dest_rcv_sjh= req.body.destrcv_sjh;
        const dest_rcv_sjh1= req.body.destrcv_sjh1;
        const dest_rcv_jjh= req.body.destrcv_jjh;
        const dest_rcv_jk_k= req.body.destrcv_jkk;
        const dest_rcv_jh1= req.body.destrcv_jh1;
        const dest_rcv_sp1= req.body.destrcv_sp1;
        const dest_rcv_bigTaiho= req.body.destrcv_bigt;
        const destrcv_status = req.body.destrcv_status;

        const dest_backlog= req.body.destbacklog;

        const b_soucre_backlog= req.body.bsourcebacklog;
        const b_dest_backlog= req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourcedata = await SortingModel.findOne({
                attributes: ['rcv_sjh','rcv_sjh1','rcv_jjh','rcv_jk_k','rcv_sp1','rcv_jh1',
                'rcv_bigTaiho','issue_add_4','issue_add_5','issue_add_6',
                'issue_add_7','issue_add_8','issue_add_9'],
                where: {
                    id: sourceid

                },

            });

            let sourceupdate

            if(sourcedata){

                const jjhdiff=parseFloat(sourcedata.dataValues.issue_add_4)-parseFloat(source_rcv_jjh)
                const sjhdiff=parseFloat(sourcedata.dataValues.issue_add_5)-parseFloat(source_rcv_sjh)
                const sjh1diff=parseFloat(sourcedata.dataValues.issue_add_6)-parseFloat(source_rcv_sjh1)
                const jh1diff=parseFloat(sourcedata.dataValues.issue_add_7)-parseFloat(source_rcv_jh1)
                const jkkdiff=parseFloat(sourcedata.dataValues.issue_add_8)-parseFloat(source_rcv_jk_k)
                const sp1diff=parseFloat(sourcedata.dataValues.issue_add_9)-parseFloat(source_rcv_sp1)

                const totbeforeborma=(parseFloat(sourcedata.dataValues.rcv_jjh)-jjhdiff)+(parseFloat(sourcedata.dataValues.rcv_sjh)-sjhdiff)
                +(parseFloat(sourcedata.dataValues.rcv_sjh1)-sjh1diff)+(parseFloat(sourcedata.dataValues.rcv_jh1)-jh1diff)
                +(parseFloat(sourcedata.dataValues.rcv_jk_k)-jkkdiff)+(parseFloat(sourcedata.dataValues.rcv_sp1)-sp1diff)

                console.log(totbeforeborma)
                const totafterborma=parseFloat(source_rcv_jjh)+parseFloat(source_rcv_sjh)+parseFloat(source_rcv_sjh1)+
                parseFloat(source_rcv_jh1)+parseFloat(source_rcv_jk_k)+parseFloat(source_rcv_sp1)
                console.log(totafterborma)
                sourceupdate=await SortingModel.update(
                    { 
                        rcv_jjh: sequelize.literal(`rcv_jjh- ${jjhdiff}`),
                        rcv_sjh: sequelize.literal(`rcv_sjh- ${sjhdiff}`),
                        rcv_sjh1: sequelize.literal(`rcv_sjh1- ${sjh1diff}`),
                        rcv_jh1: sequelize.literal(`rcv_jh1- ${jh1diff}`),
                        rcv_jk_k: sequelize.literal(`rcv_jk_k- ${jkkdiff}`),
                        rcv_sp1: sequelize.literal(`rcv_sp1- ${sp1diff}`),
                        issue_add_3: ((totbeforeborma-totafterborma)/totbeforeborma)*100,
                        issue_add_5: source_rcv_sjh,
                        issue_add_6: source_rcv_sjh1,
                        issue_add_4: source_rcv_jjh,
                        issue_add_9: source_rcv_sp1,
                        issue_add_7: source_rcv_jh1,
                        issue_add_8: source_rcv_jk_k,
                        rcv_bigTaiho: source_rcv_bigTaiho,
                        current_backlog:source_backlog,                   
                    },
                    {
                        where: {
                            id:sourceid
                        }, transaction
                    }
                );
            }

            
            const destdata=await SortingModel.findOne({
                attributes: ['mixingLot','rcv_sjh','rcv_sjh1','rcv_jjh','rcv_jk_k','rcv_sp1',
                    'rcv_bigTaiho','rcv_jh1','issue_add_4','issue_add_5','issue_add_6',
                'issue_add_7','issue_add_8','issue_add_9'],
                where: {
                    id:destid
        
                },
        
            });
            if (destdata){
                let destupdate
                if (Number(destrcv_status) === 0) {
                    destupdate=await SortingModel.update(
                        { 
                            rcv_sjh: dest_rcv_sjh,
                            rcv_sjh1: dest_rcv_sjh1,
                            rcv_jjh: dest_rcv_jjh,
                            rcv_jh1: dest_rcv_jh1,
                            rcv_sp1: dest_rcv_sp1,
                            rcv_jk_k: dest_rcv_jk_k,
                            rcv_bigTaiho: dest_rcv_bigTaiho,
                            current_backlog:dest_backlog, 
                            mixingLot:destdata.dataValues.mixingLot ?
                            sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`):`${sourcelot}(${sourceorigin})`,                
                        },
                        {
                            where: {
                                id:destid
                            }, transaction
                        }
                    );
                }
                else{
                    const jjhdiffD=parseFloat(dest_rcv_jjh)-parseFloat(destdata.dataValues.issue_add_4)
                    const sjhdiffD=parseFloat(dest_rcv_sjh)-parseFloat(destdata.dataValues.issue_add_5)
                    const sjh1diffD=parseFloat(dest_rcv_sjh1)-parseFloat(destdata.dataValues.issue_add_6)
                    const jh1diffD=parseFloat(dest_rcv_jh1)-parseFloat(destdata.dataValues.issue_add_7)
                    const jkkdiffD=parseFloat(dest_rcv_jk_k)-parseFloat(destdata.dataValues.issue_add_8)
                    const sp1diffD=parseFloat(dest_rcv_sp1)-parseFloat(destdata.dataValues.issue_add_9)

                    const totbeforebormaD=(parseFloat(destdata.dataValues.rcv_jjh)+jjhdiffD)
                    +(parseFloat(destdata.dataValues.rcv_sjh)+sjhdiffD)+(parseFloat(destdata.dataValues.rcv_sjh1)+  sjh1diffD)+
                    (parseFloat(destdata.dataValues.rcv_jh1)+jh1diffD)
                    +(parseFloat(destdata.dataValues.rcv_jk_k)+jkkdiffD)+(parseFloat(destdata.dataValues.rcv_sp1)+  sp1diffD)

                    console.log(totbeforebormaD)
                    const totafterbormaD=parseFloat(dest_rcv_jjh)+parseFloat(dest_rcv_sjh)+parseFloat(dest_rcv_sjh1)+
                    parseFloat(dest_rcv_jh1)+parseFloat(dest_rcv_jk_k)+parseFloat(dest_rcv_sp1)
                    console.log(totafterbormaD)
                    destupdate=await SortingModel.update(
                        { 
                            rcv_jjh: sequelize.literal(`rcv_jjh+ ${jjhdiffD}`),
                            rcv_sjh: sequelize.literal(`rcv_sjh+ ${sjhdiffD}`),
                            rcv_sjh1: sequelize.literal(`rcv_sjh1+ ${sjh1diffD}`),
                            rcv_jh1: sequelize.literal(`rcv_jh1+ ${jh1diffD}`),
                            rcv_jk_k: sequelize.literal(`rcv_jk_k+ ${jkkdiffD}`),
                            rcv_sp1: sequelize.literal(`rcv_sp1+ ${sp1diffD}`),
                            issue_add_3: ((totbeforebormaD - totafterbormaD) / totbeforebormaD) * 100,
                            issue_add_5: dest_rcv_sjh,
                            issue_add_6: dest_rcv_sjh1,
                            issue_add_4: dest_rcv_jjh,
                            issue_add_9: dest_rcv_jh1,
                            issue_add_7: dest_rcv_sp1,
                            issue_add_8: dest_rcv_jk_k,
                            rcv_bigTaiho: dest_rcv_bigTaiho,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                                sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`) : `${sourcelot}(${sourceorigin})`,                
                        },
                        {
                            where: {
                                id:destid
                            }, transaction
                        }
                    );
                }
                if(sourceupdate && destupdate){
                    const mixcreate=await mixingModel.create(
                        {     
                            FromLotNo:sourcelot,
                            Fromorigin:sourceorigin,
                            ToLotNo:destlot,
                            Toorigin:destorigin,
                            amount:transfer_amount,
                            date:new Date(),
                            Section:'Sorting',
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







