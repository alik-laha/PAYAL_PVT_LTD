

import { Request, Response } from "express";
import LotNo from "../../model/lotNomodel";

const updateLotNo = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const newSequence = req.body.lotNo;
    
      // Save the new sequence to the database
      const lotupdate = await LotNo.update(
        { 
          modifiedBy:'Boiling'
        },
        {
            where: {
                lotNo:newSequence
            },
        }
    );

      return res.status(201).json({ msg: `Lot No ${newSequence} is Updated`, lotupdate });
    
     

}
catch (err) {
    return res.status(500).json({ message: "Error in Updating Lot No.", err });
}
}
export default updateLotNo;