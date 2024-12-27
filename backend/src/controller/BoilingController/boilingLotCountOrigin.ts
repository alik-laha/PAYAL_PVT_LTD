import { Request, Response } from "express";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";
import RcnAllEditScooping from "../../model/scoopingAllEditModel";
import RcnBormaEdit from "../../model/bormaEditModel";
import HumidifierEdit from "../../model/humidierEditModel";
import RcnEditPeeling from "../../model/peelingEditModel";



const countPendingLotOrigin = async (req: Request, res: Response) => {
    try {
        const lotNo = req.body.lotNo;
        const section = req.body.section
        const origin = req.body.origin
        let count: number = 0
      
        if (section === 'DPDS') {
            count = await RcnEditPeeling.count({ where: { LotNo: lotNo ,origin:origin} });
        }

        return res.status(200).json({ message: "Pending Count", count })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default countPendingLotOrigin;