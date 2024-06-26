import { Request, Response } from "express";
import RcnGrading from "../../model/RcnGradingModel";
import RcnGradingEdit from "../../model/RcnGradingEditModel";
import { RcnBoilingData, RcnGradingData } from "../../type/type";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";
import RcnBoiling from "../../model/RcnBoilingModel";

const approveEditBoiling = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const editStatus = "Approved";
        const data: RcnBoilingData | null = await RcnBoilingEdit.findOne({ where: { id } }) as RcnBoilingData | null;
        const CreatedBy = data?.CreatedBy;
        const modifiedBy = req.cookies.user;
        if (data) {
            const {   
                LotNo ,
                date ,
                origin ,
                SizeName ,
                Size,
                Scooping_Line_Mc,
                Pressure,
                CookingTime,
                MCName,
                Mc_on,
                Mc_off,
                noOfEmployees,
                Mc_breakdown, 
                otherTime
                } = data;
            const Mc_runTime = data.Mc_runTime;
            const RcnGradingEditData = await RcnBoiling.update({   LotNo ,
                date ,
                origin ,
                SizeName ,
                Size,
                Scooping_Line_Mc,
                Pressure,
                CookingTime,
                MCName,
                Mc_on,
                Mc_off,
                noOfEmployees,
                Mc_breakdown, 
                otherTime,CreatedBy,Mc_runTime,
                 modifiedBy, editStatus }, { where: { id } });
            if (RcnGradingEditData) {
                await RcnBoilingEdit.destroy({ where: { id } });
                return res.status(200).json({ message: "RCN Boiling Modify Request is Approved" });
            }
            else {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}
export default approveEditBoiling