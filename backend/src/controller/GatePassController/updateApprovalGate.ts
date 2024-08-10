import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";




const updateApprovalGate = async (req: Request, res: Response) => {
    try {
        const { vehicle, docNo, driver,drivercontact, grossWt, grossWtSlip, netwt,editmode ,type,section,gatepassNo,billamt} = req.body;
        const gatepassId = req.params.id
        const feeledBy = req.cookies.user;
        console.log(req.body)  
        
        if(editmode)
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
                        modifiedBy: feeledBy,
                        netWeight:netwt,
                        status:'Approved'
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
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
                }
            }
        }
        else{
            const gatepassupdate=await gatePassMaster.update(
                {         
                    billAmount:billamt,
                    approvalStatus:1,
                    modifiedBy: feeledBy,
                    status:'Approved'
                },
                {
                    where: {
                        id:gatepassId
                    },
                }
            );
            if(gatepassupdate){
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });
            }

        }

        
           



    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateApprovalGate;