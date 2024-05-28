import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";

const DeleteRcnEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const rcnPrimary = await RcnPrimary.destroy({
            where: {
                id
            }
        });
        res.status(200).json({ message: "Rcn Entry Deleted Successfully", rcnPrimary });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default DeleteRcnEntry;