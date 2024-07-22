import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";
import { Op } from "sequelize";



const updateScoopingOpening = async (req: Request, res: Response) => {


    try{
        const Scooping_Line_Mc=req.body.data3.Scooping_Line_Mc
        const uncut=req.body.data3.Uncut
        const unscoop=req.body.data3.Unscoop
        const noncut=req.body.data3.NonCut
        const finalopen=uncut+unscoop+noncut
        console.log(finalopen)
        const LotNo=req.body.data3.LotNo
        
    
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
        //console.log(nextEntry.dataValues.scoopStatus)
    
        if(nextEntry && nextEntry.dataValues.scoopStatus==0)
            {
                let nextid=nextEntry.dataValues.id
                console.log(nextEntry.dataValues.scoopStatus)
                console.log(nextEntry.dataValues.LotNo)
                let linecount = await RcnScooping.count({ where: { LotNo: nextEntry.dataValues.LotNo, Scooping_Line_Mc: Scooping_Line_Mc } })
                console.log(linecount)
                if(linecount>1){
    
                    const nextEntryid = await RcnScooping.findOne({
                        attributes: ['id'],
                        where: {
        
                            Scooping_Line_Mc: Scooping_Line_Mc,
                            LotNo: nextEntry.dataValues.LotNo,
                            Receiving_Qty: {
                                [Op.gt]: 0
                            }
        
                        },
                        order: [['LotNo', 'ASC']]
        
                    });
                    if(nextEntryid)
                    {
                        const nextentryupdate = await RcnScooping.update({
                            Opening_Qty:finalopen
                        }, { where: { id:nextEntryid.dataValues.id } });
                        return res.status(200).json({ message: "Updated", nextentryupdate});
                    }
                    else{
                        const nextentryupdate = await RcnScooping.update({
                            Opening_Qty:finalopen
                        }, { where: { id:nextid } });
                        return res.status(200).json({ message: "Updated", nextentryupdate});
                    }
                }
                else{
    
                    const nextentryupdate = await RcnScooping.update({
                        Opening_Qty:finalopen
                    }, { where: { id:nextid } });
                    return res.status(200).json({ message: "Updated", nextentryupdate});
                }
    
            }
            else{
    
                return res.status(200).json({ message: "Updation Not Required" });
            }
    }
    catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
       
}

export default updateScoopingOpening;