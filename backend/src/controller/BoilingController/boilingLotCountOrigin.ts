import { Request, Response } from "express";

import lotoriginmodel from "../../model/lotoriginModel";



const countPendingLotOrigin = async (req: Request, res: Response) => {
  
   
       
        try {
            const lotNo = req.body.lotNo;
        
            const origin = req.body.origin
            
            const scoopingLot = await lotoriginmodel.findAll({
                
                attributes: ['editStatus', 'latest_section'],
                where: {
                    LotNo:lotNo,
                    origin:origin
                }
    
            });
            if(scoopingLot){
                res.status(200).json({ message: "Entry and Status Found", scoopingLot });
            }
            else{
                res.status(500).json({ message: "Error in Finding Entry"});
            }
           
    
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
}
export default countPendingLotOrigin;