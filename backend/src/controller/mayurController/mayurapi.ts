import { Request, Response } from "express";


import Mayur from "../../model/mayurModel";

export const getMayurLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await Mayur.findAll({
            
            attributes: ['LotNo', 'origin'],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un Mayur Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Mayur Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export const getMayurBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await Mayur.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['id', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un Mayur Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Mayur Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

