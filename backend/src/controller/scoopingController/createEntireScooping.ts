
import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import RcnScooping from "../../model/scoopingModel";
import RcnAllScooping from "../../model/scoopingAllmodel";
import RcnBorma from "../../model/bormaModel";

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
    const feeledBy = req.cookies.user;
    const linescoop = req.body.linescoop
    const lotscoop = req.body.lotscoop
    const updatescoop = req.body.updatescoop

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
                ((data.Receiving_Qty ? parseFloat(data.Receiving_Qty) : 0 +
                    data.Opening_Qty ? parseFloat(data.Opening_Qty) : 0)
                    - (data.Uncut ? parseFloat(data.Uncut) : 0 + data.Unscoop ? parseFloat(data.Unscoop) : 0 +
                        data.NonCut ? parseFloat(data.NonCut) : 0 +
                            data.Dust ? parseFloat(data.Dust) : 0)) / 80
            console.log(total_bag)
            let kor
            if (total_bag === 0) {
                kor = 0
            }
            else {
                kor = ((data.Wholes ? parseFloat(data.Wholes) : 0 + data.Broken ? parseFloat(data.Broken) : 0) / (total_bag * 0.453)).toFixed(2)
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
            let total_bag =
                ((data.Receiving_Qty ? parseFloat(data.Receiving_Qty) : 0 +
                    data.Opening_Qty ? parseFloat(data.Opening_Qty) : 0)
                    - (data.Uncut ? parseFloat(data.Uncut) : 0 + data.Unscoop ? parseFloat(data.Unscoop) : 0 +
                        data.NonCut ? parseFloat(data.NonCut) : 0 +
                            data.Dust ? parseFloat(data.Dust) : 0)) / 80
            console.log(total_bag)
            let kor2
            if (total_bag === 0) {
                kor2 = 0
            }
            else {
                kor2 = ((data.Wholes ? parseFloat(data.Wholes) : 0 + data.Broken ? parseFloat(data.Broken) : 0) / (total_bag * 0.453)).toFixed(2)
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
                    TotBagCutting: total_bag,
                    noOfGents: data.male,
                    noOfLadies: data.female,
                    noOfSupervisors: data.supervisor,
                    noOfEmployees: data.noOfEmployees,
                    noOfOperators: data.noOfOperators,
                    CreatedBy: feeledBy,
                },{transaction}
            );
            if(lotwise){
            const totalInput=data.Wholes?parseFloat(data.Wholes):0 + data.Broken?parseFloat(data.Broken):0
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
         

        }


    })


}


export default CreateEntireScooping;