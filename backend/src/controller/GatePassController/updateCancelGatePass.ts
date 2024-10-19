import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import RcnPrimary from "../../model/RcnEntryModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import RcvVillageModel from "../../model/RcvVillageModel";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";



const updateCancelGatePass = async (req: Request, res: Response) => {
    try {
        const feeledBy = req.cookies.user
        const gatepassId = req.params.id
        const { section,type,gatepassNo,remarks } = req.body;
        const gatepassupdate = await gatePassMaster.update(
            { 
                Remarks:remarks,
                status:'Cancelled',
                modifiedBy:feeledBy    
            },
            {
                where: {
                    id:gatepassId
                },
            }
        );
        if(gatepassupdate){
            if (section==='RawCashew' && type==='IN') {
                const rcndelete=await RcnPrimary.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(rcndelete){
                    const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({ message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            }
            if (section==='PackagingMaterial' && type==='IN') {

                const pmdelete=await PackagingMaterial.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(pmdelete){
                    const data = await WpMsgGatePassRcv("Packaging Material", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({ message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            }
            if (section==='Store') {
                const pmdelete=await storePrimaryModel.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(pmdelete){
                    const data = await WpMsgGatePassRcv("Store Rcv/Dispatch", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({ message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            }
            if (section==='General') {

                const pmdelete=await generalPrimaryModel.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(pmdelete){
                    const data = await WpMsgGatePassRcv("General Rcv/Dispatch", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({  message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            }
            if (section==='Almond') {

                const pmdelete=await almondPrimaryEntryModel.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(pmdelete){
                    const data = await WpMsgGatePassRcv("Almond Rcv/Dispatch", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({ message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            }
            if (section==='Village') {

                const pmdelete=await RcvVillageModel.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(pmdelete){
                    const data = await WpMsgGatePassRcv("Village Rcv/Dispatch", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({ message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            } 
            if (section==='Agarbati') {

                const pmdelete=await agarbatiPrimaryEntryModel.destroy({
                    where: {
                        gatePassNo: gatepassNo
                    }
                });
        
                if(pmdelete){
                    const data = await WpMsgGatePassRcv("Agarbati Rcv/Dispatch", gatepassNo,"cancel_gatepass",feeledBy)
            console.log(data)
                    return res.status(201).json({ message: `Gatepass ID ${gatepassNo} is Canelled` });
                }
                
            }       
        }
    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateCancelGatePass;