import { Request, Response } from "express";
import oilMillModel from "../../model/oilMillModel";
import oilMillEditModel from "../../model/oilMillEditModel";


const EditRejectOilMill = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;


        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await oilMillModel.update({
            editStatus: "N/A",
            approvedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "OilMill Entry not found" });
        }
        const rcnEdit = await oilMillEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "OilMill Entry not found" });
        }
        return res.status(200).json({ message: "OilMill Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default EditRejectOilMill;