import { Request, Response } from "express";
import { BormarcvData } from "../../type/type";
import RcnBorma from "../../model/bormaModel";
import RcnBormaEdit from "../../model/bormaEditModel";

const approveBorma = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data: BormarcvData | null = await RcnBormaEdit.findOne({
            where: {
                id
            }
        }) as BormarcvData | null;
        if (!data) {
            return res.status(400).json({ message: "Borma Entry not found" });
        }
        const bormaEdit = await RcnBorma.update({
            date: data.date,
            Mc_on: data.Mc_on,
            Mc_off: data.Mc_off,
            Mc_breakdown: data.Mc_breakdown,
            Mc_runTime: data.Mc_runTime,
            noOfOperators: data.noOfOperators,
            otherTime: data.otherTime,
            NoOfTrolley: data.NoOfTrolley,
            InputMoisture: data.InputMoisture,
            OutputMoisture: data.OutputMoisture,
            OutputWholes: data.OutputWholes,
            OutputPieces: data.OutputPieces,
            TotalOutput: data.TotalOutput,
            BormaLoss: data.BormaLoss,
            BormaStatus: 1,
            Temp: data.Temp,
            CreatedBy: data.CreatedBy,
            editStatus: "Approved",
            modifiedBy:approvedBy

        }, {
            where: {
                id
            }
        });
        if (!bormaEdit) {
            return res.status(400).json({ message: "Borma Entry is not found" });
        }
        const bormaEditDelete = await RcnBormaEdit.destroy({
            where: {
                id
            }
        });
        if (!bormaEditDelete) {
            return res.status(400).json({ message: "Borma Entry is not found" });
        }


        return res.status(200).json({ message: "Edit Request of Borma Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default approveBorma;