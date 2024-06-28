import { Request, Response, NextFunction } from "express";

const BoilingMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {  columnMC, 
            ScoopingLine, breakDown, cookingOff,cookingOn, origin,other,cookingTime,
            size
         } = req.body.data;
         console.log('middlware')
         console.log(req.body.data)
        if (!columnMC || !origin  || !size || !ScoopingLine ) {
            return res.status(400).json({ message: "All Fields Are Required" })
        }
        const timeToMilliseconds = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
        };
        // Helper function to convert milliseconds to "HH:MM"
      

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
        //const CookingTime = millisecondsToTime(Mc_runTime);
        if (cookingTime > Mc_runTime) {
            return res.status(400).json({ message: "Cooking Time Can't Be Greater Than MC Run time" });
        }

        next();

    } catch (err) {
        console.log('catch in middleware')
        return res.status(500).json({ message: "internal server Error" });
    }
}
export default BoilingMiddleWare;
