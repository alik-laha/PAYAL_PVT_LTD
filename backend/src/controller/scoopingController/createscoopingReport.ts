import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

const createscoopingReport = async (req: Request, res: Response) => {

 
        try {
            const id = req.params.id;
   
            let {  Wholes,Broken,Uncut ,Unscoop,NonCut,Rejection,Dust,KOR
                ,Trolley_Broken,Trolley_Small_JB,Mc_on,Mc_off,noOfEmployees,noOfOperators,male,female,Date,supervisor,
                Mc_breakdown,Transfered_to,otherTime,Brkdwn_reason } = req.body.data;
            
             const createdBy = req.cookies.user

             if(otherTime===undefined|| otherTime===null){
                otherTime='00:00'
             }
             if(Mc_breakdown===undefined|| Mc_breakdown===null){
                Mc_breakdown='00:00'
             }
            //const editedBy = "RC User 2"
            if (!id) {
                return res.status(400).json({ message: "Please Provide the id" });
            }


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
            console.log(CalculatemachineOnOffTime(Mc_off, Mc_on))
            if (CalculatemachineOnOffTime(Mc_off, Mc_on) - (timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime)) < 0) {
                return res.status(400).json({ message: "Machine Run Time can not be negative" });
            }
            const Mc_runTime = millisecondsToTime(CalculatemachineOnOffTime(Mc_off, Mc_on) - (timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime)));
            const scoop = await RcnScooping.update(
                {
                    date: Date,
                    Wholes:Wholes,
                    Broken:Broken,
                    Unscoop:Unscoop,
                    Uncut:Uncut,
                    NonCut:NonCut,
                    Rejection:Rejection,
                    Dust:Dust,
                    KOR:KOR,
                    Trolley_Broken:Trolley_Broken,
                    Trolley_Small_JB:Trolley_Small_JB,
                    scoopStatus:1,
                    noOfGents:male,
                    noOfLadies:female,
                    noOfSupervisors:supervisor,
                    noOfEmployees:noOfEmployees,
                    noOfOperators:noOfOperators,
                    CreatedBy:createdBy,
                    Mc_runTime:Mc_runTime,
                    Transfered_to:Transfered_to,
                    Brkdwn_reason:Brkdwn_reason,
                    Mc_breakdown:Mc_breakdown,
                    otherTime:otherTime,
                    Mc_on:Mc_on,
                    Mc_off:Mc_off

                },
                {
                    where: {
                        id,
                    },
                }
            );
    
           
            return res.status(200).json({ message: "RCN Scooping Report Uploaded Successfully",scoop });
        } catch (err) {
            return res.status(500).json({ message: "internal server Error", err });
        }
}

export default createscoopingReport;