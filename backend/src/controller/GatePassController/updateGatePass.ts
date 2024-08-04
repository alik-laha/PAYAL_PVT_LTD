

import { Request, Response } from "express";
import gatePass from "../../model/gatepassModel";


const updateGatePass = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const gatePassNo = req.body.gatePassNo;
      const desc = req.body.status;
    
      // Save the new sequence to the database
      const gatepassupdate = await gatePass.update(
        { 
          status:desc
        },
        {
            where: {
                gatePassNo:gatePassNo
            },
        }
    );

      return res.status(201).json({ msg: `Lot No ${gatePassNo} is Updated`, gatepassupdate });
    
     

}
catch (err) {
    return res.status(500).json({ message: "Error in Updating Lot No.", err });
}
}
export default updateGatePass;