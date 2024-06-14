import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";

const UpdateGradding = async (req: Request, res: Response) => {
    try {
        const editStatus = "Pending"
        const feeledBy = req.cookies.user
        const id = req.params.id
        const { date, A, B, C, D, E, F, G, dust, Mc_on, Mc_off, Mc_breakdown, noOfEmployees, grading_lotNo, Mc_name, origin, otherTime } = req.body
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
        const Mc_runTime = millisecondsToTime((timeToMilliseconds(Mc_off) - timeToMilliseconds(Mc_on)) - ((timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime))));
        const RcnGradingData = await RcnGrading.update({ editStatus }, { where: { id } })
        if (RcnGradingData) {
            const RcnGradingEditData = await RcnGradingEdit.create({ id, date, A, B, C, D, E, F, G, dust, Mc_on, Mc_off, Mc_breakdown: Mc_breakdown, noOfEmployees, grading_lotNo, Mc_name, origin, otherTime, feeledBy, Mc_runTime })
            if (RcnGradingEditData) {
                return res.status(200).json({ message: "Data Updated Successfully" })
            }
            else {
                return res.status(500).json({ message: "Internal Server Error", })
            }
        }


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}
export default UpdateGradding