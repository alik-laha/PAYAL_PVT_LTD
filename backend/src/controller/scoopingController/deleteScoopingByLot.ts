import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";




const deleteSccopingByLot= async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await RcnScooping.destroy({
            where: {
                LotNo: id
            }
        });
        return res.status(200).json({ message: "Scooping Entry Is deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteSccopingByLot;