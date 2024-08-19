import { Request, Response } from "express";

import generalPrimaryModel from "../../model/generalPrimaryModel";

const getGeneralbyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await generalPrimaryModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried General Item Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried General item Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getGeneralbyGatePass;