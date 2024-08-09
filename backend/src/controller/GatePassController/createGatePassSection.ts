import { Request, Response } from "express";

import RcnPrimary from "../../model/RcnEntryModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";



const CreateGatePassSection = async (req: Request, res: Response) => {
try{
    const { gatePassNo, Date, vehicle, grossWt,section,type
        } = req.body.data;


    


    if (section==='Raw Cashew' && type==='IN') {
        const RCNIncoming = await RcnPrimary.create({
            gatePassNo: gatePassNo,
            date: Date,
            grossWt:grossWt,
            truckNo:vehicle,    
        });
        const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatePassNo,"gatepass_rcv_dispatch",'RCN Cashew IN')
        console.log(data)

        if(RCNIncoming){
            return res.status(200).json({ message: "RCN Initial Entry Created Successfully" });
        }
        
    }
    return res.status(200).json({ message: "Gate Pass created Sucessfully" });
}
catch (err) {
    return res.status(500).json({ message: "Error in Creating GatePass", err });
}

}
export default CreateGatePassSection;