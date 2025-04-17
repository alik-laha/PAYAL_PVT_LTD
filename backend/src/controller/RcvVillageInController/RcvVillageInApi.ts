import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import RcvVillageInModel from "../../model/RcvVillageInModel";

export const getUnEntriedRcvVillageIn = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await RcvVillageInModel.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('gatePassNo')),'gatePassNo']],
            where: {
                status:status
            }

        });
        if(rcnLot){
            res.status(200).json({ message: "UnEntried Village In Primary Items Found", rcnLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const getRcvVillageInbyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await RcvVillageInModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Village In Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}