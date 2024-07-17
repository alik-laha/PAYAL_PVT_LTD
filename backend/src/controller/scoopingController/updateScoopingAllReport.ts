import { Request, Response } from "express";
import RcnAllScooping from "../../model/scoopingAllmodel";

const updateScoopingAllReport = async (req: Request, res: Response) => {
    try {
        let { LotNo,
            origin,
            Scooping_Line_Mc,
            Opening_Qty,
            Receiving_Qty,
            Wholes,
            Broken,
            Uncut,
            Unscoop,
            NonCut,
            Rejection,
            Dust,
            KOR,
            noOfEmployees,
            noOfOperators,
            male,
            female,
            supervisor,
            Date } = req.body.data2;
        const createdBy = req.cookies.user;
        const scoop = await RcnAllScooping.create(
            {
                LotNo: LotNo,
                origin: origin,
                Scooping_Line_Mc: Scooping_Line_Mc,
                Opening_Qty: Opening_Qty,
                Receiving_Qty: Receiving_Qty,
                date: Date,
                Wholes: Wholes,
                Broken: Broken,
                Unscoop: Unscoop,
                Uncut: Uncut,
                NonCut: NonCut,
                Rejection: Rejection,
                Dust: Dust,
                KOR: KOR,
            }
        );
        return res.status(200).json({ message: "RCN Scooping Entry is Uploaded Successfully", scoop });
    } catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
}
export default updateScoopingAllReport;
