import { Request, Response } from "express";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";

const getAgarbatiByGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await agarbatiPrimaryEntryModel.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried Agarbati Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in UnEntried Agarbati Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getAgarbatiByGatePass;