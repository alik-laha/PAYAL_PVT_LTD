import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

const getscoopByLotOrigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.body.lotNO
        const origin=req.body.origin
        console.log(lotNO)
        console.log(origin)
        const scoopingLot = await RcnScooping.findAll({
            where: {
                LotNo:lotNO,
                origin:origin
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

export default getscoopByLotOrigin;