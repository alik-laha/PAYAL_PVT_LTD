import { Request, Response } from "express";

import storePrimaryModel from "../../model/storePrimaryModel";

const getStorebyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await storePrimaryModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Store Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Store Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getStorebyGatePass;