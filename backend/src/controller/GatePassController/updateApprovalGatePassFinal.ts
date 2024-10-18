import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";




const updateApprovalGateFinal = async (req: Request, res: Response) => {
    try {
        const { vehicle, docNo, driver,drivercontact, grossWt, grossWtSlip, netwt,editmode ,type,section,gatepassNo,billamt,remarks} = req.body;
        const gatepassId = req.params.id
        const feeledBy = req.cookies.user;
        console.log(req.body)  
        
        if(editmode)
        {
            await gatePassMaster.update(
                {
                    DocNo: docNo,
                    grosswt: grossWt,
                    grosswtNo: grossWtSlip,
                    vehicleNo: vehicle,
                    driverName: driver,
                    driverContact: drivercontact,
                    billAmount: billamt,
                    Remarks:remarks,
                    modifiedBy: feeledBy,
                    netWeight: netwt
                
                    
                },
                {
                    where: {
                        id: gatepassId
                    },
                }
            );
            if (section === 'RawCashew' && type === 'IN') {
                const rcnincomingUpdate = await RcnPrimary.update(
                    {
                        grossWt: grossWt,
                        truckNo: vehicle,
                        netWeight: netwt,
                        difference: sequelize.literal(`netWeight-blWeight`),
                        systemBags: (netwt / 80).toFixed(2)
                    },
                    {
                        where: {
                            gatePassNo: gatepassNo
                        },
                    }
                );
                if (rcnincomingUpdate) {
                    return res.status(200).json({ message: "Gate Pass Details Modified Successfully" });
                }
  
            }
            if (section === 'PackagingMaterial' && type === 'IN') {
                const pmupdate = await PackagingMaterial.update(
                    {
                        grossWt: grossWt,
                        truckNo: vehicle,
                        netWeight: netwt,
                     
                    },
                    {
                        where: {
                            gatePassNo: gatepassNo
                        },
                    }
                );
                if (pmupdate) {
                    return res.status(200).json({ message: "Gate Pass Details Modified Successfully" });
                }

               
            }
            if (section === 'Store' ) {
                const pmupdate = await storePrimaryModel.update(
                    {
                        grossWt: grossWt,
                        truckNo: vehicle,
                        netWeight: netwt,
                     
                    },
                    {
                        where: {
                            gatePassNo: gatepassNo
                        },
                    }
                );

                if (pmupdate) {
                    
                    return res.status(200).json({ message: "Gate Pass Details Modified Successfully" });
                }
            }
            if (section === 'General' ) {
               await generalPrimaryModel.update(
                    {
                        grossWt: grossWt,
                        truckNo: vehicle,
                        netWeight: netwt,
                     
                    },
                    {
                        where: {
                            gatePassNo: gatepassNo
                        },
                    }
                );

              
            }
            if (section === 'Almond' ) {
                const generalupdate = await almondPrimaryEntryModel.update(
                    {
                        grossWt: grossWt,
                        truckNo: vehicle,
                        netWeight: netwt,
                    },
                    {
                        where: {
                            gatePassNo: gatepassNo
                        },
                    }
                );
                if (generalupdate) {
                  
                    return res.status(200).json({ message: "Gate Pass Details Modified Successfully" });
                }          
            }
        }
        else{
            const gatepassupdate=await gatePassMaster.update(
                {         
                    billAmount:billamt,
                    Remarks:remarks,
                    modifiedBy: feeledBy
                },
                {
                    where: {
                        id:gatepassId
                    },
                }
            );
            if(gatepassupdate){
                return res.status(200).json({ message: "Gate Pass Details Modified Successfully" }); 
            }

        }
    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateApprovalGateFinal;