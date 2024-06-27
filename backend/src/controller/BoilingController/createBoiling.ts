import { Request, Response } from "express";
import RcnBoiling from "../../model/RcnBoilingModel";


const CreateBoiling = async (req: Request, res: Response) => {
    try {
        const { columnMC, columnDate,columnLotNo,columnEmployee,
            ScoopingLine, breakDown, cookingOff,cookingOn, CookingTime,origin,other,
            size,pressure,sizeName } = req.body.data;

            const feeledBy = req.cookies.user;
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
        console.log(CalculatemachineOnOffTime(cookingOff, cookingOn))
        const Mc_runTime = CalculatemachineOnOffTime(cookingOff, cookingOn) - (timeToMilliseconds(breakDown) + timeToMilliseconds(other));
        if (Mc_runTime < 0) {
            return res.status(400).json({ message: "Machine Run Time can not be negative" });
        }
       
        const boilingEntry = await RcnBoiling.create({
            LotNo:columnLotNo,
            date:columnDate,
            origin:origin,
            SizeName:sizeName,
            Size:size,
            Scooping_Line_Mc:ScoopingLine,
            Pressure:pressure,
            CookingTime:CookingTime,
            MCName:columnMC,
            Mc_on:cookingOn,
            Mc_off:cookingOff,
            noOfEmployees:columnEmployee,
            Mc_breakdown:breakDown,
            Mc_runTime:Mc_runTime,
            otherTime:other,
            CreatedBy:feeledBy
          

        });

        if (boilingEntry) {
            return res.status(200).json({ message: "Boiling Entry Created Successfully" });
        }

    } catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
}
export default CreateBoiling;
