import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";




const updateApprovalGate = async (req: Request, res: Response) => {
    try {
        const { vehicle, docNo, driver,drivercontact, grossWt, grossWtSlip, netwt,editmode ,type,section,gatepassNo,billamt} = req.body;
        const gatepassId = req.params.id
        const feeledBy = req.cookies.user;
           
        
        if(editmode==='TRUE')
            {
                await gatePassMaster.update(
                    {         
                        DocNo:docNo,
                        grosswt: grossWt,
                        grosswtNo: grossWtSlip,
                        vehicleNo: vehicle,
                        driverName: driver,
                        driverContact:drivercontact,
                        billAmount:billamt,
                        approvalStatus:1,
                        modifiedBy: feeledBy
                    },
                    {
                        where: {
                            id:gatepassId
                        },
                    }
                );
                if (section==='Raw Cashew' && type==='IN')
                     {
                const rcnincomingUpdate = await RcnPrimary.update(
                    { 
                            grossWt:grossWt,
                            truckNo:vehicle, 
                            netWeight:netwt,
                            difference:sequelize.literal(`netWeight-blWeight`),
                            systemBags:(netwt/80).toFixed(2)
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },
                    }
                );
        
                if(rcnincomingUpdate){
                    return res.status(200).json({ message: "Gate Pass Approved With Modification Successfully" });
                }
            }
        }
        else{
            const gatepassupdate=await gatePassMaster.update(
                {         
                    billAmount:billamt,
                    approvalStatus:1,
                    createdBy: feeledBy
                },
                {
                    where: {
                        id:gatepassId
                    },
                }
            );
            if(gatepassupdate){
                return res.status(200).json({ message: "Gate pass Approved Successfully" });
            }

        }

        
           



    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateApprovalGate;