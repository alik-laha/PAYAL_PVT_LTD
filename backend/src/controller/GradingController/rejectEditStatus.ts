import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";

const rejectEditStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const editStatus = "Created";
        const rejectedBy = req.cookies.user;
        const data = await RcnGradingEdit.destroy({ where: { id } });
        if (data) {
            const RcnGradingData = await RcnGrading.update({ editStatus, modifiedBy: rejectedBy }, { where: { id } });
            if (RcnGradingData) {
                return res.status(200).json({ message: "Data Updated Successfully" });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default rejectEditStatus