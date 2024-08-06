

import { Request, Response } from "express";

import RcnScooping from "../../model/scoopingModel";
import RcnAllScooping from "../../model/scoopingAllmodel";

const updateScoopingStatus = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const newSequence = req.body.lotNo;
      const desc = req.body.desc;

      await RcnScooping.update(
        {
            editStatus: desc
        },
        {
            where: {
                LotNo:newSequence
            },
        }
    );
    await RcnAllScooping.update(
        {
            editStatus: desc
        },
        {
            where: {
                LotNo:newSequence
            },
        }
    );
    
      // Save the new sequence to the database
 

      return res.status(201).json({ msg: `Lot No ${newSequence} is Updated` });
    
     

}
catch (err) {
    return res.status(500).json({ message: "Error in Updating Lot No.", err });
}
}
export default updateScoopingStatus;