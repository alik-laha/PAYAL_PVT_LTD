import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";
import { RcnGradingData } from "../../type/type";

const ApproveEditStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const editStatus = "Approved";
        const data: RcnGradingData | null = await RcnGradingEdit.findOne({ where: { id } }) as RcnGradingData | null;
        const feeledBy = data?.feeledBy;
        const modifiedBy = req.cookies.user;
        if (data) {
            const { date, A, B, C, D, E, F, G, dust, Mc_on, Mc_off, Mc_breakdown, noOfEmployees, grading_lotNo, Mc_name, modifiedBy, origin, otherTime } = data;
            const Mc_runTime = data.Mc_runTime;
            const RcnGradingData = await RcnGrading.update({ editStatus }, { where: { id } });
            if (RcnGradingData) {
                const RcnGradingEditData = await RcnGrading.update({ date, A, B, C, D, E, F, G, dust, Mc_on, Mc_off, Mc_breakdown, noOfEmployees, grading_lotNo, Mc_name, origin, otherTime, feeledBy, Mc_runTime, modifiedBy }, { where: { id } });
                if (RcnGradingEditData) {
                    await RcnGradingEdit.destroy({ where: { id } });
                    return res.status(200).json({ message: "Data Updated Successfully" });
                }
                else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}
export default ApproveEditStatus