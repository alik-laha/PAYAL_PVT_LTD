import { Request, Response } from "express";
import { QcRCN } from "../../model/indexmapping";

const qcInitialEntry = async (req: Request, res: Response) => {

    try {
        let { g_id, blNo, conNo, origin, date } = req.body;
        if(!blNo){
            blNo='LOCAL PURCHASE'
        }
        if(!conNo){
            conNo='NO CONTAINER'
        }
        const qcRcnInitial = await QcRCN.create({
            id: g_id,
            date,
            blNo,
            conNo,
            origin,
        });
        return res.status(201).json({ message: "QC Initial Entry Made Successfully", qcRcnInitial });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }


}
export default qcInitialEntry;