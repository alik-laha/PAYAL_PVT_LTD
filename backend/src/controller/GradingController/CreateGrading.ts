import { Request, Response } from "express";
import Grading from "../../model/RcnGradingModel";

const CreateGrading = async (req: Request, res: Response) => {
    try {
        const { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo } = req.body;

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
        const Mc_runTime = millisecondsToTime(CalculatemachineOnOffTime(Mc_off, Mc_on) - ((timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime))));
        const graddingEntry = await Grading.create({
            date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo, feeledBy, Mc_runTime
        });

        if (graddingEntry) {
            return res.status(200).json({ message: "Grading Entry Created Successfully" });
        }

    } catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
}
export default CreateGrading;
