

import { Request, Response } from "express";
import LotNo from "../../model/lotNomodel";
import VLotNo from "../../model/vlotNomodel";

export const getStatusBoiling = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const LOTId = req.body.lotNo;
     
    
      // Save the new sequence to the database
      const lotStatus = await LotNo.findOne(
        ({ where: { lotNo:LOTId } })
      
        
    );

      return res.status(201).json({ msg: 'Lot No Status Found', lotStatus });
    
     

}
catch (err) {
    return res.status(500).json({ message: "Error in Updating Lot No.", err });
}
}

export const getStatusBoilingVil = async (req: Request, res: Response) => {
  try{
  
        // Generate the new sequence
        const LOTId = req.body.lotNo;
       
      
        // Save the new sequence to the database
        const lotStatus = await VLotNo.findOne(
          ({ where: { vlotNo:LOTId } })
        
          
      );
  
        return res.status(201).json({ msg: 'VLot No Status Found', lotStatus });
      
       
  
  }
  catch (err) {
      return res.status(500).json({ message: "Error in Updating VLot No.", err });
  }
  }
