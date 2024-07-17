import { Request, Response } from "express";

import RcnBorma from "../../model/bormaModel";

const CreateInitialScooping = async (req: Request, res: Response) => {

    try {
        const { Wholes,Broken,sizeName,size,origin,rcvQuantity,openQuantity } = req.body.data2;
        
        const BormaInitial = await RcnBorma.create({
            LotNo:ScoopingLine,
            origin:size,
            InputWholes:sizeName,
            InputPieces, 
            TotalInput:columnLotNo,
           

        });
        res.status(201).json({ message: "Scooping Initial Entry Made Successfully", BormaInitial });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default BormaInitial;