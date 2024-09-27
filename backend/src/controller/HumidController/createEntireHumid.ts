
import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import LotNo from "../../model/lotNomodel";
import Humidifier from "../../model/humidfierModel";
//import RcnPeeling from "../../model/peelingModel";


const CreateEntireHumid= async (req: Request, res: Response) => {
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
            if((parseFloat(data.TotalInput)>parseFloat(data.TotalOutput))
                ||parseFloat(data.InputMoisture)>parseFloat(data.OutputMoisture)){
                res.status(500).json({ message: "Output can't be Lower Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            let prcntg:number=0
            if(data.OutputMoisture && data.InputMoisture){
                 prcntg=(((parseFloat(data.OutputMoisture)-parseFloat(data.InputMoisture))/parseFloat(data.InputMoisture))*100)
            }
            
            const humidUpdate=await Humidifier.update(
                {     
                    date:data.Date,
                    Mc_on: data.Mc_on,
                    Mc_off: data.Mc_off,
                    Mc_breakdown: data.Mc_breakdown,
                    Mc_runTime: Mc_runTime,
                    noOfOperators:data.operator,
                    otherTime: data.otherTime,
                    OutputMoisture: data.OutputMoisture,
                    TotalOutput: data.TotalOutput,
                    MoistGain: prcntg,
                    Status: 1,
                    CreatedBy: feeledBy 
                },
                {
                    where: {
                        id: data.id
                    }, transaction
                }
            );
            if(humidUpdate){
                
                // await RcnPeeling.create({
                //     id:data.id,
                //     LotNo:data.LotNo,
                //     origin:data.origin,
                //     InputMoisture:data.OutputMoisture,
                //     TotalInput: data.TotalOutput,
                //     NoOfTrolley: data.NoOfTrolley,

                // },{transaction});
            }
           
        }
       
        const lotupdate = await LotNo.update(
            { 
              modifiedBy:'Humidifier'
            },
            {
                where: {
                    lotNo:LotNO
                },transaction
            }
        );
        if(lotupdate){
            res.status(200).json({ message: "Humidification Entry Made Successfully" });
        }
        else{
            console.log('No Need For Update')
        }


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating Humidification Entry" ,error});
        }
    }
    


}


export default CreateEntireHumid;