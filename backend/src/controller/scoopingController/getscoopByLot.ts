import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

const getscoopByLot = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const scoopingLot = await RcnScooping.findAll({
            where: {
                LotNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
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

export default getscoopByLot;