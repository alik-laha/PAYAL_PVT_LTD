import { Request, Response } from "express";
import Grading from "../../model/RcnGradingModel";

const CreateGrading = async (req: Request, res: Response) => {
    try {
        const { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo } = req.body;
        const feeledBy = req.cookies.user;
        const Mc_runTime = (Mc_off - Mc_on) - (Mc_breakdown + otherTime)
        const graddingEntry = await Grading.create({
            date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo, feeledBy, Mc_runTime
        });
        if (graddingEntry) {
            return res.status(200).json({ message: "Gradding Entry Created Successfully" });
        }

    } catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
}
export default CreateGrading;
