import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";



const CreateGatePassMaster = async (req: Request, res: Response) => {
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


    const GatePassEntry = await gatePassMaster.create({
        gatePassNo: gatePassNo,
        date: Date,
        time: Time,
        DocNo:document,
        type:type,
        grosswt: grossWt,
        grosswtNo: GrossWtSlip,
        vehicleNo: vehicle,
        driverName: drivername,
        driverContact:driverContact,
        securityName: SecName,
        section: section,
        createdBy: feeledBy
    });

    if (GatePassEntry) {
        return res.status(200).json({ message: "Gate Pass Entry Created Successfully" });
    }
}
catch (err) {
    return res.status(500).json({ message: "Duplicate Lot No. or Error in Creating GatePass", err });
}

}
export default CreateGatePassMaster;