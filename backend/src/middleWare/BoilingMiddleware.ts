import { Request, Response, NextFunction } from "express";

const BoilingMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {  columnMC, 
            ScoopingLine, breakDown, cookingOff,cookingOn, origin,other,
            size
         } = req.body.data;
        if (!columnMC || !origin  || !size || !ScoopingLine ) {
            return res.status(400).json({ message: "All Fields Are Required" })
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
        console.log(CalculatemachineOnOffTime(cookingOff, cookingOn))
        const Mc_runTime = CalculatemachineOnOffTime(cookingOff, cookingOn) - (timeToMilliseconds(breakDown) + timeToMilliseconds(other));
        if (Mc_runTime < 0) {
            return res.status(400).json({ message: "Machine Run Time can not be negative" });
        }
        const CookingTime = millisecondsToTime(Mc_runTime);

        next();

    } catch (err) {
        return res.status(500).json({ message: "internal server Error" });
    }
}
export default BoilingMiddleWare;
