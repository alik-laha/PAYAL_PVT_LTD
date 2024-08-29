import { Request, Response } from "express";


import RcvVillageModel from "../../model/RcvVillageModel";

const getRcvVillagebyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await RcvVillageModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Village Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Village Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getRcvVillagebyGatePass;