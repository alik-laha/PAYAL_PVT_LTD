import { Request, Response } from "express";

import gatePassMaster from "../../model/gatePassMasterModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";

import VendorName from "../../model/vendorNameModel";

const updateAlmondPrimaryEntry = async (req: Request, res: Response) => {
    try {
        let { id,origin,  gateType,blNo,conNo, noOfBags,gatepass,Vendor } = req.body;
        // const date = new Date();
        const receivedBy = req.cookies.user;
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
       
        let vendorData = await VendorName.findOne({ where: { vendorName:Vendor,type:vendortype,section:'Almond' } });
        if( !vendorData){
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }
      
        else{
            const almondupdate=await almondPrimaryEntryModel.update({
                invoice:blNo,
                invoicedate:conNo,
                noOfBags,
                type:origin,
                createdBy:receivedBy,
                vendorName:Vendor,
                
                status:1}, {
                    where: {
                        id: id
                    }
                });
                if (almondupdate){
                const gatepassupdate=await gatePassMaster.update({receivingStatus:1}, {
                    where: {
                        gatePassNo: gatepass,
                        section:'Almond'
                    }
                });
                if(gatepassupdate){
                const data = await WpMsgGatePassRcv("Almond Entry", gatepass,"rcv_dispatch_complt",'Almond IN/OUT')
                console.log(data)
                res.status(201).json({ message: "Almond Primary Entry is Created Successfully" });
        }
     
           
                }
       
            }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default updateAlmondPrimaryEntry;

