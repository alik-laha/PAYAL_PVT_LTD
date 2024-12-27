import { Request, Response } from "express";

import MayurEdit from "../../model/mayureditModel";



const countPendingLotOrigin = async (req: Request, res: Response) => {
    try {
        const lotNo = req.body.lotNo;
        const section = req.body.section
        const origin = req.body.origin
        let count: number = 0
      
        if (section === 'DPDS') {
            count = await MayurEdit.count({ where: { LotNo: lotNo ,origin:origin} });
        }

        return res.status(200).json({ message: "Pending Count", count })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default countPendingLotOrigin;