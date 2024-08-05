import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import RcnPrimary from "../../model/RcnEntryModel";



const CreateGatePassSection = async (req: Request, res: Response) => {
try{
    const { gatePassNo, Date, Time, vehicle,
        document,
            drivername,
            driverContact,
            grossWt,
            GrossWtSlip,
            SecName,section,type
        } = req.body.data;


    const feeledBy = req.cookies.user;


    if (section==='Raw Cashew' && type==='IN') {
        const RCNIncoming = await RcnPrimary.create({
            gatePassNo: gatePassNo,
            date: Date,
            grossWt:grossWt,
            truckNo:vehicle,    
        });

        if(RCNIncoming){
            return res.status(200).json({ message: "Gate Pass Entry Created Successfully" });
        }
        
    }
}
catch (err) {
    return res.status(500).json({ message: "Duplicate Lot No. or Error in Creating GatePass", err });
}

}
export default CreateGatePassSection;