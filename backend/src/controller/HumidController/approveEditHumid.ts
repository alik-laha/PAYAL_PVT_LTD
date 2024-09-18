import { Request, Response } from "express";
import {  HumidrcvData } from "../../type/type";

import HumidifierEdit from "../../model/humidierEditModel";
import Humidifier from "../../model/humidfierModel";

const approveHumid = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data: HumidrcvData | null = await HumidifierEdit.findOne({
            where: {
                id
            }
        }) as HumidrcvData | null;
        if (!data) {
            return res.status(400).json({ message: "Humid Entry not found" });
        }
        const bormaEdit = await Humidifier.update({
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
            TotalOutput: data.TotalOutput,
            MoistGain: data.MoistGain,
            Status: 1,
            CreatedBy: data.CreatedBy,
            editStatus: "Approved",
            modifiedBy:approvedBy

        }, {
            where: {
                id
            }
        });
        if (!bormaEdit) {
            return res.status(400).json({ message: "Humid Entry is not found" });
        }
        const bormaEditDelete = await HumidifierEdit.destroy({
            where: {
                id
            }
        });
        if (!bormaEditDelete) {
            return res.status(400).json({ message: "Humid Entry is not found" });
        }


        return res.status(200).json({ message: "Edit Request of Humid Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default approveHumid;