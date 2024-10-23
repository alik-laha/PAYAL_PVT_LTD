import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

import sequelize from "../../config/databaseConfig";



const deleteScoopingReport = async (req: Request, res: Response) => {
    

    try{
    const LotNo = req.body.lotNo
    await RcnScooping.update(
        {
            Receiving_Qty:sequelize.literal('1*Size'),
            date: null,
            Wholes:null,
            Broken:null,
            Unscoop:null,
            Uncut:null,
            NonCut:null,
            Rejection:null,
            Dust:null,
            KOR:null,
            Trolley_Broken:null,
            Trolley_Small_JB:null,
            scoopStatus:0,
            noOfGents:null,
            noOfLadies:null,
            noOfSupervisors:null,
            noOfEmployees:null,
            noOfOperators:null,
            CreatedBy:null,
            Mc_runTime:null,
            Brkdwn_reason:null,
            Mc_breakdown:null,
            otherTime:null,
            Mc_on:null,
            Mc_off:null,
            Transfered_Qty:null,
            Transfered_To:null

        },
        {
            where: {
                LotNo:LotNo
            },
        }
    );
    return res.status(200).json({ message: "Scooping Entry Is deleted successfully" })
}

    catch{
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export default deleteScoopingReport;