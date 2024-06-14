import { Request, Response } from "express";
import {QcRCN} from "../../model/indexmapping";

const qcInitialEntry = async (req: Request, res: Response) => {

    try {
        const { g_id,blNo, conNo, origin, date } = req.body;
        
        const qcRcnInitial = await QcRCN.create({
            id:g_id,
            date,
            blNo,
            conNo,
            origin, 
        });
        res.status(201).json({ message: "QC Initial Entry Made Successfully", qcRcnInitial });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

  
}
export default qcInitialEntry;