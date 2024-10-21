import { Request, Response } from "express";
import { RcnPrimary } from "../../model/indexmapping";
import gatePassMaster from "../../model/gatePassMasterModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";

const CreateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        let { id,origin, blNo, conNo,  blWeight, noOfBags,gatepass } = req.body;
        // const date = new Date();
        const receivedBy = req.cookies.user;
        // const receivedBy = "RC User 1";
        //let difference = netWeight -blWeight ;
        // const rcnPrimaryExists = await RcnPrimary.findOne({ where: { blNo, conNo } });
        // if (rcnPrimaryExists) {
        //     return res.status(400).json({ message: "Entry Already Exists With this Bl-No and Con-No" });
        // }

        if(!blNo){
            blNo='LOCAL PURCHASE'
        }
        if(!conNo){
            conNo='NO CONTAINER'
        }

        const rcnupdate=await RcnPrimary.update({
           
            blNo,
            conNo,
            blWeight,
            noOfBags,
            origin,
            receivedBy,
            status:1}, {
                where: {
                    id: id
                }
        });
        if (rcnupdate){
            const gatepassupdate=await gatePassMaster.update({receivingStatus:1,status:'Pending_NetWeight'}, {
                where: {
                    gatePassNo: gatepass,
                    section:'RawCashew'
                }
        });
        if(gatepassupdate){
            const data = await WpMsgGatePassRcv("RCN Incoming", gatepass,"rcv_dispatch_complt",'RCN Cashew IN')
            console.log(data)
            res.status(201).json({ message: "Rcn Primary Entry is Created Successfully" });
        }
        }
        
     

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default CreateRcnPrimaryEntry;

