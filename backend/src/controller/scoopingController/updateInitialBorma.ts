import { Request, Response } from "express";

import RcnBorma from "../../model/bormaModel";

const UpdateInitialBorma = async (req: Request, res: Response) => {

    try {
        const {  LotNo,
            origin,
            Wholes,
            Broken } = req.body.data2;

            const totalInput=parseFloat(Wholes)+parseFloat(Broken)
        
        const BormaInitial = await RcnBorma.update({
            InputWholes:Wholes,
            InputPieces:Broken, 
            TotalInput:totalInput,
           
        }, {
            where: {
                LotNo:LotNo,
            origin:origin
            }
        });
        res.status(201).json({ message: "Borma Initial Entry Updated Successfully", BormaInitial });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default UpdateInitialBorma;