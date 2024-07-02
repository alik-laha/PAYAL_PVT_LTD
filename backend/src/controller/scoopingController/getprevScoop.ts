import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

const getprevScoop = async (req: Request, res: Response) => {

    try {

        res.status(200).json({ message: "Scooping Initial Entry Made Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export default getprevScoop