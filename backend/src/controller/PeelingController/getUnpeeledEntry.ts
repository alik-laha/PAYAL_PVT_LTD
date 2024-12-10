import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import RcnPeeling from "../../model/peelingModel";

const getPeelingLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await RcnPeeling.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('LotNo')),'LotNo']],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Unpeeled Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Unpeeled Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getPeelingLot;