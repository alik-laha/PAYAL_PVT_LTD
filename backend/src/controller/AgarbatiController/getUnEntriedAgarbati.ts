import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";

const getUnEntriedAgarbati = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await agarbatiPrimaryEntryModel.findAll({
            
            attributes:[[sequelize.fn('DISTINCT',sequelize.col('gatePassNo')),'gatePassNo']],
            where: {
                status:status
            }

        });
        if(rcnLot){
            res.status(200).json({ message: "UnEntried Agarbati Found", rcnLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Agarbati Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getUnEntriedAgarbati;