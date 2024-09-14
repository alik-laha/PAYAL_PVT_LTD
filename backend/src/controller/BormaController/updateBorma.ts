import { Request, Response } from "express";


import WhatsappMsg from "../../helper/WhatsappMsg";
import RcnBormaEdit from "../../model/bormaEditModel";
import RcnBorma from "../../model/bormaModel";
import { BormarcvData } from "../../type/type";
import sequelize from "../../config/databaseConfig";
//import VendorName from "../../model/vendorNameModel";

const updateBorma = async (req: Request, res: Response) => {
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
        const {   ipmositure, opmositure, opbroken, opwholes, temp,ipbroken,ipwholes,origin,iptot,lotNo,
            Mc_off, Mc_on,  trolley, noOfEmployees, date } = req.body;
        let {Mc_breakdown, otherTime}=req.body
        if (!id) return res.status(400).json({ message: "id is required" });    
        const packageMaterialData: BormarcvData = await RcnBorma.findOne({ where: { id } }) as unknown as BormarcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Borma Item not found" });
       
        if (otherTime === undefined || otherTime === null) {
            otherTime = '00:00'
        }
        if (Mc_breakdown === undefined || Mc_breakdown === null) {
            Mc_breakdown = '00:00'
        }
        const runtime = CalculatemachineOnOffTime(Mc_off, Mc_on) -(timeToMilliseconds(Mc_breakdown) + timeToMilliseconds(otherTime))
        const totalOut=parseFloat(opwholes) + parseFloat(opbroken)
        console.log(req.body)
        await sequelize.transaction(async (transaction: any) => {
            if (runtime < 0) {
                res.status(500).json({ message: "Machine Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            const Mc_runTime = millisecondsToTime(runtime);
            if(parseFloat(iptot)<totalOut){
                res.status(500).json({ message: "Borma Output can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')
    
            }
            let prcntg:number=0
            if(iptot){
                 prcntg=(((parseFloat(iptot)-totalOut)/parseFloat(iptot))*100)
            }
            const editPackageMaterial = await RcnBormaEdit.create({
                id: packageMaterialData.id,
                origin:origin,
                InputWholes:ipwholes,
                InputPieces:ipbroken,
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
                OutputWholes: opwholes,
                OutputPieces: opbroken,
                TotalOutput: totalOut,
                BormaLoss: prcntg,
                BormaStatus: 1,
                Temp:temp,
                CreatedBy: createdBynew,
                editStatus:'Pending'
            },{transaction});
            if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Borma Item" });
            const updatePackageMaterial = await RcnBorma.update({ editStatus: "Pending" }, { where: { id },transaction });
            if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Borma Item" });
            const data = await WhatsappMsg("RCN Borma", createdBynew,"modify_request","Production")
            console.log(data)
            return res.status(201).json({ message: "Borma edited successfully" });
            
        })
        
    }
    catch (err) {
        console.log(err);
    }
}
export default updateBorma;