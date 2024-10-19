

import { Request, Response } from "express";

import gatePassMaster from "../../model/gatePassMasterModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";


const updateRcvDispathStatus = async (req: Request, res: Response) => {
try{

      // Generate the new sequence
      const gatePassNo = req.body.gatePassNo;
      const section = req.body.section;
    
      // Save the new sequence to the database,'Packaging Material'
      const gatepassupdate=await gatePassMaster.update({receivingStatus:1,status:'Pending_NetWeight'}, {
        where: {
            gatePassNo: gatePassNo,
            section:section
        }
        });
        if(gatepassupdate){

            if(section==='PackagingMaterial'){
                const data = await WpMsgGatePassRcv("Packaging Material Receiving", gatePassNo,"rcv_dispatch_complt",'Packaging Material IN')
                console.log(data)
                res.status(201).json({ message: "Gate Pass Rcv/Dispatch Status updated Successfully" });
            }
            if(section==='Store'){
                const data = await WpMsgGatePassRcv("Store Item Receiving/Dispatch", gatePassNo,"rcv_dispatch_complt",'Store Rcv/Dispatch')
                console.log(data)
                res.status(201).json({ message: "Gate Pass Rcv/Dispatch Status updated Successfully" });
            }
            if(section==='General'){
                const data = await WpMsgGatePassRcv("General Item Receiving/Dispatch", gatePassNo,"rcv_dispatch_complt",'General Rcv/Dispatch')
                console.log(data)
                res.status(201).json({ message: "Gate Pass Rcv/Dispatch Status updated Successfully" });
            }
            if(section==='Almond'){
                const data = await WpMsgGatePassRcv("Almond Receiving/Dispatch", gatePassNo,"rcv_dispatch_complt",'Almond Rcv/Dispatch')
                console.log(data)
                res.status(201).json({ message: "Gate Pass Rcv/Dispatch Status updated Successfully" });
            }
            if(section==='Village'){
                const data = await WpMsgGatePassRcv("Village Receiving/Dispatch", gatePassNo,"rcv_dispatch_complt",'Village Rcv/Dispatch')
                console.log(data)
                res.status(201).json({ message: "Gate Pass Rcv/Dispatch Status updated Successfully" });
            }
            if(section==='Agarbati'){
                const data = await WpMsgGatePassRcv("Agarbati Receiving/Dispatch", gatePassNo,"rcv_dispatch_complt",'Agarbati Rcv/Dispatch')
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