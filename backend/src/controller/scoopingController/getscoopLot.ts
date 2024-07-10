import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";
import sequelize from "../../config/databaseConfig";

const getscoopLot = async (req: Request, res: Response) => {

    try {
    
        const scoopingLot = await RcnScooping.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('LotNo')),'LotNo']],
            where: {
                scoopStatus:0
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "UnScooped Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Unscooped Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getscoopLot;