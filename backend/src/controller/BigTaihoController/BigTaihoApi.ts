import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
//import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import DPDS from "../../model/dpdsmodel";
import sectionTransfer from "../../model/transactionsectionmodel";
import mixingModel from "../../model/mixingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import bigTaihoEditModel from "../../model/bigTaihoEditModel";
import SortingModel from "../../model/sortingModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";
import VLotNo from "../../model/vlotNomodel";
import dummyLotGradeAdjust from "../../model/dummyLotGradeAdjust";
const DUMMY_LOT = process.env.DUMMY_LOT ?process.env.DUMMY_LOT:'2025-999'; // '2025-999'

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
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_1')), 'issue_ext_grade_1'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_2')), 'issue_ext_grade_2'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_3')), 'issue_ext_grade_3'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_4')), 'issue_ext_grade_4'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_5')), 'issue_ext_grade_5'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_6')), 'issue_ext_grade_6'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_7')), 'issue_ext_grade_7'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_8')), 'issue_ext_grade_8'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_9')), 'issue_ext_grade_9'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_10')), 'issue_ext_grade_10'],
             
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

        const Sumdata = await bigTaihoModel.findAll({
                    attributes: [
               
                        [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
                      
                       
                    ],
                    where: {
                        [Op.or]: [
                            { editStatus: "Approved" },
                            { editStatus: "NA" }
                        ],latest:1
                    }
                });
        const EditData = await bigTaihoEditModel.count()

        const PendingData = await bigTaihoModel.count({where: { [Op.or]: [
                            { editStatus: "Approved" },
                            { editStatus: "NA" }
                        ],latest: 1,current_backlog: {
                            [Op.gt]: 0
                        }}} )
        if (data && Sumdata) {
            return res.status(200).json({ data, EditData,Sumdata,PendingData });
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
            
            attributes: ['LotNo', 'origin','current_backlog','rcv_sorting','rcv_dpds','rcv_mayur','rcv_hamsa','rcv_lw','rcv_wholes','rcv_peeling'],
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

// //BigTaihoCreateForm.tsx
export const CreateEntireBigTaiho= async (req: Request, res: Response) => {
   
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
    const vilLot:boolean=Boolean(req.body.vilLot)

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
            
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_1, data.Mc_on_1) -
                (timeToMilliseconds(data.Mc_breakdown_1) + timeToMilliseconds(data.otherTime_1))
            const runtime2 = CalculatemachineOnOffTime(data.Mc_off_2, data.Mc_on_2) -
                (timeToMilliseconds(data.Mc_breakdown_2) + timeToMilliseconds(data.otherTime_2))
            const runtime3 = CalculatemachineOnOffTime(data.Mc_off_3, data.Mc_on_3) -
                (timeToMilliseconds(data.Mc_breakdown_3) + timeToMilliseconds(data.otherTime_3))
             
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine BigTaiho Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine Spectrum Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine Amrita Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
          
            
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);
         
            
            if ((Number((
                parseFloat(data.rcv_peelingN) +
                (data.rcv_village ? parseFloat(data.rcv_village) : 0) +
                (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0) +
                (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) +
                (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0) +
                (data.rcv_mayur ? parseFloat(data.rcv_mayur) : 0) +
                (data.rcv_hamsa ? parseFloat(data.rcv_hamsa) : 0) +
                (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0)
            ).toFixed(2))) < (Number((
                parseFloat(data.issue_ssp) +
                parseFloat(data.issue_ssp_small) +
                parseFloat(data.issue_swp_1) +
                parseFloat(data.issue_wsp) +
                parseFloat(data.issue_bits) +
                parseFloat(data.issue_swp) +
                parseFloat(data.issue_bb) +
                parseFloat(data.issue_w_bb) +
                parseFloat(data.issue_bb_A) +
                parseFloat(data.issue_bb1) +
                parseFloat(data.issue_bb1_A) +
                parseFloat(data.issue_bb_2) +
                parseFloat(data.issue_ssp_1) +
                parseFloat(data.issue_ssp_1_small) +
                parseFloat(data.issue_ssp_2) +
                parseFloat(data.issue_ssp_2_small) +
                parseFloat(data.issue_sdp) +
                parseFloat(data.issue_add_5) +
                parseFloat(data.issue_add_6) +
                parseFloat(data.issue_add_7) +
                parseFloat(data.issue_add_8) +
                parseFloat(data.issue_add_9) +
                parseFloat(data.issue_add_10) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_dpds) +
                parseFloat(data.issue_husk) +
                parseFloat(data.issue_sorting) +
                parseFloat(data.issue_ext_grade_1) +
                parseFloat(data.issue_ext_grade_2) +
                parseFloat(data.issue_ext_grade_3) +
                parseFloat(data.issue_ext_grade_4) +
                parseFloat(data.issue_ext_grade_5) +
                parseFloat(data.issue_ext_grade_6) +
                parseFloat(data.issue_ext_grade_7) +
                parseFloat(data.issue_ext_grade_8) +
                parseFloat(data.issue_ext_grade_9) +
                parseFloat(data.issue_ext_grade_10)
            ).toFixed(2))))
               {
                console.log(Number((
                parseFloat(data.issue_ssp) +
                parseFloat(data.issue_ssp_small) +
                parseFloat(data.issue_swp_1) +
                parseFloat(data.issue_wsp) +
                parseFloat(data.issue_bits) +
                parseFloat(data.issue_swp) +
                parseFloat(data.issue_bb) +
                parseFloat(data.issue_w_bb) +
                parseFloat(data.issue_bb_A) +
                parseFloat(data.issue_bb1) +
                parseFloat(data.issue_bb1_A) +
                parseFloat(data.issue_bb_2) +
                parseFloat(data.issue_ssp_1) +
                parseFloat(data.issue_ssp_1_small) +
                parseFloat(data.issue_ssp_2) +
                parseFloat(data.issue_ssp_2_small) +
                parseFloat(data.issue_sdp) +
                parseFloat(data.issue_add_5) +
                parseFloat(data.issue_add_6) +
                parseFloat(data.issue_add_7) +
                parseFloat(data.issue_add_8) +
                parseFloat(data.issue_add_9) +
                parseFloat(data.issue_add_10) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_dpds) +
                parseFloat(data.issue_husk) +
                parseFloat(data.issue_sorting) +
                parseFloat(data.issue_ext_grade_1) +
                parseFloat(data.issue_ext_grade_2) +
                parseFloat(data.issue_ext_grade_3) +
                parseFloat(data.issue_ext_grade_4) +
                parseFloat(data.issue_ext_grade_5) +
                parseFloat(data.issue_ext_grade_6) +
                parseFloat(data.issue_ext_grade_7) +
                parseFloat(data.issue_ext_grade_8) +
                parseFloat(data.issue_ext_grade_9) +
                parseFloat(data.issue_ext_grade_10)
            ).toFixed(2)))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            const BigTaihoUpdate = await bigTaihoModel.update(
                {
                    date: data.Date,              
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
                    issue_ssp: data.issue_ssp,
                    issue_ssp_small: data.issue_ssp_small,
                    issue_swp_1: data.issue_swp_1,
                    issue_wsp: data.issue_wsp,
                    issue_bits: data.issue_bits,
                    issue_swp: data.issue_swp,
                    issue_bb: data.issue_bb,
                    issue_w_bb: data.issue_w_bb,
                    issue_bb_A: data.issue_bb_A,
                    issue_bb1: data.issue_bb1,
                    issue_bb1_A: data.issue_bb1_A,
                    issue_bb_2: data.issue_bb_2,
                    issue_ssp_1: data.issue_ssp_1,
                    issue_ssp_1_small: data.issue_ssp_1_small,
                    issue_ssp_2: data.issue_ssp_2,
                    issue_ssp_2_small: data.issue_ssp_2_small,
                    issue_sdp: data.issue_sdp,
                    issue_add_1: data.issue_add_1,
                    issue_add_2: data.issue_add_2,
                    issue_add_3:data.issue_add_3,
                    issue_add_4: data.rcv_peelingN,
                    issue_add_5: data.issue_add_5,
                    issue_add_6: data.issue_add_6,
                    issue_add_7: data.issue_add_7,
                    issue_add_8: data.issue_add_8,
                    issue_add_9: data.issue_add_9,
                    issue_add_10: data.issue_add_10,
                    issue_ext_grade_1: data.issue_ext_grade_1,
                    issue_ext_grade_2: data.issue_ext_grade_2,
                    issue_ext_grade_3: data.issue_ext_grade_3,
                    issue_ext_grade_4: data.issue_ext_grade_4,
                    issue_ext_grade_5: data.issue_ext_grade_5,
                    issue_ext_grade_6: data.issue_ext_grade_6,
                    issue_ext_grade_7: data.issue_ext_grade_7,
                    issue_ext_grade_8: data.issue_ext_grade_8,
                    issue_ext_grade_9: data.issue_ext_grade_9,
                    issue_ext_grade_10: data.issue_ext_grade_10,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_dpds: data.issue_dpds,
                    issue_husk: data.issue_husk,
                    issue_sorting: data.issue_sorting,

                    
                  
                    current_backlog: (parseFloat(data.rcv_peelingN)+(data.rcv_village? parseFloat(data.rcv_village):0)
                    +(data.rcv_dpds? parseFloat(data.rcv_dpds):0)+(data.rcv_lw? parseFloat(data.rcv_lw):0)
                    +(data.rcv_sorting? parseFloat(data.rcv_sorting):0)+(data.rcv_mayur? parseFloat(data.rcv_mayur):0)
                    +(data.rcv_hamsa? parseFloat(data.rcv_hamsa):0) +(data.rcv_wholes? parseFloat(data.rcv_wholes):0)) 
                    - (parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
                    +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                      +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                      +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                      +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                      +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp)
                      +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                      +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                      +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                      +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+
                      parseFloat(data.issue_ext_grade_1) +
                      parseFloat(data.issue_ext_grade_2) +
                      parseFloat(data.issue_ext_grade_3) +
                      parseFloat(data.issue_ext_grade_4) +
                      parseFloat(data.issue_ext_grade_5) +
                      parseFloat(data.issue_ext_grade_6) +
                      parseFloat(data.issue_ext_grade_7) +
                      parseFloat(data.issue_ext_grade_8) +
                      parseFloat(data.issue_ext_grade_9) +
                      parseFloat(data.issue_ext_grade_10)
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
            if (BigTaihoUpdate) {

                 // 1. DPDS Out//

                const dpds_backlog = await DPDS.findOne({
                    attributes: ['current_backlog','rcv_transfer'],
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
                        fromSection:'BigTaiho',
                        toSection:'DPDS',
                        toSectionBeforeBacklog:dpds_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(dpds_backlog.dataValues.current_backlog)+parseFloat(data.issue_dpds),
                        createdBy: feeledBy
                     },{transaction});
                     if(dpds_backlog.dataValues.rcv_transfer){
                        await DPDS.update(
                            { 
                                rcv_transfer:sequelize.literal(`rcv_transfer+ ${data.issue_dpds}`),
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
                                rcv_transfer:data.issue_dpds,
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

                // 2. Sorting Out//

                const sorting_backlog = await SortingModel.findOne({
                    attributes: ['current_backlog','rcv_bigTaiho'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(sorting_backlog)
                if (sorting_backlog && sorting_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_sorting,
                        issueid:1,
                        date:data.Date,
                        fromSection:'BigTaiho',
                        toSection:'Sorting',
                        toSectionBeforeBacklog:sorting_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(sorting_backlog.dataValues.current_backlog)+parseFloat(data.issue_sorting),
                        createdBy: feeledBy
                     },{transaction});
                     if(sorting_backlog.dataValues.rcv_bigTaiho){
                        await SortingModel.update(
                            { 
                                rcv_bigTaiho:sequelize.literal(`rcv_bigTaiho+ ${data.issue_sorting}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_sorting}`)
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
                        await SortingModel.update(
                            { 
                                rcv_bigTaiho:data.issue_sorting,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_sorting}`)
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
                    res.status(500).json({ message: "Error In Creating Sorting Transaction History" });
                    throw new Error('Transaction Aborted')
                } 


                //3. Rejection Out//

                const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_bigTaiho'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(rejection_backlog)
                if (rejection_backlog && rejection_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_rejection,
                        issueid:1,
                        date:data.Date,
                        fromSection:'BigTaiho',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_bigTaiho){
                        await rejectionModel.update(
                            { 
                                rcv_bigTaiho:sequelize.literal(`rcv_bigTaiho+ ${data.issue_rejection}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                        await rejectionModel.update(
                            { 
                                rcv_bigTaiho:data.issue_rejection,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                    res.status(500).json({ message: "Error In Creating Rejection Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                //4. Village Out//

                const vil_backlog = await villageProduction.findOne({
                    attributes: ['current_backlog','rcv_bigTaiho'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(vil_backlog)
                if (vil_backlog && vil_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_village,
                        issueid:1,
                        date:data.Date,
                        fromSection:'BigTaiho',
                        toSection:'Village',
                        toSectionBeforeBacklog:vil_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(vil_backlog.dataValues.current_backlog)+parseFloat(data.issue_village),
                        createdBy: feeledBy
                     },{transaction});
                     if(vil_backlog.dataValues.rcv_bigTaiho){
                        await villageProduction.update(
                            { 
                                rcv_bigTaiho:sequelize.literal(`rcv_bigTaiho+ ${data.issue_village}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                        await villageProduction.update(
                            { 
                                rcv_bigTaiho:data.issue_village,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                    res.status(500).json({ message: "Error In Creating Village Transaction History" });
                    throw new Error('Transaction Aborted')
                }
  
                let lotupdate
                //Lot Update
                if(vilLot===true){
                    lotupdate =await VLotNo.update(
                        { 
                          modifiedBy:'Next Interconnected'
                        },
                        {
                            where: {
                                vlotNo:LotNO
                            },transaction
                        }
                    );
                }
                else{
                    lotupdate =await LotNo.update(
                        { 
                          modifiedBy:'Next Interconnected'
                        },
                        {
                            where: {
                                lotNo:LotNO
                            },transaction
                        }
                    );
                }
                const lotoriginupdate = await lotoriginmodel.update(
                    {
                        latest_section: 'BigTaiho',
                        bigTaihoStatus: 1
                    },
                    {
                        where: {
                            lotNo: LotNO,
                            origin: data.origin
                        }, transaction
                    }
                );
                if (lotupdate && lotoriginupdate) {
                    res.status(200).json({ message: "BigTaiho Entry Made Successfully" });
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
            return res.status(500).json({ message: "Error while creating BigTaiho Entry" ,error});
        }
    }
}

// //BigTaihoTable.tsx
export const SearchRCNBigTaiho = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin,type} = req.body;
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
        if (type === "LOT") {
         whereClause.push({
           [Op.and]: [
             { LotNo: { [Op.notLike]: "%V%" } },
             { LotNo: { [Op.notLike]: "%R%" } },
           ],
         });
       } else if (type === "RLOT") {
         whereClause.push({
           LotNo: {
             [Op.like]: "%R%",
           },
         });
       } else {
         whereClause.push({
           LotNo: {
             [Op.like]: "%V%",
           },
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
             rcnEntries = await bigTaihoModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await bigTaihoModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'BigTaiho Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}
// //BigTaihoRecreate.tsx
export const CreateReissueBigTaiho= async (req: Request, res: Response) => {
   
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
            
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_1, data.Mc_on_1) -
                (timeToMilliseconds(data.Mc_breakdown_1) + timeToMilliseconds(data.otherTime_1))
            const runtime2 = CalculatemachineOnOffTime(data.Mc_off_2, data.Mc_on_2) -
                (timeToMilliseconds(data.Mc_breakdown_2) + timeToMilliseconds(data.otherTime_2))
            const runtime3 = CalculatemachineOnOffTime(data.Mc_off_3, data.Mc_on_3) -
                (timeToMilliseconds(data.Mc_breakdown_3) + timeToMilliseconds(data.otherTime_3))
             
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine BigTaiho Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine Spectrum Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine Amrita Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
          
            
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);


            //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
            if(Number(parseFloat(data.issue_add_1).toFixed(2))< (Number((parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
                +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                  +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                  +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                  +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                  +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp) 
                  +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                  +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                  +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                  +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+ parseFloat(data.issue_ext_grade_1) +
                  parseFloat(data.issue_ext_grade_2) +
                  parseFloat(data.issue_ext_grade_3) +
                  parseFloat(data.issue_ext_grade_4) +
                  parseFloat(data.issue_ext_grade_5) +
                  parseFloat(data.issue_ext_grade_6) +
                  parseFloat(data.issue_ext_grade_7) +
                  parseFloat(data.issue_ext_grade_8) +
                  parseFloat(data.issue_ext_grade_9) +
                  parseFloat(data.issue_ext_grade_10)).toFixed(2)))
               )
                {
                 console.log(Number(parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
                 +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                   +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                   +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                   +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                   +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp) 
                   +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                   +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                   +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                   +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+
                   parseFloat(data.issue_ext_grade_1) +
                   parseFloat(data.issue_ext_grade_2) +
                   parseFloat(data.issue_ext_grade_3) +
                   parseFloat(data.issue_ext_grade_4) +
                   parseFloat(data.issue_ext_grade_5) +
                   parseFloat(data.issue_ext_grade_6) +
                   parseFloat(data.issue_ext_grade_7) +
                   parseFloat(data.issue_ext_grade_8) +
                   parseFloat(data.issue_ext_grade_9) +
                   parseFloat(data.issue_ext_grade_10)
                  ).toFixed(2))
                 res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                 throw new Error('Transaction Aborted due to negative value')
 
             }
            
            const bigTaihoupdate=await bigTaihoModel.update(
                {
                    latest:0
                    
                },{
                    where: {
                        id: data.id
                    }, transaction
                }
                   
                
            );
            if(bigTaihoupdate)
            {
                const reissuecreate=await bigTaihoModel.create(
                    {     
                        date:data.Date,
                        altid:parseInt(data.alt_id)+1,
                        LotNo:data.LotNo,
                        origin:data.origin,
                        mixingLot:data.mixingLot,
                        rcv_peeling: data.rcv_peeling,
                        rcv_village: data.rcv_village,
                        rcv_dpds: data.rcv_dpds,
                        rcv_lw: data.rcv_lw,
                        rcv_sorting: data.rcv_sorting,
                        rcv_mayur: data.rcv_mayur,
                        rcv_hamsa: data.rcv_hamsa,
                        rcv_wholes: data.rcv_wholes,
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
                        issue_ssp: data.issue_ssp,
                        issue_ssp_small: data.issue_ssp_small,
                        issue_swp_1: data.issue_swp_1,
                        issue_wsp: data.issue_wsp,
                        issue_bits: data.issue_bits,
                        issue_swp: data.issue_swp,
                        issue_bb: data.issue_bb,
                        issue_w_bb: data.issue_w_bb,
                        issue_bb_A: data.issue_bb_A,
                        issue_bb1: data.issue_bb1,
                        issue_bb1_A: data.issue_bb1_A,
                        issue_bb_2: data.issue_bb_2,
                        issue_ssp_1: data.issue_ssp_1,
                        issue_ssp_1_small: data.issue_ssp_1_small,
                        issue_ssp_2: data.issue_ssp_2,
                        issue_ssp_2_small: data.issue_ssp_2_small,
                        issue_sdp: data.issue_sdp,
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
                        issue_ext_grade_1: data.issue_ext_grade_1,
                        issue_ext_grade_2: data.issue_ext_grade_2,
                        issue_ext_grade_3: data.issue_ext_grade_3,
                        issue_ext_grade_4: data.issue_ext_grade_4,
                        issue_ext_grade_5: data.issue_ext_grade_5,
                        issue_ext_grade_6: data.issue_ext_grade_6,
                        issue_ext_grade_7: data.issue_ext_grade_7,
                        issue_ext_grade_8: data.issue_ext_grade_8,
                        issue_ext_grade_9: data.issue_ext_grade_9,
                        issue_ext_grade_10: data.issue_ext_grade_10,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_dpds: data.issue_dpds,
                        issue_husk: data.issue_husk,
                        issue_sorting: data.issue_sorting,
                      
                       
                       current_backlog:parseFloat(data.issue_add_1)- (parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
                       +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                         +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                         +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                         +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                         +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp) 
                         +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                         +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                         +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                         +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+
                         parseFloat(data.issue_ext_grade_1) +
                         parseFloat(data.issue_ext_grade_2) +
                         parseFloat(data.issue_ext_grade_3) +
                         parseFloat(data.issue_ext_grade_4) +
                         parseFloat(data.issue_ext_grade_5) +
                         parseFloat(data.issue_ext_grade_6) +
                         parseFloat(data.issue_ext_grade_7) +
                         parseFloat(data.issue_ext_grade_8) +
                         parseFloat(data.issue_ext_grade_9) +
                         parseFloat(data.issue_ext_grade_10)
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
                     //1. DPDS Re-Issue//

                    const dpds_backlog = await DPDS.findOne({
                        attributes: ['current_backlog','rcv_transfer'],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(dpds_backlog)
                    if (dpds_backlog && dpds_backlog.dataValues.current_backlog>=0)
                    {
                        await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_dpds,
                        date:data.Date,
                        fromSection:'BigTaiho',
                        toSection:'DPDS',
                        toSectionBeforeBacklog:dpds_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(dpds_backlog.dataValues.current_backlog)+parseFloat(data.issue_dpds),
                        createdBy: feeledBy,
                        issueid:parseInt(data.alt_id)+1,
                        },{transaction});
                        if(dpds_backlog.dataValues.rcv_transfer)
                            {
                        await DPDS.update(
                            { 
                                rcv_transfer:sequelize.literal(`rcv_transfer+ ${data.issue_dpds}`),
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
                                rcv_transfer:data.issue_dpds,
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
                        res.status(500).json({ message: "Error In Creating Reissue DPDS Transaction History" });
                        throw new Error('Transaction Aborted')
                    } 
                    
                    //2. Sorting Re-Issue//

                    const sorting_backlog = await SortingModel.findOne({
                        attributes: ['current_backlog','rcv_bigTaiho'],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(sorting_backlog)
                    if (sorting_backlog && sorting_backlog.dataValues.current_backlog>=0){
                        await sectionTransfer.create({              
                            LotNo:LotNO,
                            origin:data.origin,
                            amount:data.issue_sorting,
                            issueid:parseInt(data.alt_id)+1,
                            date:data.Date,
                            fromSection:'BigTaiho',
                            toSection:'Sorting',
                            toSectionBeforeBacklog:sorting_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog:parseFloat(sorting_backlog.dataValues.current_backlog)+parseFloat(data.issue_sorting),
                            createdBy: feeledBy
                         },{transaction});
                         if(sorting_backlog.dataValues.rcv_bigTaiho){
                            await SortingModel.update(
                                { 
                                    rcv_bigTaiho:sequelize.literal(`rcv_bigTaiho+ ${data.issue_sorting}`),
                                    current_backlog:sequelize.literal(`current_backlog+ ${data.issue_sorting}`)
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
                            await SortingModel.update(
                                { 
                                    rcv_bigTaiho:data.issue_sorting,
                                    current_backlog:sequelize.literal(`current_backlog+ ${data.issue_sorting}`)
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
                        res.status(500).json({ message: "Error In Creating Sorting Transaction History" });
                        throw new Error('Transaction Aborted')
                    } 

                     //3. Rejection Re-Issue//

                const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_bigTaiho'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(rejection_backlog)
                if (rejection_backlog && rejection_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_rejection,
                        issueid:parseInt(data.alt_id)+1,
                        date:data.Date,
                        fromSection:'BigTaiho',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_bigTaiho){
                        await rejectionModel.update(
                            { 
                                rcv_bigTaiho:sequelize.literal(`rcv_bigTaiho+ ${data.issue_rejection}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                        await rejectionModel.update(
                            { 
                                rcv_bigTaiho:data.issue_rejection,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                    res.status(500).json({ message: "Error In Creating Rejection re-Issue Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                //4. Village Re-Issue//

                const vil_backlog = await villageProduction.findOne({
                    attributes: ['current_backlog','rcv_bigTaiho'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(vil_backlog)
                if (vil_backlog && vil_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_village,
                        issueid:parseInt(data.alt_id)+1,
                        date:data.Date,
                        fromSection:'BigTaiho',
                        toSection:'Village',
                        toSectionBeforeBacklog:vil_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(vil_backlog.dataValues.current_backlog)+parseFloat(data.issue_village),
                        createdBy: feeledBy
                     },{transaction});
                     if(vil_backlog.dataValues.rcv_bigTaiho){
                        await villageProduction.update(
                            { 
                                rcv_bigTaiho:sequelize.literal(`rcv_bigTaiho+ ${data.issue_village}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                        await villageProduction.update(
                            { 
                                rcv_bigTaiho:data.issue_village,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                    res.status(500).json({ message: "Error In Creating Village Transaction History" });
                    throw new Error('Transaction Aborted')
                }

                    const lotupdate = await lotoriginmodel.update(
                        {
                            latest_section: 'BigTaiho',
                            bigTaihoStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                        );
                        if (lotupdate) {
                        res.status(200).json({ message: "BigTaiho Re-Issue Entry Made Successfully" });
                        }
                        else {
                        console.log('No Need For Update')
                        }
                }
                else{
                    return res.status(500).json({ message: "Error while creating BigTaiho Re Issue Entry"});
                }
            }
            
           
        }
       
        


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating BigTaiho Re-Issue Entry" ,error});
        }
    }
    


}

export const updateEntireBigTaiho= async (req: Request, res: Response) => {
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
            
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_1, data.Mc_on_1) -
                (timeToMilliseconds(data.Mc_breakdown_1) + timeToMilliseconds(data.otherTime_1))
            const runtime2 = CalculatemachineOnOffTime(data.Mc_off_2, data.Mc_on_2) -
                (timeToMilliseconds(data.Mc_breakdown_2) + timeToMilliseconds(data.otherTime_2))
            const runtime3 = CalculatemachineOnOffTime(data.Mc_off_3, data.Mc_on_3) -
                (timeToMilliseconds(data.Mc_breakdown_3) + timeToMilliseconds(data.otherTime_3))
             
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine BigTaiho Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine Spectrum Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine Amrita Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
          
            
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);
         
            
            if((Number((parseFloat(data.rcv_peelingN)+(data.rcv_village? parseFloat(data.rcv_village):0)
                +(data.rcv_dpds? parseFloat(data.rcv_dpds):0)+(data.rcv_lw? parseFloat(data.rcv_lw):0)
                +(data.rcv_sorting? parseFloat(data.rcv_sorting):0)+(data.rcv_mayur? parseFloat(data.rcv_mayur):0)
                +(data.rcv_hamsa? parseFloat(data.rcv_hamsa):0) +(data.rcv_wholes? parseFloat(data.rcv_wholes):0)
           ).toFixed(2)))<   (Number((parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
              +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp) 
                +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+
                parseFloat(data.issue_ext_grade_1) +
                parseFloat(data.issue_ext_grade_2) +
                parseFloat(data.issue_ext_grade_3) +
                parseFloat(data.issue_ext_grade_4) +
                parseFloat(data.issue_ext_grade_5) +
                parseFloat(data.issue_ext_grade_6) +
                parseFloat(data.issue_ext_grade_7) +
                parseFloat(data.issue_ext_grade_8) +
                parseFloat(data.issue_ext_grade_9) +
                parseFloat(data.issue_ext_grade_10)
 ).toFixed(2))))
               {
                console.log(Number((parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
                +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                  +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                  +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                  +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                  +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp)
                  +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                  +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                  +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                  +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+
                  parseFloat(data.issue_ext_grade_1) +
                  parseFloat(data.issue_ext_grade_2) +
                  parseFloat(data.issue_ext_grade_3) +
                  parseFloat(data.issue_ext_grade_4) +
                  parseFloat(data.issue_ext_grade_5) +
                  parseFloat(data.issue_ext_grade_6) +
                  parseFloat(data.issue_ext_grade_7) +
                  parseFloat(data.issue_ext_grade_8) +
                  parseFloat(data.issue_ext_grade_9) +
                  parseFloat(data.issue_ext_grade_10)).toFixed(2))
)
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            
            await bigTaihoEditModel.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                    altid:data.alt_id,
                    mixingLot:data.mixingLot,

                    rcv_peeling: data.rcv_peeling,
                    rcv_village: data.rcv_village,
                    rcv_dpds: data.rcv_dpds,
                    rcv_lw: data.rcv_lw,
                    rcv_sorting: data.rcv_sorting,
                    rcv_mayur: data.rcv_mayur,
                    rcv_hamsa: data.rcv_hamsa,
                    rcv_wholes: data.rcv_wholes,

                    
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
                    issue_ssp: data.issue_ssp,
                    issue_ssp_small: data.issue_ssp_small,
                    issue_swp_1: data.issue_swp_1,
                    issue_wsp: data.issue_wsp,
                    issue_bits: data.issue_bits,
                    issue_swp: data.issue_swp,
                    issue_bb: data.issue_bb,
                    issue_w_bb: data.issue_w_bb,
                    issue_bb_A: data.issue_bb_A,
                    issue_bb1: data.issue_bb1,
                    issue_bb1_A: data.issue_bb1_A,
                    issue_bb_2: data.issue_bb_2,
                    issue_ssp_1: data.issue_ssp_1,
                    issue_ssp_1_small: data.issue_ssp_1_small,
                    issue_ssp_2: data.issue_ssp_2,
                    issue_ssp_2_small: data.issue_ssp_2_small,
                    issue_sdp: data.issue_sdp,
                    issue_add_1: data.issue_add_1,
                    issue_add_2: data.issue_add_2,
                    issue_add_3:data.issue_add_3,
                    issue_add_4: data.rcv_peelingN,
                    issue_add_5: data.issue_add_5,
                    issue_add_6: data.issue_add_6,
                    issue_add_7: data.issue_add_7,
                    issue_add_8: data.issue_add_8,
                    issue_add_9: data.issue_add_9,
                    issue_add_10: data.issue_add_10,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_dpds: data.issue_dpds,
                    issue_husk: data.issue_husk,
                    issue_sorting: data.issue_sorting,
                    issue_ext_grade_1: data.issue_ext_grade_1,
                    issue_ext_grade_2: data.issue_ext_grade_2,
                    issue_ext_grade_3: data.issue_ext_grade_3,
                    issue_ext_grade_4: data.issue_ext_grade_4,
                    issue_ext_grade_5: data.issue_ext_grade_5,
                    issue_ext_grade_6: data.issue_ext_grade_6,
                    issue_ext_grade_7: data.issue_ext_grade_7,
                    issue_ext_grade_8: data.issue_ext_grade_8,
                    issue_ext_grade_9: data.issue_ext_grade_9,
                    issue_ext_grade_10: data.issue_ext_grade_10,
                    
                  
                    current_backlog: (parseFloat(data.rcv_peelingN)+(data.rcv_village? parseFloat(data.rcv_village):0)
                    +(data.rcv_dpds? parseFloat(data.rcv_dpds):0)+(data.rcv_lw? parseFloat(data.rcv_lw):0)
                    +(data.rcv_sorting? parseFloat(data.rcv_sorting):0)+(data.rcv_mayur? parseFloat(data.rcv_mayur):0)
                    +(data.rcv_hamsa? parseFloat(data.rcv_hamsa):0) +(data.rcv_wholes? parseFloat(data.rcv_wholes):0)) 
                    - (parseFloat(data.issue_ssp)+parseFloat(data.issue_ssp_small)+parseFloat(data.issue_swp_1)
                    +parseFloat(data.issue_wsp)+parseFloat(data.issue_bits)+parseFloat(data.issue_swp)
                      +parseFloat(data.issue_bb)+parseFloat(data.issue_w_bb)+parseFloat(data.issue_bb_A)
                      +parseFloat(data.issue_bb1)+parseFloat(data.issue_bb1_A)+parseFloat(data.issue_bb_2)
                      +parseFloat(data.issue_ssp_1)+parseFloat(data.issue_ssp_1_small)+parseFloat(data.issue_ssp_2)
                      +parseFloat(data.issue_ssp_2_small)+parseFloat(data.issue_sdp) 
                      +parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                      +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                      +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                      +parseFloat(data.issue_dpds)+parseFloat(data.issue_husk)+parseFloat(data.issue_sorting)+
                      parseFloat(data.issue_ext_grade_1) +
                      parseFloat(data.issue_ext_grade_2) +
                      parseFloat(data.issue_ext_grade_3) +
                      parseFloat(data.issue_ext_grade_4) +
                      parseFloat(data.issue_ext_grade_5) +
                      parseFloat(data.issue_ext_grade_6) +
                      parseFloat(data.issue_ext_grade_7) +
                      parseFloat(data.issue_ext_grade_8) +
                      parseFloat(data.issue_ext_grade_9) +
                      parseFloat(data.issue_ext_grade_10)
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
            const lotupdate= await bigTaihoModel.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    //const data = await WhatsappMsg("BigTaiho", feeledBy,"modify_request","Production")
                    //console.log(data)
                    return res.status(201).json({ message: "Edit Request of BigTaiho Entry Raised successfully" });
               
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
            return res.status(500).json({ message: "Error while Editing BigTaiho Entry" ,error});
        }
    }
    


}

export const approveBigTaiho = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await bigTaihoEditModel.findOne({
            where: {
                id
            }
        }) as any;
        
        if (!data) {
            return res.status(400).json({ message: "BigTaiho Edit Entry not found" });
        }
        else{
            const transferDPDSdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'BigTaiho',
                    toSection:'DPDS'
                }
            }) as any


            const transferSortingdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'BigTaiho',
                    toSection:'Sorting'
                }
            }) as any

            const transferRejectiondata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'BigTaiho',
                    toSection:'Rejection'
                }
            }) as any

            const transferVildata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'BigTaiho',
                    toSection:'Village'
                }
            }) as any


            if(transferDPDSdata && transferSortingdata && transferRejectiondata && transferVildata){
                await sequelize.transaction(async (transaction: any) => {

                    const BigTEdit = await bigTaihoModel.update({
                    date: data.date,              
                    noOfdayOperators: data.noOfdayOperators,
                    noOfnightOperators: data.noOfnightOperators,
                    Mc_on_1: data.Mc_on_1,
                    Mc_off_1: data.Mc_off_1,
                    Mc_runTime_1: data.Mc_runTime_1,
                    Mc_breakdown_1: data.Mc_breakdown_1,
                    otherTime_1: data.otherTime_1,
                    Mc_on_2: data.Mc_on_2,
                    Mc_off_2: data.Mc_off_2,
                    Mc_runTime_2: data.Mc_runTime_2,
                    Mc_breakdown_2: data.Mc_breakdown_2,
                    otherTime_2: data.otherTime_2,
                    Mc_on_3: data.Mc_on_3,
                    Mc_off_3: data.Mc_off_3,
                    Mc_runTime_3: data.Mc_runTime_3,
                    Mc_breakdown_3: data.Mc_breakdown_3,
                    otherTime_3: data.otherTime_3,
                    issue_ssp: data.issue_ssp,
                    issue_ssp_small: data.issue_ssp_small,
                    issue_swp_1: data.issue_swp_1,
                    issue_wsp: data.issue_wsp,
                    issue_bits: data.issue_bits,
                    issue_swp: data.issue_swp,
                    issue_bb: data.issue_bb,
                    issue_w_bb: data.issue_w_bb,
                    issue_bb_A: data.issue_bb_A,
                    issue_bb1: data.issue_bb1,
                    issue_bb1_A: data.issue_bb1_A,
                    issue_bb_2: data.issue_bb_2,
                    issue_ssp_1: data.issue_ssp_1,
                    issue_ssp_1_small: data.issue_ssp_1_small,
                    issue_ssp_2: data.issue_ssp_2,
                    issue_ssp_2_small: data.issue_ssp_2_small,
                    issue_sdp: data.issue_sdp,
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
                    issue_ext_grade_1: data.issue_ext_grade_1,
                    issue_ext_grade_2: data.issue_ext_grade_2,
                    issue_ext_grade_3: data.issue_ext_grade_3,
                    issue_ext_grade_4: data.issue_ext_grade_4,
                    issue_ext_grade_5: data.issue_ext_grade_5,
                    issue_ext_grade_6: data.issue_ext_grade_6,
                    issue_ext_grade_7: data.issue_ext_grade_7,
                    issue_ext_grade_8: data.issue_ext_grade_8,
                    issue_ext_grade_9: data.issue_ext_grade_9,
                    issue_ext_grade_10: data.issue_ext_grade_10,

                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_dpds: data.issue_dpds,
                    issue_husk: data.issue_husk,
                    issue_sorting: data.issue_sorting,  
    
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
                        //console.log(transferDPDSdata)
                        if(parseFloat(transferDPDSdata.amount)!==parseFloat(data.issue_dpds)){
                            console.log('Needs Update In DPDS')
                            const difference_dpds=parseFloat(data.issue_dpds)-parseFloat(transferDPDSdata.amount)
                            console.log(difference_dpds)
                            const backlog = await DPDS.findOne({
                                attributes: ['current_backlog','rcv_transfer'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await DPDS.update(
                                    {
                                        rcv_transfer: sequelize.literal(`rcv_transfer+ ${difference_dpds}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_dpds}`)
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
                                    amount:data.issue_dpds,
                                    toSectionBeforeBacklog:transferDPDSdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferDPDSdata.toSectionBeforeBacklog)+parseFloat(data.issue_dpds)
                        
                                }, {
                                    where: {
                                        id:transferDPDSdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated DPDS Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }
                        if(parseFloat(transferSortingdata.amount)!==parseFloat(data.issue_sorting)){
                            console.log('Needs Update In Sorting')
                            const difference_sorting=parseFloat(data.issue_sorting)-parseFloat(transferSortingdata.amount)
                            console.log(difference_sorting)
                            const backlog = await SortingModel.findOne({
                                attributes: ['current_backlog','rcv_bigTaiho'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await SortingModel.update(
                                    {
                                        rcv_bigTaiho: sequelize.literal(`rcv_bigTaiho+ ${difference_sorting}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_sorting}`)
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
                                    amount:data.issue_sorting,
                                    toSectionBeforeBacklog:transferSortingdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferSortingdata.toSectionBeforeBacklog)+parseFloat(data.issue_sorting)
                        
                                }, {
                                    where: {
                                        id:transferSortingdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Sorting Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferRejectiondata.amount)!==parseFloat(data.issue_rejection)){
                            console.log('Needs Update In Rejection')
                            const difference_rejection=parseFloat(data.issue_rejection)-parseFloat(transferRejectiondata.amount)
                            console.log(difference_rejection)
                            const backlog = await rejectionModel.findOne({
                                attributes: ['current_backlog','rcv_bigTaiho'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await rejectionModel.update(
                                    {
                                        rcv_bigTaiho: sequelize.literal(`rcv_bigTaiho+ ${difference_rejection}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_rejection}`)
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
                                    amount:data.issue_rejection,
                                    toSectionBeforeBacklog:transferRejectiondata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferRejectiondata.toSectionBeforeBacklog)+parseFloat(data.issue_rejection)
                        
                                }, {
                                    where: {
                                        id:transferRejectiondata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Rejection Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferVildata.amount)!==parseFloat(data.issue_village)){
                            console.log('Needs Update In Village')
                            const difference_vil=parseFloat(data.issue_village)-parseFloat(transferVildata.amount)
                            console.log(difference_vil)
                            const backlog = await villageProduction.findOne({
                                attributes: ['current_backlog','rcv_bigTaiho'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await villageProduction.update(
                                    {
                                        rcv_bigTaiho: sequelize.literal(`rcv_bigTaiho+ ${difference_vil}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_vil}`)
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
                                    amount:data.issue_village,
                                    toSectionBeforeBacklog:transferVildata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferVildata.toSectionBeforeBacklog)+parseFloat(data.issue_village)
                        
                                }, {
                                    where: {
                                        id:transferVildata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Village Entry Not Found" });
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
                        await bigTaihoEditModel.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of BigTaiho Entry is Approved Successfully" });
                    }
                    
                })
            }
            else{
                return res.status(400).json({ message: "BigTaiho Transfer Entry is not found" });
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectBigTaiho = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await bigTaihoModel.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "BigTaiho Entry not found" });
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
        const rcnEdit = await bigTaihoEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Big Taiho Entry not found" });
        }
        return res.status(200).json({ message: "BigTaiho Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
// //RCNBigTaihoMix.tsx
export const SearchRCNBigTaihoMix = async (req: Request, res: Response) => {
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
        
             rcnEntries = await bigTaihoModel.findOne({
                attributes: ['id','rcv_peeling','current_backlog','rcv_sorting','rcv_dpds',
                    'rcv_village','rcv_mayur','rcv_hamsa','rcv_lw','rcv_wholes','editStatus','Status','issue_add_4'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const CreateMixBigTaiho = async (req: Request, res: Response) => {

    try {
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid = req.body.fsourceid;
        const sourcelot = req.body.fsourcelot;
        const sourceorigin = req.body.fsourceorigin;
        const source_rcv_peeling = req.body.fsourcercv_peeling;
        const source_rcv_sorting = req.body.fsourcercv_sorting;
        const source_rcv_dpds = req.body.fsourcercv_dpds;
        const source_rcv_village = req.body.fsourcercv_village;
        const source_rcv_mayur = req.body.fsourcercv_mayur;
        const source_rcv_hamsa = req.body.fsourcercv_hamsa;
        const source_rcv_lw = req.body.fsourcercv_lw;
        const source_rcv_wholes = req.body.fsourcercv_wholes;
        const destrcv_status = req.body.destrcv_status;

        const source_backlog = req.body.fsourcebacklog;

        const transfer_amount = req.body.amount

        const destid = req.body.destid;
        const destlot = req.body.destlot;
        const destorigin = req.body.destorigin;
        const dest_rcv_peeling = req.body.destrcv_peeling;
        const dest_rcv_sorting = req.body.destrcv_sorting;
        const dest_rcv_dpds = req.body.destrcv_dpds;
        const dest_rcv_village = req.body.destrcv_village;
        const dest_rcv_mayur = req.body.destrcv_mayur;
        const dest_rcv_hamsa = req.body.destrcv_hamsa;
        const dest_rcv_lw = req.body.destrcv_lw;
        const dest_rcv_wholes = req.body.destrcv_wholes;

        const dest_backlog = req.body.destbacklog;

        const b_soucre_backlog = req.body.bsourcebacklog;
        const b_dest_backlog = req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourcedata = await bigTaihoModel.findOne({
                attributes: ['rcv_peeling', 'issue_add_4'],
                where: {
                    id: sourceid
                },
            });

            let sourceupdate
            if (sourcedata) {
                const peeldiff = parseFloat(sourcedata.dataValues.issue_add_4) - parseFloat(source_rcv_peeling)
                const totbeforeborma = parseFloat(sourcedata.dataValues.rcv_peeling) - peeldiff
                const totafterborma = parseFloat(source_rcv_peeling)
                sourceupdate = await bigTaihoModel.update(
                    {
                        rcv_peeling: sequelize.literal(`rcv_peeling- ${peeldiff}`),
                        issue_add_3: ((totbeforeborma - totafterborma) / totbeforeborma) * 100,
                        issue_add_4: source_rcv_peeling,
                        rcv_sorting: source_rcv_sorting,
                        rcv_dpds: source_rcv_dpds,
                        rcv_village: source_rcv_village,
                        rcv_mayur: source_rcv_mayur,
                        rcv_hamsa: source_rcv_hamsa,
                        rcv_lw: source_rcv_lw,
                        rcv_wholes: source_rcv_wholes,
                        current_backlog: source_backlog,
                    },
                    {
                        where: {
                            id: sourceid
                        }, transaction
                    }
                );
            }
            const destdata = await bigTaihoModel.findOne({
                attributes: ['mixingLot', 'rcv_peeling', 'issue_add_4'],
                where: {
                    id: destid

                },

            });

            if (destdata) 
            {
                let destupdate
                if (Number(destrcv_status) === 0) {
                    destupdate = await bigTaihoModel.update(
                        {
                            rcv_peeling: dest_rcv_peeling,
                            rcv_sorting: dest_rcv_sorting,
                            rcv_dpds: dest_rcv_dpds,
                            rcv_village: dest_rcv_village,
                            rcv_mayur: dest_rcv_mayur,
                            rcv_hamsa: dest_rcv_hamsa,
                            rcv_lw: dest_rcv_lw,
                            rcv_wholes: dest_rcv_wholes,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                                sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`) : `${sourcelot}(${sourceorigin})`,
                        },
                        {
                            where: {
                                id: destid
                            }, transaction
                        }
                    );
                }
                else {
                    const peeldiffD = parseFloat(dest_rcv_peeling) - parseFloat(destdata.dataValues.issue_add_4)
                    const totbeforebormaD = parseFloat(destdata.dataValues.rcv_peeling) + peeldiffD
                    const totafterbormaD = parseFloat(dest_rcv_peeling)
                    destupdate = await bigTaihoModel.update(
                        {
                            rcv_peeling: sequelize.literal(`rcv_peeling+ ${peeldiffD}`),
                            issue_add_3: ((totbeforebormaD - totafterbormaD) / totbeforebormaD) * 100,
                            issue_add_4: dest_rcv_peeling,
                            rcv_sorting: dest_rcv_sorting,
                            rcv_dpds: dest_rcv_dpds,
                            rcv_village: dest_rcv_village,
                            rcv_mayur: dest_rcv_mayur,
                            rcv_hamsa: dest_rcv_hamsa,
                            rcv_lw: dest_rcv_lw,
                            rcv_wholes: dest_rcv_wholes,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                                sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`) : `${sourcelot}(${sourceorigin})`,
                        },
                        {
                            where: {
                                id: destid
                            }, transaction
                        }
                    );

                }

                if (sourceupdate && destupdate) {
                    const mixcreate = await mixingModel.create(
                        {
                            FromLotNo: sourcelot,
                            Fromorigin: sourceorigin,
                            ToLotNo: destlot,
                            Toorigin: destorigin,
                            amount: transfer_amount,
                            date: new Date(),
                            Section: 'BigTaiho',
                            amountBeforeBacklog: b_soucre_backlog,
                            amountAfterBacklog: source_backlog,
                            destamountBeforeBacklog: b_dest_backlog,
                            destamountAfterBacklog: dest_backlog,
                            createdBy: createdBy,
                        },
                        {
                            transaction
                        }
                    );
                    if (mixcreate) {
                        return res.status(200).json({ message: "Mixing Performed Successfully" });

                    }
                    else {
                        return res.status(500).json({ message: "Internal Server Error" });
                    }
                }
                else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        })


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const getDummyLot = async (req: Request, res: Response) => {
  try {
    const data = await bigTaihoModel.findOne({
      where: { LotNo: DUMMY_LOT },
      raw: true,
    });

    res.status(200).json({message: 'Dummy Entry found',data});
  } catch (err) {
    console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
  }
};

export const updateDummyLot = async (req: Request, res: Response) => {
  try {

         const user = req.cookies?.user || "UNKNOWN";
    const section = "BIG-TAIHO"; // 🔥 change dynamically if needed

    const now = new Date();
    await bigTaihoModel.update(req.body, {
      where: { LotNo: DUMMY_LOT },
    });

        await dummyLotGradeAdjust.create({
          section: section,
          createdBy: user,
          date: now,
          time: now,
        });

 

   res.status(200).json({message: 'Updated Successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};







