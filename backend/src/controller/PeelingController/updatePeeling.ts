import { Request, Response } from "express";
import WhatsappMsg from "../../helper/WhatsappMsg";
import { HumidrcvData, PeelingRcvData } from "../../type/type";
import sequelize from "../../config/databaseConfig";
import Humidifier from "../../model/humidfierModel";
import HumidifierEdit from "../../model/humidierEditModel";
import RcnPeeling from "../../model/peelingModel";
import RcnEditPeeling from "../../model/peelingEditModel";
//import VendorName from "../../model/vendorNameModel";

const updatePeeling = async (req: Request, res: Response) => {
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
        const {  origin,iptot,lotNo,pres,moist,peeltime,
            wholepeel,wholeunpeel,pieceunpeel,dp,dp1,ds,sjh,sjh1,jjh,jkK,jh1,sp1,husk,rejection,bigT,
            
            Mc_off, Mc_on,  trolley, noOfEmployees, date } = req.body;
        let {Mc_breakdown, otherTime}=req.body
        if (!id) return res.status(400).json({ message: "id is required" });    
        const packageMaterialData: PeelingRcvData = await RcnPeeling.findOne({ where: { id } }) as unknown as PeelingRcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Peeling Item not found" });
       
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
           
            if(parseFloat(iptot)< (parseFloat(wholepeel)
                +parseFloat(wholeunpeel)
                +parseFloat(dp)
                +parseFloat(ds)
                +parseFloat(dp1)
                +parseFloat(jjh)
                +parseFloat(sjh)
                +parseFloat(sjh1)
                +parseFloat(jh1)
                +parseFloat(jkK)
                +parseFloat(sp1)
                +parseFloat(husk)
                +parseFloat(rejection)
                +parseFloat(pieceunpeel)
                +parseFloat(bigT)))
               {
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
          
            const editPackageMaterial = await RcnEditPeeling.create({
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
                WholesPeel:wholepeel,
                WholesUnpeel:wholeunpeel,
                DP: dp,
                DS: ds,
                DP1: dp1,
                JJH: jjh,
                SJH: sjh,
                SJH1: sjh1,
                JH1: jh1,
                JK_K: jkK,
                SP1: sp1,
                Husk:husk,
                Rejection: rejection,
                UnpeelPiece:pieceunpeel,
                Big_Taiho:bigT,
              
                pressure:pres,
                moisture: moist,
                peelingTime: peeltime,
                difference:parseFloat(iptot)-
                (parseFloat(wholepeel)
                +parseFloat(wholeunpeel)
                +parseFloat(dp)
                +parseFloat(ds)
                +parseFloat(dp1)
                +parseFloat(jjh)
                +parseFloat(sjh)
                +parseFloat(sjh1)
                +parseFloat(jh1)
                +parseFloat(jkK)
                +parseFloat(sp1)
                +parseFloat(husk)
                +parseFloat(rejection)
                +parseFloat(pieceunpeel)
                +parseFloat(bigT)),
                Status: 1,
                CreatedBy: createdBynew,
                editStatus:'Pending'
            },{transaction});
            if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Peeling Item" });
            const updatePackageMaterial = await RcnPeeling.update({ editStatus: "Pending" }, { where: { id },transaction });
            if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Peeling Item" });
            const data = await WhatsappMsg("RCN Peeling", createdBynew,"modify_request","Production")
            console.log(data)
            return res.status(201).json({ message: "Peeling edited successfully" });
            
        })
        
    }
    catch (err) {
        console.log(err);
    }
}
export default updatePeeling;