import { Request, Response } from "express";

import WhatsappMsg from "../../helper/WhatsappMsg";
import RcnBoiling from "../../model/RcnBoilingModel";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";

const UpdateBoiling = async (req: Request, res: Response) => {
    try {
        const editStatus = "Pending"
        const feeledBy = req.cookies.user
        const id = req.params.id
        const {  origin,
            LotNo,
            date,
            size,sizename,scopline,presr,Mc_name,Mc_on,Mc_off,noOfEmployees,Mc_breakdown,otherTime,cookingTime,moisture } = req.body
        const timeToMilliseconds = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
        };

        // Helper function to convert milliseconds to "HH:MM"
        const millisecondsToTime = (milliseconds: number) => {
            const totalMinutes = Math.floor(milliseconds / 60000);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };
        const CalculatemachineOnOffTime = (time1: string, time2: string) => {
            const time1InMilliseconds = timeToMilliseconds(time1) - timeToMilliseconds(time2);
            if (time1InMilliseconds < 0) {
                return timeToMilliseconds(time1) - timeToMilliseconds(time2) + 24 * 60 * 60 * 1000;
            }
            return time1InMilliseconds;
        }
        const Mc_runTime = millisecondsToTime(CalculatemachineOnOffTime(Mc_off, Mc_on) - ((timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime))));
         
        const RcnBoilingData = await RcnBoiling.update({ editStatus }, { where: { id } })
         
         if (RcnBoilingData) {
            const RcnBoilingEditData = await RcnBoilingEdit.create({ 
                id,
                LotNo,
            date:date,
            origin:origin,
            SizeName:sizename,
            Size:size,
            Scooping_Line_Mc:scopline,
            Pressure:presr,
            CookingTime:cookingTime,
            MCName:Mc_name,
            Mc_on:Mc_on,
            Mc_off:Mc_off,
            moisture:moisture,
            noOfEmployees:noOfEmployees,
            Mc_breakdown:Mc_breakdown,
            Mc_runTime:Mc_runTime,
            otherTime:otherTime,
            CreatedBy:feeledBy
                
            })
            
            
            if (RcnBoilingEditData) {
                const data = await WhatsappMsg("RCN Boiling", feeledBy,"modify_request","Production")
                //console.log(data)
                return res.status(200).json({ message: "Data Modification Request Sent Successfully" })
            }
            else {
                return res.status(500).json({ message: "Internal Server Error", })
            }
        }


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}
export default UpdateBoiling