import { Request, Response } from "express";

import almondPrimaryEntryModel from "../../model/almondPrimaryModel";

const getAlmondByGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await almondPrimaryEntryModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Almond Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in UnEntried Almond Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getAlmondByGatePass;