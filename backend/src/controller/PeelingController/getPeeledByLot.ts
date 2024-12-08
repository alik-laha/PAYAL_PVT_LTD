import { Request, Response } from "express";
import RcnPeeling from "../../model/peelingModel";

const getPeelingBylot = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const scoopingLot = await RcnPeeling.findAll({
            where: {
                LotNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Unpeeled Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Unpeeled Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getPeelingBylot;