
import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import LotNo from "../../model/lotNomodel";
import RcnPeeling from "../../model/peelingModel";
import Mayur from "../../model/mayurModel";
import lotoriginmodel from "../../model/lotoriginModel";
import DPDS from "../../model/dpdsmodel";
import bigTaihoModel from "../../model/bigTaihoModel";
import hamsaModel from "../../model/hamsamodel";
import SortingModel from "../../model/sortingModel";
//import RcnPeeling from "../../model/peelingModel";


const CreateEntirePeel= async (req: Request, res: Response) => {
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
            if (data.otherTime === undefined || data.otherTime === null) {
                data.otherTime = '00:00'
            }
            if (data.Mc_breakdown === undefined || data.Mc_breakdown === null) {
                data.Mc_breakdown = '00:00'
            }
            const runtime = CalculatemachineOnOffTime(data.Mc_off, data.Mc_on) -
                (timeToMilliseconds(data.Mc_breakdown) + timeToMilliseconds(data.otherTime))
            if (runtime < 0) {
                res.status(500).json({ message: "Machine Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            const Mc_runTime = millisecondsToTime(runtime);
            //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
         
            if(parseFloat(data.TotalInput)< (parseFloat(data.WholesPeel)
                +parseFloat(data.WholesUnpeel)
                +parseFloat(data.DP)
                +parseFloat(data.DS)
                +parseFloat(data.DP1)
                +parseFloat(data.JJH)
                +parseFloat(data.SJH)
                +parseFloat(data.SJH1)
                +parseFloat(data.JH1)
                +parseFloat(data.JK_K)
                +parseFloat(data.SP1)
                +parseFloat(data.Husk)
                +parseFloat(data.Rejection)
                +parseFloat(data.UnpeelPiece)
                +parseFloat(data.Big_Taiho)))
               {
                console.log(parseFloat(data.WholesPeel)
            +parseFloat(data.WholesUnpeel)
            +parseFloat(data.DP)
            +parseFloat(data.DS)
            +parseFloat(data.DP1)
            +parseFloat(data.JJH)
            +parseFloat(data.SJH)
            +parseFloat(data.SJH1)
            +parseFloat(data.JH1)
            +parseFloat(data.JK_K)
            +parseFloat(data.SP1)
            +parseFloat(data.Husk)
            +parseFloat(data.Rejection)
            +parseFloat(data.UnpeelPiece)
            +parseFloat(data.Big_Taiho))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
           
            
            const peelingUpdate=await RcnPeeling.update(
                {     
                    date:data.Date,
                    Mc_on: data.Mc_on,
                    Mc_off: data.Mc_off,
                    Mc_breakdown: data.Mc_breakdown,
                    Mc_runTime: Mc_runTime,
                  
                    otherTime: data.otherTime,
                    noOfdayOperators:data.dayoperator,
                    noOfnightOperators:data.nightoperator,
                    noOfhuskOperators:data.huskoperator,
                    WholesPeel: data.WholesPeel,
                    WholesUnpeel:data.WholesUnpeel,
                    DP: data.DP,
                    DS: data.DS,
                    DP1: data.DP1,
                    JJH: data.JJH,
                    SJH: data.SJH,
                    SJH1: data.SJH1,
                    JH1: data.JH1,
                    JK_K: data.JK_K,
                    SP1: data.SP1,
                    Husk:data.Husk,
                    Rejection: data.Rejection,
                    UnpeelPiece:data.UnpeelPiece,
                    Big_Taiho:data.Big_Taiho,
                    NoOfTrolley: data.NoOfTrolley,
                    pressure:data.pressure,
                    moisture: data.moisture,
                    peelingTime: data.peelingTime,
                    difference:parseFloat(data.TotalInput)-
                    (parseFloat(data.WholesPeel)
                    +parseFloat(data.WholesUnpeel)
                    +parseFloat(data.DP)
                    +parseFloat(data.DS)
                    +parseFloat(data.DP1)
                    +parseFloat(data.JJH)
                    +parseFloat(data.SJH)
                    +parseFloat(data.SJH1)
                    +parseFloat(data.JH1)
                    +parseFloat(data.JK_K)
                    +parseFloat(data.SP1)
                    +parseFloat(data.Husk)
                    +parseFloat(data.Rejection)
                    +parseFloat(data.UnpeelPiece)
                    +parseFloat(data.Big_Taiho)),

                    Status: 1,
                    CreatedBy: feeledBy 
                },
                {
                    where: {
                        id: data.id
                    }, transaction
                }
            );
             if(peelingUpdate){
                
                await Mayur.create({
                    LotNo:data.LotNo,
                    origin:data.origin,
                    rcv_wholespeel: data.WholesPeel,
                    rcv_wholesunpeel: data.WholesUnpeel,
                    current_backlog:parseFloat(data.WholesPeel)+parseFloat(data.WholesUnpeel),
                 },{transaction});


                await DPDS.create({
                    LotNo:data.LotNo,
                    origin:data.origin,
                    rcv_dp: data.DP,
                    rcv_ds: data.DS,
                    rcv_dp1: data.DP1,
                    current_backlog:parseFloat(data.DP)+parseFloat(data.DS)+parseFloat(data.DP1),
                 },{transaction});

                 await bigTaihoModel.create({
                  
                    LotNo:data.LotNo,
                    origin:data.origin,
                    rcv_peeling: data.Big_Taiho,
                    current_backlog:data.Big_Taiho,
                 },{transaction});


                 await SortingModel.create({           
                    LotNo:data.LotNo,
                    origin:data.origin,
                    rcv_jjh: data.JJH,
                    rcv_sjh: data.SJH,
                    rcv_sjh1: data.SJH1,
                    rcv_jh1: data.JH1,
                    rcv_jk_k: data.JK_K,
                    rcv_sp1: data.SP1,
                    current_backlog:parseFloat(data.JJH)+parseFloat(data.SJH)+parseFloat(data.SJH1)
                    +parseFloat(data.JH1)+parseFloat(data.JK_K)+parseFloat(data.SP1),
                 },{transaction});


                 await hamsaModel.create({
                  
                    LotNo:data.LotNo,
                    origin:data.origin,
                    
                    current_backlog:0,
                 },{transaction});

                await lotoriginmodel.create({              
                    LotNo:LotNO,
                    origin:data.origin,   
                 },{transaction});
             }
           
        }
       
        const lotupdate = await LotNo.update(
            { 
              modifiedBy:'Peeling'
            },
            {
                where: {
                    lotNo:LotNO
                },transaction
            }
        );
        if(lotupdate){
            res.status(200).json({ message: "Peeling Entry Made Successfully" });
        }
        else{
            console.log('No Need For Update')
        }


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating Peeling Entry" ,error});
        }
    }
    


}


export default CreateEntirePeel;