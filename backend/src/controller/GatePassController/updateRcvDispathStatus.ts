

import { Request, Response } from "express";
import gatePass from "../../model/gatepassModel";
import gatePassMaster from "../../model/gatePassMasterModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";


const updateRcvDispathStatus = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const gatePassNo = req.body.gatePassNo;
      const section = req.body.section;
    
      // Save the new sequence to the database,'Packaging Material'
      const gatepassupdate=await gatePassMaster.update({receivingStatus:1}, {
        where: {
            gatePassNo: gatePassNo,
            section:section
        }
        });
        if(gatepassupdate){

            if(section==='Packaging Material'){
                const data = await WpMsgGatePassRcv("Packaging Material In", gatePassNo,"rcv_dispatch_complt",'Packaging Material IN')
                console.log(data)
                res.status(201).json({ message: "Gate Pass Rcv/Dispatch Status updated Successfully" });
            }

           
        }
   

}
catch (err) {
    return res.status(500).json({ message: "Error in Updating Rcv/Dispatch Status", err });
}
}
export default updateRcvDispathStatus;