import { Request, Response } from "express";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";
import RcnAllEditScooping from "../../model/scoopingAllEditModel";



const countPendingLot= async (req: Request, res: Response) => {
    try {
        const lotNo = req.body.lotNo;
        const section=req.body.section
        let count:number=0
        if(section==='Boiling'){
             count = await RcnBoilingEdit.count({ where: { LotNo:lotNo} });
        }
        if(section==='Scooping'){
            count = await RcnAllEditScooping.count({ where: { LotNo:lotNo} });
       }
        
        return res.status(200).json({ message: "Pending Count", count})
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default countPendingLot;