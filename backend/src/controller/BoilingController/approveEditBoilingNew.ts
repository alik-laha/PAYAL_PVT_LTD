import { Request, Response } from "express";
import { RcnBoilingData } from "../../type/type";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";
import RcnBoiling from "../../model/RcnBoilingModel";
import { Op } from "sequelize";
import RcnScooping from "../../model/scoopingModel";

const approveEditBoilingNew = async (req: Request, res: Response) => {
try{
    const id = req.params.id;
    const editStatus = "Approved";
    const editdata: RcnBoilingData | null = await RcnBoilingEdit.findOne({ where: { id } }) as RcnBoilingData | null;
    const originaldata: RcnBoilingData | null = await RcnBoiling.findOne({ where: { id } }) as RcnBoilingData | null;
    const modifiedBy = req.cookies.user;
    if (editdata) {
        const {
            LotNo,
            date,
            origin,
            SizeName,
            Size,
            moisture,
            Scooping_Line_Mc,
            Pressure,
            CookingTime,
            MCName,
            Mc_on,
            Mc_off,
            noOfEmployees,
            Mc_breakdown,
            otherTime
        } = editdata;
        const Mc_runTime = editdata.Mc_runTime;
        const CreatedBy = editdata?.CreatedBy;
       
        const boilingupdate = await RcnBoiling.update({
            LotNo,
            date,
            origin,
            SizeName,
            Size,
            moisture,
            Scooping_Line_Mc,
            Pressure,
            CookingTime,
            MCName,
            Mc_on,
            Mc_off,
            noOfEmployees,
            Mc_breakdown,
            otherTime, CreatedBy, Mc_runTime,
            modifiedBy, editStatus
        }, { where: { id } });


        if(boilingupdate){
            let where
                where = {
                    [Op.and]: [
                        {
                            LotNo: {
                                [Op.like]: `%${LotNo}%`
                            }
                        },
                        {
                            SizeName: {
                                [Op.like]: `%${originaldata?.SizeName}%`
                            }
                        },
                        {
                            origin: {
                                [Op.like]: `%${originaldata?.origin}%`
                            }
                        },
                        {
                            Scooping_Line_Mc: {
                                [Op.like]: `%${originaldata?.Scooping_Line_Mc}%`
                            }
                        }
                    ]

                }
                const scoopingupdate = await RcnScooping.update({
                    Receiving_Qty: (parseFloat(Size) * 1),
                    origin: origin,
                    SizeName: SizeName,
                    Size: Size,
                }, { where });

                if(scoopingupdate){
                        await RcnBoilingEdit.destroy({ where: { id } });
                        return res.status(200).json({ message: "RCN Boiling Modify Request is Approved" });
                    
                }
                else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
        }
    }
}
catch{

}

}
export default approveEditBoilingNew