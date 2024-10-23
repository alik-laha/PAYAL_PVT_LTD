import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import RcvVillageModel from "../../model/RcvVillageModel";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";




const updateApprovalGate = async (req: Request, res: Response) => {
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
                    approvalStatus: 1,
                    modifiedBy: feeledBy,
                    netWeight: netwt,
                    status: 'Pending_Release'
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
                    const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatepassNo,"gatepass_release",'RCN Cashew IN')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
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
                    const data = await WpMsgGatePassRcv("Packaging Material Incoming", gatepassNo,"gatepass_release",'Packaging Material Incoming')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
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
                    const data = await WpMsgGatePassRcv("Store Item Rcv/Dispatch", gatepassNo,"gatepass_release",'Store Item Rcv/Dispatch')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
                }
            }
            if (section === 'General' ) {
                const generalupdate = await generalPrimaryModel.update(
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
                    const data = await WpMsgGatePassRcv("General Item Rcv/Dispatch", gatepassNo,"gatepass_release",'General Item Rcv/Dispatch')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
                }
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
                    const data = await WpMsgGatePassRcv("Almond Rcv/Dispatch", gatepassNo,"gatepass_release",'Almond Item Rcv/Dispatch')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
                }
            }
            if (section === 'Village' ) {
                const generalupdate = await RcvVillageModel.update(
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
                    const data = await WpMsgGatePassRcv("Village Rcv/Dispatch", gatepassNo,"gatepass_release",'Village Item Rcv/Dispatch')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
                }
            }
            if (section === 'Agarbati' ) {
                const generalupdate = await agarbatiPrimaryEntryModel.update(
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
                    const data = await WpMsgGatePassRcv("Agarbati Rcv/Dispatch", gatepassNo,"gatepass_release",'Agarbati Item Rcv/Dispatch')
                    console.log(data)
                    return res.status(200).json({ message: "Gate Pass Details Modified and Approved Successfully" });
                }
            }
        }
        else{
            const gatepassupdate=await gatePassMaster.update(
                {         
                    billAmount:billamt,
                    approvalStatus:1,
                    Remarks:remarks,
                    modifiedBy: feeledBy,
                    status:'Pending_Release'
                },
                {
                    where: {
                        id:gatepassId
                    },
                }
            );
            if(gatepassupdate){
                if (section === 'RawCashew' && type === 'IN'){
                    const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatepassNo,"gatepass_release",'RCN Cashew IN')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });
                }
                if (section === 'PackagingMaterial' && type === 'IN'){
                    const data = await WpMsgGatePassRcv("Packaging Material Incoming", gatepassNo,"gatepass_release",'Packaging Material Incoming')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });

                }
                if (section === 'Store'){
                    const data = await WpMsgGatePassRcv("Store Entry/Dispatch", gatepassNo,"gatepass_release",'Store Entry/Dispatch')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });

                }
                if (section === 'General'){
                    const data = await WpMsgGatePassRcv("General Item Entry/Dispatch", gatepassNo,"gatepass_release",'General Item Rcv/Dispatch')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });

                }
                if (section === 'Almond'){
                    const data = await WpMsgGatePassRcv("Almond Entry/Dispatch", gatepassNo,"gatepass_release",'Almond Rcv/Dispatch')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });

                }
                if (section === 'Village'){
                    const data = await WpMsgGatePassRcv("Village Entry/Dispatch", gatepassNo,"gatepass_release",'Village Rcv/Dispatch')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });

                }
                if (section === 'Agarbati'){
                    const data = await WpMsgGatePassRcv("Agarbati Entry/Dispatch", gatepassNo,"gatepass_release",'Agarbati Rcv/Dispatch')
                    console.log(data)
                return res.status(200).json({ message: "Gate Pass Details Verified and Approved Successfully" });

                }
               
            }

        }

        
           



    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateApprovalGate;