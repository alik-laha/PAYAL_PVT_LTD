import { Request, Response } from "express";


import Mayur from "../../model/mayurModel";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import MayurEdit from "../../model/mayureditModel";
//import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import mixingModel from "../../model/mixingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import hamsaModel from "../../model/hamsamodel";
import WholesModel from "../../model/wholesModel";
import rejectionModel from "../../model/rejectionModel";
import LWModel from "../../model/lowerGradeModel";
import villageProduction from "../../model/villageProductionModel";
import VLotNo from "../../model/vlotNomodel";


export const findEditMayurAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await MayurEdit.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditaScoopingAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error });
    }
}

export const getMayurLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await Mayur.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog','rcv_wholespeel','rcv_wholesunpeel','rcv_DPDS'],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un Mayur Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Mayur Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const getMayurBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await Mayur.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un Mayur Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Mayur Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const getMayurBylotoriginMix = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await Mayur.findOne({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un Mayur Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Mayur Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const CreateEntireMayur= async (req: Request, res: Response) => {
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
         
            if ((Number((
                parseFloat(data.rcv_wholespeel) +
                parseFloat(data.rcv_wholesunpeel) +
                (data.rcv_DPDS ? parseFloat(data.rcv_DPDS) : 0) +
                (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0) +
                (data.rcv_village ? parseFloat(data.rcv_village) : 0)
            ).toFixed(2))) < (Number((
                parseFloat(data.issue_pw_w) +
                parseFloat(data.issue_w_lot) +
                parseFloat(data.issue_ww) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_bigTaiho) +
                parseFloat(data.issue_LW) +
                parseFloat(data.issue_JB)
            ).toFixed(2))))
               {
                console.log(Number((
                parseFloat(data.issue_pw_w) +
                parseFloat(data.issue_w_lot) +
                parseFloat(data.issue_ww) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_bigTaiho) +
                parseFloat(data.issue_LW) +
                parseFloat(data.issue_JB)
            ).toFixed(2)))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
           
            
            const mayurUpdate = await Mayur.update(
                {
                    date: data.Date,
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
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,

                    issue_pw_w: data.issue_pw_w,
                    issue_w_lot: data.issue_w_lot,
                    issue_ww: data.issue_ww,
                    issue_rejection: data.issue_rejection,
                    issue_village: data.issue_village,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_LW: data.issue_LW,
                    issue_JB: data.issue_JB,

                  
                    current_backlog: (parseFloat(data.rcv_wholespeel) + parseFloat(data.rcv_wholesunpeel) + (data.rcv_DPDS ? parseFloat(data.rcv_DPDS) : 0) +
                        (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0) + (data.rcv_village ? parseFloat(data.rcv_village) : 0)
                   ) - (parseFloat(data.issue_pw_w)
                            + parseFloat(data.issue_w_lot)
                            + parseFloat(data.issue_ww)
                            + parseFloat(data.issue_rejection)
                            + parseFloat(data.issue_village)
                            + parseFloat(data.issue_bigTaiho)
                            + parseFloat(data.issue_LW)
                            + parseFloat(data.issue_JB)
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
            if (mayurUpdate) {

                //1. BigTaiho Out//

                const bigT_backlog = await bigTaihoModel.findOne({
                    attributes: ['current_backlog','rcv_mayur'],
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
                        fromSection:'Mayur',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy
                     },{transaction});
                     if(bigT_backlog.dataValues.rcv_mayur){
                        await bigTaihoModel.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_bigTaiho}`),
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
                                rcv_mayur:data.issue_bigTaiho,
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

                //2. Rejection Out//

                const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_mayur'],
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
                        fromSection:'Mayur',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_mayur){
                        await rejectionModel.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_rejection}`),
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
                                rcv_mayur:data.issue_rejection,
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

                //3. Wholes out//

                const wholes_backlog = await WholesModel.findOne({
                    attributes: ['current_backlog','rcv_jb_mayur'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(wholes_backlog)
                if (wholes_backlog && wholes_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_JB,
                        issueid:1,
                        date:data.Date,
                        fromSection:'Mayur',
                        toSection:'Wholes',
                        toSectionBeforeBacklog:wholes_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(wholes_backlog.dataValues.current_backlog)+parseFloat(data.issue_JB),
                        createdBy: feeledBy
                     },{transaction});
                     if(wholes_backlog.dataValues.rcv_jb_mayur){
                        await WholesModel.update(
                            { 
                                rcv_jb_mayur:sequelize.literal(`rcv_jb_mayur+ ${data.issue_JB}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_JB}`)
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
                        await WholesModel.update(
                            { 
                                rcv_jb_mayur:data.issue_JB,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_JB}`)
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
                    res.status(500).json({ message: "Error In Creating Wholes Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                //4. Hamsa Out//

                const hamsa_backlog = await hamsaModel.findOne({
                    attributes: ['current_backlog'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(hamsa_backlog)
                if (hamsa_backlog && hamsa_backlog.dataValues.current_backlog>=0){ 
                    
                        await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:parseFloat(data.issue_pw_w)
                        +parseFloat(data.issue_w_lot)
                        +parseFloat(data.issue_ww),
                        issueid:1,
                        date:data.Date,
                        fromSection:'Mayur',
                        toSection:'Hamsa',
                        toSectionBeforeBacklog:hamsa_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(hamsa_backlog.dataValues.current_backlog)+parseFloat(data.issue_pw_w)
                        +parseFloat(data.issue_w_lot)
                        +parseFloat(data.issue_ww),
                        createdBy: feeledBy
                        },{transaction});
                        await hamsaModel.update(
                            { 
                                rcv_pw_w:data.issue_pw_w,
                                rcv_w_lot:data.issue_w_lot,
                                rcv_ww:data.issue_ww,
                                current_backlog:sequelize.literal(`current_backlog+ ${parseFloat(data.issue_pw_w)+parseFloat(data.issue_w_lot)+parseFloat(data.issue_ww)}`)
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
                    res.status(500).json({ message: "Error In Creating Hamsa Transaction History" });
                    throw new Error('Transaction Aborted')
                } 


                 //5. LW Out//

                 const LW_backlog = await LWModel.findOne({
                    attributes: ['current_backlog','rcv_mayur'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(LW_backlog)
                if (LW_backlog && LW_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_LW,
                        issueid:1,
                        date:data.Date,
                        fromSection:'Mayur',
                        toSection:'LW',
                        toSectionBeforeBacklog:LW_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(LW_backlog.dataValues.current_backlog)+parseFloat(data.issue_LW),
                        createdBy: feeledBy
                     },{transaction});
                     if(LW_backlog.dataValues.rcv_mayur){
                        await LWModel.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_LW}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_LW}`)
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
                        await LWModel.update(
                            { 
                                rcv_mayur:data.issue_LW,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_LW}`)
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
                    res.status(500).json({ message: "Error In Creating LW Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                //6. Village Out//

                const vil_backlog = await villageProduction.findOne({
                    attributes: ['current_backlog','rcv_mayur'],
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
                        fromSection:'Mayur',
                        toSection:'Village',
                        toSectionBeforeBacklog:vil_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(vil_backlog.dataValues.current_backlog)+parseFloat(data.issue_village),
                        createdBy: feeledBy
                     },{transaction});
                     if(vil_backlog.dataValues.rcv_mayur){
                        await villageProduction.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_village}`),
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
                                rcv_mayur:data.issue_village,
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
                        latest_section: 'Mayur',
                        mayurStatus: 1
                    },
                    {
                        where: {
                            lotNo: LotNO,
                            origin: data.origin
                        }, transaction
                    }
                );
                if (lotupdate && lotoriginupdate) {
                    res.status(200).json({ message: "Mayur Entry Made Successfully" });
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
            return res.status(500).json({ message: "Error while creating Mayur Entry" ,error});
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
         
            if(Number(parseFloat(data.rcv_peeling).toFixed(2))< (Number((
                parseFloat(data.issue_pw_w) +
                parseFloat(data.issue_w_lot) +
                parseFloat(data.issue_ww) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_bigTaiho) +
                parseFloat(data.issue_LW) +
                parseFloat(data.issue_JB)
            ).toFixed(2))))
               {
                console.log(Number((parseFloat(data.issue_pw_w)
                +parseFloat(data.issue_w_lot)
                +parseFloat(data.issue_ww)
                +parseFloat(data.issue_rejection)
                +parseFloat(data.issue_village)
                +parseFloat(data.issue_bigTaiho)
                +parseFloat(data.issue_LW)
                +parseFloat(data.issue_JB)).toFixed(2)))
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

                    //1.BigTaiho Reissue //
                    const bigT_backlog = await bigTaihoModel.findOne({
                        attributes: ['current_backlog','rcv_mayur'],
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
                        fromSection:'Mayur',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy,
                        issueid:parseInt(data.alt_id)+1,
                        },{transaction});
                        if(bigT_backlog.dataValues.rcv_mayur)
                            {
                        await bigTaihoModel.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_bigTaiho}`),
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
                                rcv_mayur:data.issue_bigTaiho,
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

                    //2. Rejection Re-Issue//

                    const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_mayur','issue_add_8'],
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
                        fromSection:'Mayur',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_mayur){
                        await rejectionModel.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_rejection}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`),                
                                issue_add_8:rejection_backlog.dataValues.issue_add_8 ?
                                sequelize.literal(`issue_add_8+ ${data.issue_rejection}`):rejection_backlog.dataValues.issue_add_8,
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
                                rcv_mayur:data.issue_rejection,
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

                    //3. Wholes Re-Issue //

                    const wholes_backlog = await WholesModel.findOne({
                        attributes: ['current_backlog','rcv_jb_mayur','issue_add_1'],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(wholes_backlog)
                    if (wholes_backlog && wholes_backlog.dataValues.current_backlog>=0)
                    {
                        await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_JB,
                        date:data.Date,
                        fromSection:'Mayur',
                        toSection:'Wholes',
                        toSectionBeforeBacklog:wholes_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(wholes_backlog.dataValues.current_backlog)+parseFloat(data.issue_JB),
                        createdBy: feeledBy,
                        issueid:parseInt(data.alt_id)+1,
                        },{transaction});
                        if(wholes_backlog.dataValues.rcv_jb_mayur)
                            {
                        await WholesModel.update(
                            { 
                                rcv_jb_mayur:sequelize.literal(`rcv_jb_mayur+ ${data.issue_JB}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_JB}`),
                                issue_add_1: wholes_backlog.dataValues.issue_add_1 ?sequelize.literal(`issue_add_1+ ${data.issue_JB}`):wholes_backlog.dataValues.issue_add_1,
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
                        await WholesModel.update(
                            { 
                                rcv_jb_mayur:data.issue_JB,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_JB}`),
                    
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
                        res.status(500).json({ message: "Error In Creating Reissue Wholes Transaction History" });
                        throw new Error('Transaction Aborted')
                    } 

                    //4. Hamsa Re-Issue //

                    const hamsa_backlog = await hamsaModel.findOne({
                    attributes: ['current_backlog','rcv_pw_w','rcv_w_lot','rcv_ww'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                    });
                    console.log(hamsa_backlog)
                    if (hamsa_backlog && hamsa_backlog.dataValues.current_backlog>=0)
                    {  
                        await sectionTransfer.create({              
                            LotNo:LotNO,
                            origin:data.origin,
                            amount:parseFloat(data.issue_pw_w)
                            +parseFloat(data.issue_w_lot)
                            +parseFloat(data.issue_ww),
                            issueid:parseInt(data.alt_id)+1,
                            date:data.Date,
                            fromSection:'Mayur',
                            toSection:'Hamsa',
                            toSectionBeforeBacklog:hamsa_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog:parseFloat(hamsa_backlog.dataValues.current_backlog)+parseFloat(data.issue_pw_w)
                            +parseFloat(data.issue_w_lot)
                            +parseFloat(data.issue_ww),
                            createdBy: feeledBy
                         },{transaction});
                        if(hamsa_backlog.dataValues.rcv_pw_w && hamsa_backlog.dataValues.rcv_w_lot && hamsa_backlog.dataValues.rcv_ww)
                        {
                              
                            await hamsaModel.update(
                                { 
                                    rcv_pw_w:sequelize.literal(`rcv_pw_w+ ${data.issue_pw_w}`),
                                    rcv_w_lot:sequelize.literal(`rcv_w_lot+ ${data.issue_w_lot}`),
                                    rcv_ww:sequelize.literal(`rcv_ww+ ${data.issue_ww}`),
                                    current_backlog:sequelize.literal(`current_backlog+ ${parseFloat(data.issue_pw_w)+parseFloat(data.issue_w_lot)+parseFloat(data.issue_ww)}`)
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
                            await hamsaModel.update(
                                { 
                                    rcv_pw_w:data.issue_pw_w,
                                    rcv_w_lot:data.issue_w_lot,
                                    rcv_ww:data.issue_ww,
                                    current_backlog:sequelize.literal(`current_backlog+ ${parseFloat(data.issue_pw_w)+parseFloat(data.issue_w_lot)+parseFloat(data.issue_ww)}`)
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
                    res.status(500).json({ message: "Error In Creating Hamsa Entry" });
                    throw new Error('Transaction Aborted')
                    } 

                     //5. LW Re-Issue//

                    const LW_backlog = await LWModel.findOne({
                    attributes: ['current_backlog','rcv_mayur','issue_add_7'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                    });
                    console.log(LW_backlog)
                    if (LW_backlog && LW_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_LW,
                        issueid:parseInt(data.alt_id)+1,
                        date:data.Date,
                        fromSection:'Mayur',
                        toSection:'LW',
                        toSectionBeforeBacklog:LW_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(LW_backlog.dataValues.current_backlog)+parseFloat(data.issue_LW),
                        createdBy: feeledBy
                     },{transaction});
                     if(LW_backlog.dataValues.rcv_mayur){
                        await LWModel.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_LW}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_LW}`),
                                issue_add_7: LW_backlog.dataValues.issue_add_7 ?sequelize.literal(`issue_add_7+ ${data.issue_LW}`):LW_backlog.dataValues.issue_add_7,
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
                        await LWModel.update(
                            { 
                                rcv_mayur:data.issue_LW,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_LW}`)
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
                    res.status(500).json({ message: "Error In Creating LW Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                //6. Village Re-Issue//

                const vil_backlog = await villageProduction.findOne({
                    attributes: ['current_backlog','rcv_mayur','issue_add_11'],
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
                        fromSection:'Mayur',
                        toSection:'Village',
                        toSectionBeforeBacklog:vil_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(vil_backlog.dataValues.current_backlog)+parseFloat(data.issue_village),
                        createdBy: feeledBy
                     },{transaction});
                     if(vil_backlog.dataValues.rcv_mayur){
                        await villageProduction.update(
                            { 
                                rcv_mayur:sequelize.literal(`rcv_mayur+ ${data.issue_village}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`),
                                issue_add_11:vil_backlog.dataValues.issue_add_11 ?sequelize.literal(`issue_add_11+ ${data.issue_village}`):vil_backlog.dataValues.issue_add_11
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
                                rcv_mayur:data.issue_village,
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

                    const lotupdate = await await lotoriginmodel.update(
                        { 
                           latest_section: 'Mayur'
                        },
                        {
                            where: {
                                lotNo:LotNO,
                                origin:data.origin
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
export const sumOfallMayur = async (req: Request, res: Response) => {

    
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

        const data = await Mayur.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_pw_w')), 'issue_pw_w'],
                [sequelize.fn('sum', sequelize.col('issue_w_lot')), 'issue_w_lot'],
                [sequelize.fn('sum', sequelize.col('issue_ww')), 'issue_ww'],
                [sequelize.fn('sum', sequelize.col('issue_rejection')), 'issue_rejection'],
                [sequelize.fn('sum', sequelize.col('issue_village')), 'issue_village'],
                [sequelize.fn('sum', sequelize.col('issue_bigTaiho')), 'issue_bigTaiho'],
                [sequelize.fn('sum', sequelize.col('issue_LW')), 'issue_LW'],
                [sequelize.fn('sum', sequelize.col('issue_JB')), 'issue_JB'],
               
              
               
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
        const Sumdata = await Mayur.findAll({
            attributes: [
       
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
              
               
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], date: {
                    [Op.between]: [targetDate, today]
                },latest:1
            }
        });
        const EditData = await MayurEdit.count()
        const PendingData = await Mayur.count({where: { [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest: 1,current_backlog: {
                    [Op.gt]: 0
                },date: {
                    [Op.ne]: null }}} )
        
        if (data && Sumdata) {
            return res.status(200).json({ data, EditData,Sumdata,PendingData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const SearchRCNMayur = async (req: Request, res: Response) => {
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
         
            if ((Number((
                parseFloat(data.rcv_wholespeel) +
                parseFloat(data.rcv_wholesunpeel) +
                (data.rcv_DPDS ? parseFloat(data.rcv_DPDS) : 0) +
                (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0) +
                (data.rcv_village ? parseFloat(data.rcv_village) : 0)
            ).toFixed(2))) < (Number((
                parseFloat(data.issue_pw_w) +
                parseFloat(data.issue_w_lot) +
                parseFloat(data.issue_ww) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_bigTaiho) +
                parseFloat(data.issue_LW) +
                parseFloat(data.issue_JB)
            ).toFixed(2))))
               {
                console.log(Number((
                parseFloat(data.issue_pw_w) +
                parseFloat(data.issue_w_lot) +
                parseFloat(data.issue_ww) +
                parseFloat(data.issue_rejection) +
                parseFloat(data.issue_village) +
                parseFloat(data.issue_bigTaiho) +
                parseFloat(data.issue_LW) +
                parseFloat(data.issue_JB)
            ).toFixed(2)))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
           
            
            await MayurEdit.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    altid:data.alt_id,
                    rcv_DPDS:data.rcv_DPDS,
                    rcv_sorting:data.rcv_sorting,
                    rcv_village:data.rcv_village,
                    origin:data.origin,
                    mixingLot:data.mixingLot,
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
                   
                    //const data = await WhatsappMsg("Mayur", feeledBy,"modify_request","Production")
                    //console.log(data)
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
            return res.status(400).json({ message: "Mayur Edit Entry not found" });
        }
        else{
            const transferBigTaihodata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Mayur',
                    toSection:'BigTaiho'
                }
            }) as any


            const transferRejectiondata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Mayur',
                    toSection:'Rejection'
                }
            }) as any


            const transferWholesdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Mayur',
                    toSection:'Wholes'
                }
            }) as any


            const transferHamsadata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Mayur',
                    toSection:'Hamsa'
                }
            }) as any

            const transferLWdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Mayur',
                    toSection:'LW'
                }
            }) as any

            const transferVildata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Mayur',
                    toSection:'Village'
                }
            }) as any

            if(transferBigTaihodata && transferWholesdata && transferHamsadata 
                && transferRejectiondata && transferLWdata && transferVildata){
                await sequelize.transaction(async (transaction: any) => {

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
                      
                     
                       current_backlog:data.current_backlog,
                        CreatedBy: data.CreatedBy,
                        editStatus: "Approved",
                        modifiedBy:approvedBy,
            
            
            
                    }, {
                        where: {
                            id
                        }
                    });
                    if(bormaEdit){  
                        //
                        // console.log(transferBigTaihodata)
                        if(parseFloat(transferBigTaihodata.amount)!==parseFloat(data.issue_bigTaiho)){
                            console.log('Needs Update In bigTaiho')
                            const difference_bigT=parseFloat(data.issue_bigTaiho)-parseFloat(transferBigTaihodata.amount)
                            console.log(difference_bigT)
                            const backlog = await bigTaihoModel.findOne({
                                attributes: ['current_backlog','rcv_mayur'],
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
                                        rcv_mayur: sequelize.literal(`rcv_mayur+ ${difference_bigT}`),
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

                        if(parseFloat(transferRejectiondata.amount)!==parseFloat(data.issue_rejection)){
                            console.log('Needs Update In Rejection')
                            const difference_rejection=parseFloat(data.issue_rejection)-parseFloat(transferRejectiondata.amount)
                            console.log(difference_rejection)
                            const backlog = await rejectionModel.findOne({
                                attributes: ['current_backlog','rcv_mayur','issue_add_8'],
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
                                        rcv_mayur: sequelize.literal(`rcv_mayur+ ${difference_rejection}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_rejection}`),
                                        issue_add_8: backlog.dataValues.issue_add_8 ?
                                        sequelize.literal(`issue_add_8+ ${difference_rejection}`)
                                        :backlog.dataValues.issue_add_8,
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

                        if(parseFloat(transferWholesdata.amount)!==parseFloat(data.issue_JB)){
                            console.log('Needs Update In Wholes')
                            const difference_Wholes=parseFloat(data.issue_JB)-parseFloat(transferWholesdata.amount)
                            console.log(difference_Wholes)
                            const backlog = await WholesModel.findOne({
                                attributes: ['current_backlog','rcv_jb_mayur','issue_add_1'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await WholesModel.update(
                                    {
                                        rcv_jb_mayur: sequelize.literal(`rcv_jb_mayur+ ${difference_Wholes}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_Wholes}`),
                                        issue_add_1: backlog.dataValues.issue_add_1?
                                        sequelize.literal(`issue_add_1+ ${difference_Wholes}`):backlog.dataValues.issue_add_1,
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
                                    amount:data.issue_JB,
                                    toSectionBeforeBacklog:transferWholesdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferWholesdata.toSectionBeforeBacklog)+parseFloat(data.issue_JB)
                        
                                }, {
                                    where: {
                                        id:transferWholesdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Wholes Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferHamsadata.amount)!==(parseFloat(data.issue_w_lot)+parseFloat(data.issue_pw_w)+parseFloat(data.issue_ww))){
                            console.log('Needs Update In Hamsa')
                            const difference_total_Hamsa=(parseFloat(data.issue_w_lot)+parseFloat(data.issue_pw_w)+parseFloat(data.issue_ww))-parseFloat(transferWholesdata.amount)
                            console.log(difference_total_Hamsa)
                            const backlog = await hamsaModel.findOne({
                                attributes: ['current_backlog'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await hamsaModel.update(
                                    {
                                        rcv_pw_w:data.issue_pw_w,
                                        rcv_w_lot:data.issue_w_lot,
                                        rcv_ww:data.issue_ww,
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_total_Hamsa}`)
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
                                    amount:parseFloat(data.issue_w_lot)+parseFloat(data.issue_pw_w)+parseFloat(data.issue_ww),
                                    toSectionBeforeBacklog:transferWholesdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferWholesdata.toSectionBeforeBacklog)
                                    +parseFloat(data.issue_w_lot)+parseFloat(data.issue_pw_w)+parseFloat(data.issue_ww)
                        
                                }, {
                                    where: {
                                        id:transferWholesdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Hamsa Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferLWdata.amount)!==parseFloat(data.issue_LW)){
                            console.log('Needs Update In LW')
                            const difference_lw=parseFloat(data.issue_LW)-parseFloat(transferLWdata.amount)
                            console.log(difference_lw)
                            const backlog = await LWModel.findOne({
                                attributes: ['current_backlog','rcv_mayur','issue_add_7'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await LWModel.update(
                                    {
                                        rcv_mayur: sequelize.literal(`rcv_mayur+ ${difference_lw}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_lw}`),
                                        issue_add_7: backlog.dataValues.issue_add_7?sequelize.literal(`issue_add_7+ ${difference_lw}`)
                                        :backlog.dataValues.issue_add_7,
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
                                    amount:data.issue_LW,
                                    toSectionBeforeBacklog:transferLWdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferLWdata.toSectionBeforeBacklog)+parseFloat(data.issue_LW)
                        
                                }, {
                                    where: {
                                        id:transferLWdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated LW Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }
                        
                        if(parseFloat(transferVildata.amount)!==parseFloat(data.issue_village)){
                            console.log('Needs Update In Village')
                            const difference_vil=parseFloat(data.issue_village)-parseFloat(transferVildata.amount)
                            console.log(difference_vil)
                            const backlog = await villageProduction.findOne({
                                attributes: ['current_backlog','rcv_mayur','issue_add_11'],
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
                                        rcv_mayur: sequelize.literal(`rcv_mayur+ ${difference_vil}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_vil}`),
                                        issue_add_11: backlog.dataValues.issue_add_11?
                                         sequelize.literal(`issue_add_11+ ${difference_vil}`):backlog.dataValues.issue_add_11
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
                                }
                            }
                        );
                        await MayurEdit.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of Mayur Entry is Approved Successfully" });
                    }
                    
                })
            }
            else{
                return res.status(400).json({ message: "Mayur Transfer Entry is not found" });
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
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;


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
                attributes: ['id','rcv_transfer','current_backlog','rcv_wholespeel','rcv_wholesunpeel','rcv_DPDS','rcv_sorting','rcv_village','editStatus'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const SearchHistory = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin,section} = req.body;
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
        if (section) {
            whereClause.push({
                toSection: {
                    [Op.like]: `%${section}%`
                }
            });
        }

        whereClause.push({
            amount: {
                    [Op.gt]: 0
                }
        });
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await sectionTransfer.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['issueid','ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await sectionTransfer.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['issueid','ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'History found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}
export const SearchMixHistory = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin,section} = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                FromLotNo: {
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
                Fromorigin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }
        if (section) {
            whereClause.push({
                Section: {
                    [Op.like]: `%${section}%`
                }
            });
        }
  
        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if(limit===0 && offset===0){
             rcnEntries = await mixingModel.findAll({
                where,
                order: [['date','DESC'],['FromLotNo','ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await mixingModel.findAll({
                where,
                order: [['date','DESC'],['FromLotNo','ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Mixing History found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const CreateMix = async (req: Request, res: Response) => {

        try{
            const createdBy = req.cookies.user;
            const sourceid= req.body.fsourceid;
            const sourcelot= req.body.fsourcelot;
            const sourceorigin= req.body.fsourceorigin;
            const source_rcv_wholepeel= req.body.fsourcercv_wholespeel;
            const source_rcv_wholeunpeel= req.body.fsourcercv_wholesunpeel;
            const source_dpds= req.body.fsourcercv_DPDS;
            const source_village= req.body.fsourcercv_village;
            const source_sorting= req.body.fsourcercv_sorting;
            const source_backlog= req.body.fsourcebacklog;

            const transfer_amount =req.body.amount

            const destid= req.body.destid;
            const destlot= req.body.destlot;
            const destorigin= req.body.destorigin;
            const dest_rcv_wholepeel= req.body.destrcv_wholespeel;
            const dest_rcv_wholeunpeel= req.body.destrcv_wholesunpeel;
            const dest_dpds= req.body.destrcv_DPDS;
            const dest_village= req.body.destrcv_village;
            const dest_sorting= req.body.destrcv_sorting;
            const dest_backlog= req.body.destbacklog;

            const b_soucre_backlog= req.body.bsourcebacklog;
            const b_dest_backlog= req.body.bdestbacklog;


            await sequelize.transaction(async (transaction: any) => {
   
                const sourceupdate=await Mayur.update(
                    { 
                        rcv_wholespeel: source_rcv_wholepeel,
                        rcv_wholesunpeel: source_rcv_wholeunpeel,
                        rcv_DPDS:source_dpds,
                        rcv_sorting:source_sorting,
                        rcv_village:source_village,
                        current_backlog:source_backlog,                   
                    },
                    {
                        where: {
                            id:sourceid
                        }, transaction
                    }
                );
                const destdata=await Mayur.findOne({
                    attributes: ['mixingLot'],
                    where: {
                        id:destid
            
                    },
            
                });
                if (destdata && destdata.dataValues.mixingLot){
                    const destupdate=await Mayur.update(
                        { 
                            rcv_wholespeel: dest_rcv_wholepeel,
                            rcv_wholesunpeel: dest_rcv_wholeunpeel,
                            rcv_DPDS:dest_dpds,
                            rcv_sorting:dest_sorting,
                            rcv_village:dest_village,
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
                                Section:'Mayur',
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
                    const destupdate=await Mayur.update(
                        { 
                            rcv_wholespeel: dest_rcv_wholepeel,
                            rcv_wholesunpeel: dest_rcv_wholeunpeel,
                            rcv_DPDS:dest_dpds,
                            rcv_sorting:dest_sorting,
                            rcv_village:dest_village,
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
                                Section:'Mayur',
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

