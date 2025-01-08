import { Request, Response } from "express";


import Mayur from "../../model/mayurModel";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import MayurEdit from "../../model/mayureditModel";
import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import DPDS from "../../model/dpdsmodel";
import DPDSEdit from "../../model/dpdsEditModel";
import sectionTransfer from "../../model/transactionsectionmodel";

// //DPDS.tsx
export const findEditDPDSAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await DPDSEdit.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditDPDSAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error });
    }
}
export const sumOfallDPDS = async (req: Request, res: Response) => {

    
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

        const data = await DPDS.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_m_ds')), 'issue_m_ds'],
                [sequelize.fn('sum', sequelize.col('issue_m_dp')), 'issue_m_dp'],
                [sequelize.fn('sum', sequelize.col('issue_k_dp')), 'issue_k_dp'],
              
                [sequelize.fn('sum', sequelize.col('issue_ds_1')), 'issue_ds_1'],
                [sequelize.fn('sum', sequelize.col('issue_ds_2')), 'issue_ds_2'],
                [sequelize.fn('sum', sequelize.col('issue_sp_2')), 'issue_sp_2'],
                [sequelize.fn('sum', sequelize.col('issue_yjh')), 'issue_yjh'],
                [sequelize.fn('sum', sequelize.col('issue_kp')), 'issue_kp'],
                [sequelize.fn('sum', sequelize.col('issue_yk')), 'issue_yk'],
                [sequelize.fn('sum', sequelize.col('issue_wp')), 'issue_wp'],
                [sequelize.fn('sum', sequelize.col('issue_rs')), 'issue_rs'],
                [sequelize.fn('sum', sequelize.col('issue_dp_2')), 'issue_dp_2'],
                [sequelize.fn('sum', sequelize.col('issue_dp_3')), 'issue_dp_3'],
                [sequelize.fn('sum', sequelize.col('issue_dp_4')), 'issue_dp_4'],
                [sequelize.fn('sum', sequelize.col('issue_dp_3l')), 'issue_dp_3l'],
                [sequelize.fn('sum', sequelize.col('issue_ss')), 'issue_ss'],
                [sequelize.fn('sum', sequelize.col('issue_os')), 'issue_os'],
                [sequelize.fn('sum', sequelize.col('issue_os1')), 'issue_os1'],
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
                [sequelize.fn('sum', sequelize.col('issue_bigTaiho')), 'issue_bigTaiho'],
                [sequelize.fn('sum', sequelize.col('issue_mayur')), 'issue_mayur'],
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
        const EditData = await DPDSEdit.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getDPDSLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await DPDS.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog'],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un DPDS Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding DPDS Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //DPDSInitial.tsx
export const getDPDSBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await DPDS.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un DPDS Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding DPDS Entry"});
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
           )< (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
           +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
           parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
           + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
           +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
           +parseFloat(data.issue_ss_1)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
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
                +parseFloat(data.issue_ss_1)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
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
                    +(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)) 
                    - (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                    +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                    parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                    +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                    +parseFloat(data.issue_ss_1)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
                    +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                    +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                    +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                    +parseFloat(data.issue_add_10)+parseFloat(data.issue_rejection)+parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_mayur)
                        ),
                    current_backlog: (parseFloat(data.rcv_dp)+parseFloat(data.rcv_ds)+parseFloat(data.rcv_dp1)
                    +(data.rcv_Sorting? parseFloat(data.rcv_Sorting):0)) 
                    - (parseFloat(data.issue_m_ds)+parseFloat(data.issue_m_dp)+parseFloat(data.issue_k_dp)
                    +parseFloat(data.issue_ds_1)+parseFloat(data.issue_ds_2)+parseFloat(data.issue_sp_2)+
                    parseFloat(data.issue_yjh)+parseFloat(data.issue_yk)+parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp)+parseFloat(data.issue_rs)+parseFloat(data.issue_dp_2)
                    +parseFloat(data.issue_dp_3)+parseFloat(data.issue_dp_4)+parseFloat(data.issue_dp_3l)
                    +parseFloat(data.issue_ss_1)+parseFloat(data.issue_os)+parseFloat(data.issue_os1)
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

                

                const backlog = await Mayur.findOne({
                    attributes: ['current_backlog','rcv_DPDS'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(backlog)
                if (backlog && backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_mayur,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'Mayur',
                        toSectionBeforeBacklog:backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(backlog.dataValues.current_backlog)+parseFloat(data.issue_mayur),
                        createdBy: feeledBy
                     },{transaction});
                     if(backlog.dataValues.rcv_DPDS){
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
                else{
                    res.status(500).json({ message: "Error In Creating Transaction History" });
                    throw new Error('Transaction Aborted')
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
export const CreateReissueMayur= async (req: Request, res: Response) => {
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
            if (data.otherTime_133 === undefined || data.otherTime_133 === null) {
                data.otherTime_133 = '00:00'
            }
            if (data.Mc_breakdown_133 === undefined || data.Mc_breakdown_133 === null) {
                data.Mc_breakdown_133 = '00:00'
            }
            if (data.otherTime_331 === undefined || data.otherTime_331 === null) {
                data.otherTime_331 = '00:00'
            }
            if (data.Mc_breakdown_331 === undefined || data.Mc_breakdown_331 === null) {
                data.Mc_breakdown_331 = '00:00'
            }
            if (data.otherTime_292 === undefined || data.otherTime_292 === null) {
                data.otherTime_292 = '00:00'
            }
            if (data.Mc_breakdown_292 === undefined || data.Mc_breakdown_292 === null) {
                data.Mc_breakdown_292 = '00:00'
            }
            if (data.otherTime_293 === undefined || data.otherTime_293 === null) {
                data.otherTime_293 = '00:00'
            }
            if (data.Mc_breakdown_293 === undefined || data.Mc_breakdown_293 === null) {
                data.Mc_breakdown_293 = '00:00'
            }
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_133, data.Mc_on_133) -
                (timeToMilliseconds(data.Mc_breakdown_133) + timeToMilliseconds(data.otherTime_133))
                const runtime2 = CalculatemachineOnOffTime(data.Mc_off_331, data.Mc_on_331) -
                (timeToMilliseconds(data.Mc_breakdown_331) + timeToMilliseconds(data.otherTime_331))
                const runtime3 = CalculatemachineOnOffTime(data.Mc_off_292, data.Mc_on_292) -
                (timeToMilliseconds(data.Mc_breakdown_292) + timeToMilliseconds(data.otherTime_292))
                const runtime4 = CalculatemachineOnOffTime(data.Mc_off_293, data.Mc_on_293) -
                (timeToMilliseconds(data.Mc_breakdown_293) + timeToMilliseconds(data.otherTime_293))
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine 133 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine 331 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine 292 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime4 < 0) {
                res.status(500).json({ message: "Machine 293 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);
            const Mc_runTime4 = millisecondsToTime(runtime4);
            //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
         
            if(parseFloat(data.rcv_peeling)< (parseFloat(data.issue_pw_w)
                +parseFloat(data.issue_w_lot)
                +parseFloat(data.issue_ww)
                +parseFloat(data.issue_rejection)
                +parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_LW)
                +parseFloat(data.issue_JB)
               ))
               {
                console.log(parseFloat(data.issue_pw_w)
                +parseFloat(data.issue_w_lot)
                +parseFloat(data.issue_ww)
                +parseFloat(data.issue_rejection)
                +parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_LW)
                +parseFloat(data.issue_JB))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            const mayurupdate=await Mayur.update(
                {
                    latest:0
                    
                },{
                    where: {
                        id: data.id
                    }, transaction
                }
                   
                
            );
            if(mayurupdate)
            {
                const reissuecreate=await Mayur.create(
                    {     
                        date:data.Date,
                        altid:parseInt(data.alt_id)+1,
                        LotNo:data.LotNo,
                        origin:data.origin,
                        mixingLot:data.mixingLot,
                        rcv_wholespeel:data.rcv_wholespeel,
                        rcv_wholesunpeel:data.rcv_wholesunpeel,
                        rcv_DPDS:data.rcv_DPDS,
                        rcv_sorting:data.rcv_sorting,
                        rcv_village:data.rcv_village,
                        rcv_transfer:data.rcv_transfer,
                        Mc_on_133: data.Mc_on_133,
                        Mc_off_133: data.Mc_off_133,
                        Mc_breakdown_133: data.Mc_breakdown_133,
                        Mc_runTime_133: Mc_runTime1,
                        Mc_on_331: data.Mc_on_331,
                        Mc_off_331: data.Mc_off_331,
                        Mc_breakdown_331: data.Mc_breakdown_331,
                        Mc_runTime_331: Mc_runTime2,
                        Mc_on_292: data.Mc_on_292,
                        Mc_off_292: data.Mc_off_292,
                        Mc_breakdown_292: data.Mc_breakdown_292,
                        Mc_runTime_292: Mc_runTime3,
                        Mc_on_293: data.Mc_on_293,
                        Mc_off_293: data.Mc_off_293,
                        Mc_breakdown_293: data.Mc_breakdown_293,
                        Mc_runTime_293: Mc_runTime4,
                        otherTime_133: data.otherTime_133,
                        otherTime_331: data.otherTime_331,
                        otherTime_292: data.otherTime_292,
                        otherTime_293: data.otherTime_293,
                        noOfdayOperators:data.dayoperator,
                        noOfnightOperators:data.nightoperator,
                        
                        issue_pw_w: data.issue_pw_w,
                        issue_w_lot:data.issue_w_lot,
                        issue_ww: data.issue_ww,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_LW: data.issue_LW,
                        issue_JB: data.issue_JB,
                      
                        entry_backlog:parseFloat(data.rcv_peeling)- (parseFloat(data.issue_pw_w)
                        +parseFloat(data.issue_w_lot)
                        +parseFloat(data.issue_ww)
                        +parseFloat(data.issue_rejection)
                        +parseFloat(data.issue_village)
                        +parseFloat(data.issue_bigTaiho)
                        +parseFloat(data.issue_LW)
                        +parseFloat(data.issue_JB)
                       ),
                       current_backlog:parseFloat(data.rcv_peeling)- (parseFloat(data.issue_pw_w)
                       +parseFloat(data.issue_w_lot)
                       +parseFloat(data.issue_ww)
                       +parseFloat(data.issue_rejection)
                       +parseFloat(data.issue_village)
                       +parseFloat(data.issue_bigTaiho)
                       +parseFloat(data.issue_LW)
                       +parseFloat(data.issue_JB)
                      ),
                        Status: 1,
                        CreatedBy: feeledBy 
                    },
                    {
                        transaction
                    }
                );
                if(reissuecreate){
                    const lotupdate = await LotNo.update(
                        { 
                          modifiedBy:'Mayur'
                        },
                        {
                            where: {
                                lotNo:LotNO
                            },transaction
                        }
                    );
                    if(lotupdate){
                        res.status(200).json({ message: "Mayur Re Issue Entry Made Successfully" });
                    }
                    else{
                        console.log('No Need For Update')
                    }
                }
                else{
                    return res.status(500).json({ message: "Error while creating Mayur Re Issue Entry"});
                }
            }
            
            
            //  if(humidUpdate){
                
            //     await Mayur.create({
            //         id:data.id,
            //         LotNo:data.LotNo,
            //         origin:data.origin,
            //         TotalInput: data.TotalOutput,
            //         rcv_wholespeel: data.WholesPeel,
            //         rcv_wholesunpeel: data.WholesUnpeel,
            //         current_backlog:parseFloat(data.WholesPeel)+parseFloat(data.WholesUnpeel),
            //      },{transaction});
            //  }
           
        }
       
        


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating Mayur Entry" ,error});
        }
    }
    


}

export const SearchRCNMayur = async (req: Request, res: Response) => {
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
             rcnEntries = await Mayur.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await Mayur.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Mayur Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const updateEntireMayur= async (req: Request, res: Response) => {
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
            if (data.otherTime_133 === undefined || data.otherTime_133 === null) {
                data.otherTime_133 = '00:00'
            }
            if (data.Mc_breakdown_133 === undefined || data.Mc_breakdown_133 === null) {
                data.Mc_breakdown_133 = '00:00'
            }
            if (data.otherTime_331 === undefined || data.otherTime_331 === null) {
                data.otherTime_331 = '00:00'
            }
            if (data.Mc_breakdown_331 === undefined || data.Mc_breakdown_331 === null) {
                data.Mc_breakdown_331 = '00:00'
            }
            if (data.otherTime_292 === undefined || data.otherTime_292 === null) {
                data.otherTime_292 = '00:00'
            }
            if (data.Mc_breakdown_292 === undefined || data.Mc_breakdown_292 === null) {
                data.Mc_breakdown_292 = '00:00'
            }
            if (data.otherTime_293 === undefined || data.otherTime_293 === null) {
                data.otherTime_293 = '00:00'
            }
            if (data.Mc_breakdown_293 === undefined || data.Mc_breakdown_293 === null) {
                data.Mc_breakdown_293 = '00:00'
            }
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_133, data.Mc_on_133) -
                (timeToMilliseconds(data.Mc_breakdown_133) + timeToMilliseconds(data.otherTime_133))
            const runtime2 = CalculatemachineOnOffTime(data.Mc_off_331, data.Mc_on_331) -
                (timeToMilliseconds(data.Mc_breakdown_331) + timeToMilliseconds(data.otherTime_331))
            const runtime3 = CalculatemachineOnOffTime(data.Mc_off_292, data.Mc_on_292) -
                (timeToMilliseconds(data.Mc_breakdown_292) + timeToMilliseconds(data.otherTime_292))
            const runtime4 = CalculatemachineOnOffTime(data.Mc_off_293, data.Mc_on_293) -
                (timeToMilliseconds(data.Mc_breakdown_293) + timeToMilliseconds(data.otherTime_293))
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine 133 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine 331 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine 292 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime4 < 0) {
                res.status(500).json({ message: "Machine 293 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);
            const Mc_runTime4 = millisecondsToTime(runtime4);
            //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
         
            if((parseFloat(data.rcv_wholespeel)+parseFloat(data.rcv_wholesunpeel))< (parseFloat(data.issue_pw_w)
                +parseFloat(data.issue_w_lot)
                +parseFloat(data.issue_ww)
                +parseFloat(data.issue_rejection)
                +parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_LW)
                +parseFloat(data.issue_JB)
               ))
            {
                console.log(parseFloat(data.issue_pw_w)
                +parseFloat(data.issue_w_lot)
                +parseFloat(data.issue_ww)
                +parseFloat(data.issue_rejection)
                +parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_LW)
                +parseFloat(data.issue_JB))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
           
            
            await MayurEdit.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                  
                    rcv_wholespeel: data.rcv_wholespeel,
                    rcv_wholesunpeel: data.rcv_wholesunpeel,
                    Mc_on_133: data.Mc_on_133,
                    Mc_off_133: data.Mc_off_133,
                    Mc_breakdown_133: data.Mc_breakdown_133,
                    Mc_runTime_133: Mc_runTime1,
                    Mc_on_331: data.Mc_on_331,
                    Mc_off_331: data.Mc_off_331,
                    Mc_breakdown_331: data.Mc_breakdown_331,
                    Mc_runTime_331: Mc_runTime2,
                    Mc_on_292: data.Mc_on_292,
                    Mc_off_292: data.Mc_off_292,
                    Mc_breakdown_292: data.Mc_breakdown_292,
                    Mc_runTime_292: Mc_runTime3,
                    Mc_on_293: data.Mc_on_293,
                    Mc_off_293: data.Mc_off_293,
                    Mc_breakdown_293: data.Mc_breakdown_293,
                    Mc_runTime_293: Mc_runTime4,
                    otherTime_133: data.otherTime_133,
                    otherTime_331: data.otherTime_331,
                    otherTime_292: data.otherTime_292,
                    otherTime_293: data.otherTime_293,
                    noOfdayOperators:data.dayoperator,
                    noOfnightOperators:data.nightoperator,
                    
                    issue_pw_w: data.issue_pw_w,
                    issue_w_lot:data.issue_w_lot,
                    issue_ww: data.issue_ww,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_LW: data.issue_LW,
                    issue_JB: data.issue_JB,
                  
                    entry_backlog:(parseFloat(data.rcv_wholespeel)+parseFloat(data.rcv_wholesunpeel))- (parseFloat(data.issue_pw_w)
                    +parseFloat(data.issue_w_lot)
                    +parseFloat(data.issue_ww)
                    +parseFloat(data.issue_rejection)
                    +parseFloat(data.issue_village)
                    +parseFloat(data.issue_bigTaiho)
                    +parseFloat(data.issue_LW)
                    +parseFloat(data.issue_JB)
                   ),
                   current_backlog:(parseFloat(data.rcv_wholespeel)+parseFloat(data.rcv_wholesunpeel)+(data.rcv_DPDS? parseFloat(data.rcv_DPDS):0)+
                   (data.rcv_sorting?parseFloat(data.rcv_sorting):0)+(data.rcv_village?parseFloat(data.rcv_village):0))- (parseFloat(data.issue_pw_w)
                   +parseFloat(data.issue_w_lot)
                   +parseFloat(data.issue_ww)
                   +parseFloat(data.issue_rejection)
                   +parseFloat(data.issue_village)
                   +parseFloat(data.issue_bigTaiho)
                   +parseFloat(data.issue_LW)
                   +parseFloat(data.issue_JB)
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
           const lotupdate= await Mayur.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    const data = await WhatsappMsg("Mayur", feeledBy,"modify_request","Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of Mayur Entry Raised successfully" });
               
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

export const approveMayur = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await MayurEdit.findOne({
            where: {
                id
            }
        }) as any;
        if (!data) {
            return res.status(400).json({ message: "Peeling Entry not found" });
        }
        const bormaEdit = await Mayur.update({
            date:data.date,
            Mc_on_133: data.Mc_on_133,
            Mc_off_133: data.Mc_off_133,
            Mc_breakdown_133: data.Mc_breakdown_133,
            Mc_runTime_133: data.Mc_runTime_133,
            Mc_on_331: data.Mc_on_331,
            Mc_off_331: data.Mc_off_331,
            Mc_breakdown_331: data.Mc_breakdown_331,
            Mc_runTime_331: data.Mc_runTime_331,
            Mc_on_292: data.Mc_on_292,
            Mc_off_292: data.Mc_off_292,
            Mc_breakdown_292: data.Mc_breakdown_292,
            Mc_runTime_292: data.Mc_runTime_331,
            Mc_on_293: data.Mc_on_293,
            Mc_off_293: data.Mc_off_293,
            Mc_breakdown_293: data.Mc_breakdown_293,
            Mc_runTime_293: data.Mc_runTime_331,
            otherTime_133: data.otherTime_133,
            otherTime_331: data.otherTime_331,
            otherTime_292: data.otherTime_292,
            otherTime_293: data.otherTime_293,
            noOfdayOperators:data.noOfdayOperators,
            noOfnightOperators:data.noOfnightOperators,
            
            issue_pw_w: data.issue_pw_w,
            issue_w_lot:data.issue_w_lot,
            issue_ww: data.issue_ww,
            issue_rejection: data.issue_rejection,
            issue_village: data.issue_village,
            issue_bigTaiho: data.issue_bigTaiho,
            issue_LW: data.issue_LW,
            issue_JB: data.issue_JB,
          
            entry_backlog:data.entry_backlog,
           current_backlog:data.current_backlog,
            CreatedBy: data.CreatedBy,
            editStatus: "Approved",
            modifiedBy:approvedBy,



        }, {
            where: {
                id
            }
        });
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
        if (!bormaEdit) {
            return res.status(400).json({ message: "Mayur Entry is not found" });
        }
        else{
            const bormaEditDelete = await MayurEdit.destroy({
                where: {
                    id
                }
            });
            if (!bormaEditDelete) {
                return res.status(400).json({ message: "Mayur Entry is not found" });
            }
            else{


                // await Mayur.update(
                //     {  
                //         rcv_wholespeel: data.WholesPeel,
                //         rcv_wholesunpeel: data.WholesUnpeel,
                //         current_backlog:parseFloat(data.WholesPeel)+parseFloat(data.WholesUnpeel),
                //     },
                //     {
                //         where: {
                //             LotNo:LotNo,origin:origin,latest:1
                //         }
                //     })
                return res.status(200).json({ message: "Edit Request of Mayur Entry is Approved Successfully" });
            }
        }
        


        

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectMayur = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await Mayur.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Mayur Entry not found" });
        }
        const rcnEdit = await MayurEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Mayur Entry not found" });
        }
        return res.status(200).json({ message: "Mayur Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const SearchRCNMayurMix = async (req: Request, res: Response) => {
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
        
             rcnEntries = await Mayur.findOne({
                attributes: ['rcv_transfer','current_backlog','rcv_wholespeel','rcv_wholesunpeel','rcv_DPDS','rcv_sorting','rcv_village'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}




