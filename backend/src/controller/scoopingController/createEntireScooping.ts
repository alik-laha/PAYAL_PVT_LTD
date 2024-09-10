
import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import RcnScooping from "../../model/scoopingModel";
import RcnAllScooping from "../../model/scoopingAllmodel";
import RcnBorma from "../../model/bormaModel";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";

const CreateEntireScooping = async (req: Request, res: Response) => {
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
    const linescoop = req.body.linescoop
    const lotscoop = req.body.lotscoop
    const updatescoop = req.body.updatescoop
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linescoop) 
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
            let total_bag =
            (((parseFloat(data.Receiving_Qty)+parseFloat(data.Opening_Qty))
            -(parseFloat(data.Uncut)+parseFloat(data.Unscoop)+parseFloat(data.NonCut)+parseFloat(data.Dust)))/80)
            console.log(total_bag)
            let kor
            if (total_bag === 0) {
                kor = 0
            }
            else {
                kor = ((parseFloat(data.Wholes) + parseFloat(data.Broken)) / (total_bag * 0.453)).toFixed(2)
            }
            await RcnScooping.update(
                {
                    Receiving_Qty: data.Receiving_Qty,
                    date: data.Date,
                    Wholes: data.Wholes,
                    Broken: data.Broken,
                    Unscoop: data.Unscoop,
                    Uncut: data.Uncut,
                    NonCut: data.NonCut,
                    Rejection: data.Rejection,
                    Dust: data.Dust,
                    KOR: kor,
                    Trolley_Broken: data.Trolley_Broken,
                    Trolley_Small_JB: data.Trolley_Small_JB,
                    scoopStatus: 1,
                    noOfGents: data.male,
                    noOfLadies: data.female,
                    noOfSupervisors: data.supervisor,
                    noOfEmployees: data.noOfEmployees,
                    noOfOperators: data.noOfOperators,
                    CreatedBy: feeledBy,
                    Mc_runTime: Mc_runTime,
                    Brkdwn_reason: data.Brkdwn_reason,
                    Mc_breakdown: data.Mc_breakdown,
                    otherTime: data.otherTime,
                    Mc_on: data.Mc_on,
                    Mc_off: data.Mc_off,
                    Transfered_Qty: data.Transfer_Qty,
                    Transfered_To: data.Transfer_To_MC
                },
                {
                    where: {
                        id: data.id
                    }, transaction
                }
            );

        }
        for (let data of lotscoop) {
            let total_bag2 =
            (((parseFloat(data.Receiving_Qty)+parseFloat(data.Opening_Qty))
            -(parseFloat(data.Uncut)+parseFloat(data.Unscoop)+parseFloat(data.NonCut)+parseFloat(data.Dust)))/80)
            console.log(total_bag2)
            let kor2
            if (total_bag2 === 0) {
                kor2 = 0
            }
            else {
                kor2 = ((parseFloat(data.Wholes) + parseFloat(data.Broken)) / (total_bag2 * 0.453)).toFixed(2)
            }
            const lotwise=await RcnAllScooping.create(
                {
                    LotNo: data.LotNo,
                    origin: data.origin,
                    Opening_Qty: data.Opening_Qty,
                    Receiving_Qty: data.Receiving_Qty,
                    date: data.Date,
                    Wholes: data.Wholes,
                    Broken: data.Broken,
                    Unscoop: data.Unscoop,
                    Uncut: data.Uncut,
                    NonCut: data.NonCut,
                    Rejection: data.Rejection,
                    Dust: data.Dust,
                    KOR: kor2,
                    TotBagCutting: total_bag2,
                    noOfGents: data.male,
                    noOfLadies: data.female,
                    noOfSupervisors: data.supervisor,
                    noOfEmployees: data.noOfEmployees,
                    noOfOperators: data.noOfOperators,
                    CreatedBy: feeledBy,
                },{transaction}
            );
            if(lotwise){
            const totalInput=parseFloat(data.Wholes) + parseFloat(data.Broken)
              await RcnBorma.create({
                    id:lotwise.dataValues.id,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    InputWholes:data.Wholes,
                    InputPieces:data.Broken, 
                    TotalInput:totalInput,
                },{transaction});

            }



        }
        for (let data of updatescoop) {
            const Scooping_Line_Mc=data.Scooping_Line_Mc
            const uncut=data.Uncut ? data.Uncut:0
            const unscoop=data.Unscoop ? data.Unscoop:0
            const noncut=data.NonCut ?data.NonCut:0
            const finalopen=uncut+unscoop+noncut
            console.log(finalopen)
            const LotNo=data.LotNo

            const nextEntry = await RcnScooping.findOne({
                attributes: ['LotNo','scoopStatus','id'],
                where: {
        
                    Scooping_Line_Mc: Scooping_Line_Mc,
                    LotNo: {
                        [Op.gt]: LotNo
                    }
        
                },
                order: [['LotNo', 'ASC']]
        
            });
            console.log(nextEntry)

            if(nextEntry && nextEntry.dataValues.scoopStatus==0)
            {
                let nextid=nextEntry.dataValues.id
                console.log(nextEntry.dataValues.scoopStatus)
                console.log(nextEntry.dataValues.LotNo)
                let linecount = await RcnScooping.count({ where: { LotNo: nextEntry.dataValues.LotNo, Scooping_Line_Mc: Scooping_Line_Mc } })
                console.log(linecount)

                if(linecount>1)
                {
                    const nextEntryid = await RcnScooping.findOne({
                        attributes: ['id'],
                        where: {
        
                            Scooping_Line_Mc: Scooping_Line_Mc,
                            LotNo: nextEntry.dataValues.LotNo,
                            Opening_Qty: {
                                [Op.gt]: 0
                            }
        
                        },
                        order: [['LotNo', 'ASC']]
        
                    });
                    if(nextEntryid)
                    {
                        console.log(nextEntryid.dataValues.id)
                        await RcnScooping.update({
                            Opening_Qty:finalopen
                        }, { where: { id:nextEntryid.dataValues.id },transaction });
                        
                    }
                    else{
                        await RcnScooping.update({
                            Opening_Qty:finalopen
                        }, { where: { id:nextid },transaction });
                        
                    }
                }
                else
                {
                    await RcnScooping.update({
                        Opening_Qty:finalopen
                    }, { where: { id:nextid },transaction });
                }


            }
           else{
            console.log('Nothing To Update or Already Scooping Done')
           }

        }
        
        const lotupdate = await LotNo.update(
            { 
              modifiedBy:'Scooping'
            },
            {
                where: {
                    lotNo:LotNO
                },transaction
            }
        );
        if(lotupdate){
            res.status(200).json({ message: "Scooping Entry Made Successfully" });
        }
        else{
            console.log('No Need For Update')
        }


    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating Scooping Entry" ,error});
        }
    }
    


}


export default CreateEntireScooping;