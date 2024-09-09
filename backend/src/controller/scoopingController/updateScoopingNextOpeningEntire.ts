import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";
import { Op } from "sequelize";
import sequelize from "../../config/databaseConfig";
import RcnScoopingEdit from "../../model/scoopingEditModel";
import RcnAllEditScooping from "../../model/scoopingAllEditModel";
import RcnAllScooping from "../../model/scoopingAllmodel";

import RcnBorma from "../../model/bormaModel";



const updateScoopingOpeningEntire = async (req: Request, res: Response) => {


    try{

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

        const feeledBy = req.cookies.user;
        const linescoop = req.body.linescoop
        const lotscoop = req.body.lotscoop
        const updatescoop = req.body.updatescoop
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linescoop) 
            {
                if (data.otherTime === undefined || data.otherTime === null) {
                    data.otherTime = '00:00'
                }
                if (data.Mc_breakdown === undefined || data.Mc_breakdown === null) {
                    data.Mc_breakdown = '00:00'
                }
                if (!data.id) {
                    res.status(400).json({ message: "Please Provide the id" });
                    throw new Error('Transaction Aborted 1')
                }
                const runtime = CalculatemachineOnOffTime(data.Mc_off, data.Mc_on) -
                    (timeToMilliseconds(data.Mc_breakdown) + timeToMilliseconds(data.otherTime))
                if (runtime < 0) {
                    res.status(500).json({ message: "Machine Run Time can not be negative" });
                    throw new Error('Transaction Aborted 2')
                }
                const Mc_runTime = millisecondsToTime(runtime);
                let total_bag =
                    ((data.Receiving_Qty ? parseFloat(data.Receiving_Qty) : 0 +
                        data.Opening_Qty ? parseFloat(data.Opening_Qty) : 0)
                        - (data.Uncut ? parseFloat(data.Uncut) : 0 + data.Unscoop ? parseFloat(data.Unscoop) : 0 +
                            data.NonCut ? parseFloat(data.NonCut) : 0 +
                                data.Dust ? parseFloat(data.Dust) : 0)) / 80
                console.log(total_bag)
                let kor
                if (total_bag === 0) {
                    kor = 0
                }
                else {
                    kor = ((data.Wholes ? parseFloat(data.Wholes) : 0 + data.Broken ? parseFloat(data.Broken) : 0) / (total_bag * 0.453)).toFixed(2)
                }
                const latestEditEntry = await RcnScoopingEdit.findOne({
                    attributes: ['CreatedBy'],
                    where: { id:data.id }
                });
                console.log('Reached Here2')
                let createdByedit
                if(latestEditEntry){
                    createdByedit=latestEditEntry?.dataValues.CreatedBy
                }
                console.log('Reached Here')
                await RcnScooping.update(
                    {
                        date: data.Date,
                        Wholes: data.Wholes,
                        Broken: data.Broken,
                        Unscoop: data.Unscoop,
                        Uncut: data.Uncut,
                        NonCut: data.NonCut,
                        Rejection: data.Rejection,
                        Dust: data.Dust,
                        KOR: kor,
                        Trolley_Broken: data.Trolley_Broken,
                        Trolley_Small_JB: data.Trolley_Small_JB,
                        scoopStatus: 1,
                        noOfGents: data.male,
                        noOfLadies: data.female,
                        noOfSupervisors: data.supervisor,
                        noOfEmployees: data.noOfEmployees,
                        noOfOperators: data.noOfOperators,
                        CreatedBy: createdByedit,
                        Mc_runTime: Mc_runTime,
                        Brkdwn_reason: data.Brkdwn_reason,
                        Mc_breakdown: data.Mc_breakdown,
                        otherTime: data.otherTime,
                        Mc_on: data.Mc_on,
                        Mc_off: data.Mc_off,
                        Transfered_Qty: data.Transfer_Qty,
                        Transfered_To: data.Transfer_To_MC,
                        modifiedBy:feeledBy,
                        editStatus:'Approved'
                    },
                    {
                        where: {
                            id: data.id
                        }, transaction
                    }
                );
    
            }
            for (let data of lotscoop) {    
                let total_bag2 =
                    ((data.Receiving_Qty ? parseFloat(data.Receiving_Qty) : 0 +
                        data.Opening_Qty ? parseFloat(data.Opening_Qty) : 0)
                        - (data.Uncut ? parseFloat(data.Uncut) : 0 + data.Unscoop ? parseFloat(data.Unscoop) : 0 +
                            data.NonCut ? parseFloat(data.NonCut) : 0 +
                                data.Dust ? parseFloat(data.Dust) : 0)) / 80
                console.log(total_bag2)
                let kor2
                if (total_bag2 === 0) {
                    kor2 = 0
                }
                else {
                    kor2 = ((data.Wholes ? parseFloat(data.Wholes) : 0 + data.Broken ? parseFloat(data.Broken) : 0) / (total_bag2 * 0.453)).toFixed(2)
                }
    
                const latestEditEntry = await RcnAllEditScooping.findOne({
                    attributes: ['CreatedBy'],
                    where: {
                        LotNo:data.LotNo,
                        origin:data.origin
                        }
                });
        
                let createdByAll='ProductionManager'
                if(latestEditEntry){
                    createdByAll=latestEditEntry?.dataValues.CreatedBy
                }
                await RcnAllScooping.update(
                    {
                        date: data.Date,
                        Wholes:data.Wholes,
                        Broken:data.Broken,
                        Unscoop:data.Unscoop,
                        Uncut:data.Uncut,
                        NonCut:data.NonCut,
                        Rejection:data.Rejection,
                        Dust:data.Dust,
                        KOR:kor2,
                        TotBagCutting:data.total_bag2,
                        noOfGents:data.male,
                        noOfLadies:data.female,
                        noOfSupervisors:data.supervisor,
                        noOfEmployees:data.noOfEmployees,
                        noOfOperators:data.noOfOperators,
                        CreatedBy:createdByAll,
                        modifiedBy:feeledBy,
                        editStatus:'Approved'
                     }, {
                        where: {
                        LotNo:data.LotNo,
                        origin:data.origin
                        },transaction
                    });
    
                await RcnBorma.update({
                        InputWholes:data.Wholes,
                        InputPieces:data.Broken, 
                        TotalInput:(data.Wholes? parseFloat(data.Wholes):0)+(data.Broken?parseFloat(data.Broken):0),
                       
                    }, {
                        where: {
                            LotNo:data.LotNo,
                        origin:data.origin
                        }
                    });
            }
            for (let data of updatescoop) {
                const Scooping_Line_Mc=data.Scooping_Line_Mc
                const uncut=data.Uncut ? data.Uncut:0
                const unscoop=data.Unscoop ? data.Unscoop:0
                const noncut=data.NonCut ?data.NonCut:0
                const finalopen=uncut+unscoop+noncut
                console.log(finalopen)
                const LotNo=data.LotNo
    
                const nextEntry = await RcnScooping.findOne({
                    attributes: ['LotNo','scoopStatus','id'],
                    where: {
            
                        Scooping_Line_Mc: Scooping_Line_Mc,
                        LotNo: {
                            [Op.gt]: LotNo
                        }
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(nextEntry)
    
                if(nextEntry && nextEntry.dataValues.scoopStatus==0)
                {
                    let nextid=nextEntry.dataValues.id
                    console.log(nextEntry.dataValues.scoopStatus)
                    console.log(nextEntry.dataValues.LotNo)
                    let linecount = await RcnScooping.count({ where: { LotNo: nextEntry.dataValues.LotNo, Scooping_Line_Mc: Scooping_Line_Mc } })
                    console.log(linecount)
    
                    if(linecount>1)
                    {
                        const nextEntryid = await RcnScooping.findOne({
                            attributes: ['id'],
                            where: {
            
                                Scooping_Line_Mc: Scooping_Line_Mc,
                                LotNo: nextEntry.dataValues.LotNo,
                                Opening_Qty: {
                                    [Op.gt]: 0
                                }
            
                            },
                            order: [['LotNo', 'ASC']]
            
                        });
                        if(nextEntryid)
                        {
                            console.log(nextEntryid.dataValues.id)
                            await RcnScooping.update({
                                Opening_Qty:finalopen
                            }, { where: { id:nextEntryid.dataValues.id },transaction });
                            
                        }
                        else{
                            await RcnScooping.update({
                                Opening_Qty:finalopen
                            }, { where: { id:nextid },transaction });
                            
                        }
                    }
                    else
                    {
                        await RcnScooping.update({
                            Opening_Qty:finalopen
                        }, { where: { id:nextid },transaction });
                    }
    
    
                }
                
               else{
                console.log('Nothing To Update or Already Scooping Done')
               }
    
            }
            const deleteline=await RcnScoopingEdit.destroy({ where: { LotNo:LotNO } ,transaction}); 
            const deleteLot=await RcnAllEditScooping.destroy({ where: {LotNo:LotNO},transaction });

            if(deleteline && deleteLot){
                res.status(200).json({ message: "Scooping Entry Approved Successfully" });
            }else{
                return res.status(500).json({ message: "internal server Error"});
            }
        })
      

      
    }
    catch (err) {
        if(!res.headersSent){
            console.log(err)
            return res.status(500).json({ message: "Error while creating Scooping Entry" ,err});
        }
    }
       
}

export default updateScoopingOpeningEntire;