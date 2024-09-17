import { Request, Response } from "express";
import Humidifier from "../../model/humidfierModel";

const getHumidBylot = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const scoopingLot = await Humidifier.findAll({
            where: {
                LotNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "UnHumid Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in UnHumid Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getHumidBylot;