import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";
import RcnBorma from "../../model/bormaModel";

const getBormaLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await RcnBorma.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('LotNo')),'LotNo']],
            where: {
                scoopStatus:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Unboiled Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Unboiled Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getBormaLot;