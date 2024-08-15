import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";

const getRcnByGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await RcnPrimary.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried RCN Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in UnEntried RCN Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getRcnByGatePass;