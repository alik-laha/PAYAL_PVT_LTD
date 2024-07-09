import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";

const getprevScoop = async (req: Request, res: Response) => {

    try {
        //let finalSum=0;
        const lineNo=req.body.ScoopingLine
        const currentlotNo=req.body.lotNO
         // Get the latest sequence ID from the database
        const latestEntry = await RcnScooping.findOne({
            attributes: ['LotNo'],
            where:{
                
                Scooping_Line_Mc:lineNo,
                LotNo:{
                    [Op.lt]:currentlotNo
                }

            },
        order: [['LotNo', 'DESC']] 
       
        });
        console.log(latestEntry)
       
        if(latestEntry){
            const prevLot=latestEntry.dataValues.LotNo
            const finalSum = await RcnScooping.findAll({
                    attributes: [
                        'Scooping_Line_Mc',
                        [sequelize.fn('sum', sequelize.col('Uncut')), 'totalUncut'],
                        [sequelize.fn('sum', sequelize.col('Unscoop')), 'totalUnscoop'],
                        [sequelize.fn('sum', sequelize.col('NonCut')), 'totalNonCut'],
                   
                    ],
                    where: {
                        LotNo:  `${prevLot}`,
                        Scooping_Line_Mc:lineNo,
                            
                    },
                    group: ['Scooping_Line_Mc']
                });
                console.log(finalSum)
                if(finalSum){
                    res.status(200).json({ message: "Previous Cutting",finalSum });
                }
                else{
                    res.status(200).json({ message: "Previous Cutting Not Found" });
                }
                
        }

        else{
            res.status(200).json({ message: "Previous Cutting Not Found" });
        }
      
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export default getprevScoop