import { Request, Response } from "express";
import WhatsappMsg from "../../helper/WhatsappMsg";
import { HumidrcvData } from "../../type/type";
import sequelize from "../../config/databaseConfig";
import Humidifier from "../../model/humidfierModel";
import HumidifierEdit from "../../model/humidierEditModel";
//import VendorName from "../../model/vendorNameModel";

const updateHumid = async (req: Request, res: Response) => {
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
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        console.log('Reached Here')
        const {  origin,iptot,lotNo,
            ipmositure, opmositure,optot,
            Mc_off, Mc_on,  trolley, noOfEmployees, date } = req.body;
        let {Mc_breakdown, otherTime}=req.body
        if (!id) return res.status(400).json({ message: "id is required" });    
        const packageMaterialData: HumidrcvData = await Humidifier.findOne({ where: { id } }) as unknown as HumidrcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Humidifier Item not found" });
       
        if (otherTime === undefined || otherTime === null) {
            otherTime = '00:00'
        }
        if (Mc_breakdown === undefined || Mc_breakdown === null) {
            Mc_breakdown = '00:00'
        }
        const runtime = CalculatemachineOnOffTime(Mc_off, Mc_on) -(timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime))
     
        console.log(req.body)
        await sequelize.transaction(async (transaction: any) => {
            if (runtime < 0) {
                res.status(500).json({ message: "Machine Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            const Mc_runTime = millisecondsToTime(runtime);
            if((parseFloat(iptot)>parseFloat(optot))
                ||parseFloat(ipmositure)>parseFloat(opmositure)){
                res.status(500).json({ message: "Output can't be Lower Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            let prcntg:number=0
            if(ipmositure && opmositure){
                 prcntg=(((parseFloat(opmositure)-parseFloat(ipmositure))/parseFloat(ipmositure))*100)
            }
            const editPackageMaterial = await HumidifierEdit.create({
                id: packageMaterialData.id,
                origin:origin,
                TotalInput:iptot,
                LotNo:lotNo,
                date:date,
                Mc_on: Mc_on,
                Mc_off: Mc_off,
                Mc_breakdown: Mc_breakdown,
                Mc_runTime: Mc_runTime,
                noOfOperators:noOfEmployees,
                otherTime: otherTime,
                NoOfTrolley: trolley,
                InputMoisture: ipmositure,
                OutputMoisture: opmositure,
                TotalOutput: optot,
                MoistGain: prcntg,
                Status: 1,
                CreatedBy: createdBynew,
                editStatus:'Pending'
            },{transaction});
            if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Humidifier Item" });
            const updatePackageMaterial = await Humidifier.update({ editStatus: "Pending" }, { where: { id },transaction });
            if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Humidifier Item" });
            const data = await WhatsappMsg("RCN Humidifier", createdBynew,"modify_request","Production")
            console.log(data)
            return res.status(201).json({ message: "Humidifier edited successfully" });
            
        })
        
    }
    catch (err) {
        console.log(err);
    }
}
export default updateHumid;