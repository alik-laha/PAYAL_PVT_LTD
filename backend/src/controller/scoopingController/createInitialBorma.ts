import { Request, Response } from "express";

import RcnBorma from "../../model/bormaModel";

const CreateInitialBorma = async (req: Request, res: Response) => {

    try {
        const {  LotNo,
            origin,
            Wholes,
            Broken } = req.body.data2;

            const id=req.body.p_id

            const totalInput=parseFloat(Wholes)+parseFloat(Broken)
        
        const BormaInitial = await RcnBorma.create({
            id,
            LotNo:LotNo,
            origin:origin,
            InputWholes:Wholes,
            InputPieces:Broken, 
            TotalInput:totalInput,
           

        });
        if(BormaInitial){
            res.status(201).json({ message: "Borma Initial Entry Made Successfully", BormaInitial });
        }
        

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default CreateInitialBorma;