import { Request, Response } from "express";

import RcnBorma from "../../model/bormaModel";

const CreateInitialBorma = async (req: Request, res: Response) => {

    try {
        const {  LotNo,
            origin,
            Wholes,
            Broken } = req.body.data2;
            const totalInput=Wholes+Broken
        
        const BormaInitial = await RcnBorma.create({
            LotNo:LotNo,
            origin:origin,
            InputWholes:Wholes,
            InputPieces:Broken, 
            TotalInput:Wholes+totalInput,
           

        });
        res.status(201).json({ message: "Borma Initial Entry Made Successfully", BormaInitial });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default CreateInitialBorma;