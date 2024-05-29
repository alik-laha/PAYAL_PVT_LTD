import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";

const getAllRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const rcnPrimaryEntry = await RcnPrimary.findAll();
        res.status(200).json(rcnPrimaryEntry);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}
export default getAllRcnPrimaryEntry;