import { Request, Response, NextFunction } from "express";
import Grading from "../model/RcnGradingModel";

const GradingMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo } = req.body;
        if (!date || !origin || !A || !B || !C || !D || !E || !F || !G || !dust || !Mc_name || !Mc_on || !Mc_off || !noOfEmployees) {
            return res.status(400).json({ message: "All field are required" })
        }
        const checkMachinerun = (Mc_off - Mc_on) - (Mc_breakdown + otherTime)
        if (checkMachinerun < 0) {
            return res.status(400).json({ message: "Machine run time is less than 0" })
        }
        next();

    } catch (err) {
        return res.status(500).json({ message: "internal server Error" });
    }
}
export default GradingMiddleWare;
