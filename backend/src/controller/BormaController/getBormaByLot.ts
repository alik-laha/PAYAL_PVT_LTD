import { Request, Response } from "express";
import RcnBorma from "../../model/bormaModel";

const getBormaBylot = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const scoopingLot = await RcnBorma.findAll({
            where: {
                LotNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "UnBorma Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in UnBorma Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getBormaBylot;