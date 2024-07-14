import { Request, Response } from "express";



const updateScoopingOpening = async (req: Request, res: Response) => {

    // const nextEntry = await RcnScooping.findOne({
    //     attributes: ['LotNo','scoopStatus'],
    //     where: {

    //         Scooping_Line_Mc: Scooping_Line_Mc,
    //         LotNo: {
    //             [Op.gt]: LotNo
    //         }

    //     },
    //     order: [['LotNo', 'ASC']]

    // });
    // console.log(nextEntry)
    // //console.log(nextEntry.dataValues.scoopStatus)

    // if(nextEntry && nextEntry.dataValues.scoopStatus==0)
    //     {
            
    //         console.log(nextEntry.dataValues.scoopStatus)
    //         console.log(nextEntry.dataValues.LotNo)
    //         let linecount = await RcnScooping.count({ where: { LotNo: nextEntry.dataValues.LotNo, Scooping_Line_Mc: Scooping_Line_Mc } })
    //         console.log(linecount)
    //         if(linecount>1){

    //             const nextEntryid = await RcnScooping.findOne({
    //                 attributes: ['id'],
    //                 where: {
    
    //                     Scooping_Line_Mc: Scooping_Line_Mc,
    //                     LotNo: nextEntry.dataValues.LotNo,
    //                     Receiving_Qty: {
    //                         [Op.gt]: 0
    //                     }
    
    //                 },
    //                 order: [['LotNo', 'ASC']]
    
    //             });
    //             if(nextEntryid)
    //             {
    //                 // const nextentryupdate = RcnScooping.update{

    //                 // }
    //             }
    //         }

    //     }
       
}

export default updateScoopingOpening;