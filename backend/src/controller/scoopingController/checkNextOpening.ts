import { Request, Response } from "express";


import { Op } from "sequelize";
import RcnScooping from "../../model/scoopingModel";

const checkNextOpening = async (req: Request, res: Response) => {

    try {
        const LotNO = req.body.lotNo

        const nextEntry = await RcnScooping.findOne({
            where: {
                LotNo: {
                    [Op.gt]: LotNO
                }
    
            },
            order: [['LotNo', 'ASC']]
    
        });
        console.log(nextEntry)
        res.status(201).json({ message: "Next Lot Found Successfully", nextEntry });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default checkNextOpening;