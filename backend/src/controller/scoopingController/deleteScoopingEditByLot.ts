import { Request, Response } from "express";
import RcnScoopingEdit from "../../model/scoopingEditModel";




const deleteSccopingEditByLot= async (req: Request, res: Response) => {
    try {
        const LotNo = req.body.lotNo
        await RcnScoopingEdit.destroy({
            where: {
                LotNo: LotNo
            }
        });
        return res.status(200).json({ message: "Scooping Entry Is deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteSccopingEditByLot;