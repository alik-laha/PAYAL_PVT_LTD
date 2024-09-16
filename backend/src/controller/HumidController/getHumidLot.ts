import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import Humidifier from "../../model/humidfierModel";

const getBormaLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await Humidifier.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('LotNo')),'LotNo']],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "UnHumided Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in UnHumided Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getBormaLot;