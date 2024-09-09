
import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import RcnScooping from "../../model/scoopingModel";
import RcnScoopingEdit from "../../model/scoopingEditModel";
import RcnAllEditScooping from "../../model/scoopingAllEditModel";
import RcnAllScooping from "../../model/scoopingAllmodel";
import WhatsappMsg from "../../helper/WhatsappMsg";

const CreateEntireScoopingEdit = async (req: Request, res: Response) => {
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
            if (!data.id) {
                res.status(400).json({ message: "Please Provide the id" });
                throw new Error('Transaction Aborted 1')
            }
            const runtime = CalculatemachineOnOffTime(data.Mc_off, data.Mc_on) -
                (timeToMilliseconds(data.Mc_breakdown) + timeToMilliseconds(data.otherTime))
            if (runtime < 0) {
                res.status(500).json({ message: "Machine Run Time can not be negative" });
                throw new Error('Transaction Aborted 2')
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
            await RcnScoopingEdit.create(
                {
                    id:data.id,
                    Opening_Qty:data.Opening_Qty,
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
                    SizeName: data.SizeName,
                    Size:data.Size,
                    Scooping_Line_Mc:data.Scooping_Line_Mc,
                    LotNo:LotNO,
                    origin:data.origin,
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
                },{transaction}   
            );

        }
        for (let data of lotscoop) {    
            let total_bag2 =
                ((data.Receiving_Qty ? parseFloat(data.Receiving_Qty) : 0 +
                    data.Opening_Qty ? parseFloat(data.Opening_Qty) : 0)
                    - (data.Uncut ? parseFloat(data.Uncut) : 0 + data.Unscoop ? parseFloat(data.Unscoop) : 0 +
                        data.NonCut ? parseFloat(data.NonCut) : 0 +
                            data.Dust ? parseFloat(data.Dust) : 0)) / 80
            console.log(total_bag2)
            let kor2
            if (total_bag2 === 0) {
                kor2 = 0
            }
            else {
                kor2 = ((data.Wholes ? parseFloat(data.Wholes) : 0 + data.Broken ? parseFloat(data.Broken) : 0) / (total_bag2 * 0.453)).toFixed(2)
            }
            await RcnAllEditScooping.create(
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
                    Transfered_Qty: data.Transfered_Qty,
                Transfered_To: data.Transfered_To
                },{transaction}
            );  
        } 
        const lineupdate=await RcnScooping.update(
            {
                editStatus: 'Pending'
            },
            {
                where: {
                    LotNo:LotNO
                },transaction
            }
        );
        const lotupdate=await RcnAllScooping.update(
            {
                editStatus: 'Pending'
            },
            {
                where: {
                    LotNo:LotNO
                },transaction
            }
        );
        if(lineupdate && lotupdate){
            const data = await WhatsappMsg("RCN Scooping", feeledBy,"modify_request","Production")
            console.log(data)
            res.status(200).json({ message: "Scooping Modification Raised Successfully" });
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


export default CreateEntireScoopingEdit;