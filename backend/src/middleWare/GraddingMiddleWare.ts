import { Request, Response, NextFunction } from "express";

const GradingMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime } = req.body;
        if (!date || !origin || !A || !B || !C || !D || !E || !F || !G || !dust || !Mc_name || !Mc_on || !Mc_off || !noOfEmployees) {
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
        const Runtime = millisecondsToTime(Mc_runTime);

        next();

    } catch (err) {
        return res.status(500).json({ message: "internal server Error" });
    }
}
export default GradingMiddleWare;
