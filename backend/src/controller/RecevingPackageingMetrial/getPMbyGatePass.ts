import { Request, Response } from "express";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";

const getPMbyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const rcnmainLot = await PackagingMaterial.findAll({
            where: {
                gatePassNo:lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if(rcnmainLot){
            res.status(200).json({ message: "UnEntried PM Entry", rcnmainLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried PM Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getPMbyGatePass;