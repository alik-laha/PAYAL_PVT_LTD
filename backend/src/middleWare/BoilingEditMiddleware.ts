import { Request, Response, NextFunction } from "express";

const BoilingEditMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {  Mc_name, 
            scopline, Mc_breakdown, Mc_off,Mc_on, origin,otherTime,
            size
         } = req.body;
        if (!Mc_name || !origin  || !size || !scopline ) {
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
        console.log(CalculatemachineOnOffTime(Mc_off, Mc_on))
        const Mc_runTime = CalculatemachineOnOffTime(Mc_off, Mc_on) - (timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime));
        if (Mc_runTime < 0) {
            return res.status(400).json({ message: "Machine Run Time can not be negative" });
        }
        const CookingTime = millisecondsToTime(Mc_runTime);

        next();

    } catch (err) {
        return res.status(500).json({ message: "internal server Error" });
    }
}
export default BoilingEditMiddleWare;
