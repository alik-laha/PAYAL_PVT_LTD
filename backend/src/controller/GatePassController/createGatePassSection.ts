import { Request, Response } from "express";

import RcnPrimary from "../../model/RcnEntryModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";



const CreateGatePassSection = async (req: Request, res: Response) => {
try{
    const { gatePassNo, Date, vehicle, grossWt,section,type
        } = req.body.data;

    if (section==='RawCashew' && type==='IN') {
        const RCNIncoming = await RcnPrimary.create({
            gatePassNo: gatePassNo,
            date: Date,
            grossWt:grossWt,
            truckNo:vehicle,    
        });
        

        if(RCNIncoming){
            const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatePassNo,"gatepass_rcv_dispatch",'RCN Cashew IN')
            console.log(data)
            return res.status(200).json({ message: "RCN Initial Entry Created Successfully" });
        }
        
    }
    if (section==='PackagingMaterial' && type==='IN') {
        const PCIncoming = await PackagingMaterial.create({
            gatePassNo: gatePassNo,
            recevingDate: Date,
            grossWt:grossWt,
            truckNo:vehicle,    
        });
        const data = await WpMsgGatePassRcv("Packaging Material Incoming", gatePassNo,"gatepass_rcv_dispatch",'PC IN')
        console.log(data)

        if(PCIncoming){
            return res.status(200).json({ message: "PC Initial Entry Created Successfully" });
        }
        
    }
    if (section==='Store') {
        const storeEntry = await storePrimaryModel.create({
            gatePassNo: gatePassNo,
            recevingDate: Date,
            grossWt:grossWt,
            truckNo:vehicle,  
            gateType:type

        });
        const data = await WpMsgGatePassRcv("Store Item Entry", gatePassNo,"gatepass_rcv_dispatch",'STORE ENTRY')
        console.log(data)

        if(storeEntry){
            return res.status(200).json({ message: "Store Entry Created Successfully" });
        }
        
    }
    
    return res.status(200).json({ message: "Gate Pass created Sucessfully" });
}
catch (err) {
    return res.status(500).json({ message: "Error in Creating GatePass", err });
}

}
export default CreateGatePassSection;