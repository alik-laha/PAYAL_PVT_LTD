

import { Request, Response } from "express";
import LotNo from "../../model/lotNomodel";

const getStatusBoiling = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const LOTId = req.body.lotNo;
     
    
      // Save the new sequence to the database
      const lotStatus = await LotNo.findOne(
        ({ attributes: ['modifiedBy'],where: { lotNo:LOTId } })
      
        
    );

      return res.status(201).json({ msg: 'Lot No Status Found', lotStatus });
    
     

}
catch (err) {
    return res.status(500).json({ message: "Error in Updating Lot No.", err });
}
}
export default getStatusBoiling;