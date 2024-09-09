import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import RcnPrimary from "../../model/RcnEntryModel";
import sequelize from "../../config/databaseConfig";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";



const updateNetWeight = async (req: Request, res: Response) => {
    try {
        const gatepassId = req.params.id
        const { netWeight,section,type,gatepassNo } = req.body;
        const gatepassupdate = await gatePassMaster.update(
            { 
                netWeight:netWeight,
                status:'Pending Approval'
            },
            {
                where: {
                    id:gatepassId
                },
            }
        );
        if(gatepassupdate){
            if (section==='RawCashew' && type==='IN') {

                const rcnincomingUpdate = await RcnPrimary.update(
                    { 
                        netWeight:netWeight,
                        difference:sequelize.literal(`netWeight-blWeight`),
                        systemBags:(netWeight/80).toFixed(2)
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },
                    }
                );
        
                if(rcnincomingUpdate){
                    const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatepassNo,"verify_gatepass_final",'RCN Cashew IN')
            console.log(data)
                    return res.status(201).json({ message: `NetWeight of Gatepass ID ${gatepassNo} is Updated` });
                }
                
            }
            if (section==='PackagingMaterial' && type==='IN') {

                const pmupdate = await PackagingMaterial.update(
                    { 
                        netWeight:netWeight,
                     
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },
                    }
                );
        
                if(pmupdate){
                    const data = await WpMsgGatePassRcv("Packaging Material Incoming", gatepassNo,"verify_gatepass_final",'Packaging Material Incoming')
            console.log(data)
                    return res.status(201).json({ message: `NetWeight of Gatepass ID ${gatepassNo} is Updated` });
                }
                
            }
            if (section==='Store') {

                const pmupdate = await storePrimaryModel.update(
                    { 
                        netWeight:netWeight,
                     
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },
                    }
                );
        
                if(pmupdate){
                    const data = await WpMsgGatePassRcv("Store Entry/Dispatch", gatepassNo,"verify_gatepass_final",'Store Entry/Dispatch')
            console.log(data)
                    return res.status(201).json({ message: `NetWeight of Gatepass ID ${gatepassNo} is Updated` });
                }
                
            }
            if (section==='General') {

                const generalupdate = await generalPrimaryModel.update(
                    { 
                        netWeight:netWeight,
                     
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },
                    }
                );
        
                if(generalupdate){
                    const data = await WpMsgGatePassRcv("General Item Entry/Dispatch", gatepassNo,"verify_gatepass_final",'General Item Entry/Dispatch')
            console.log(data)
                    return res.status(201).json({ message: `NetWeight of Gatepass ID ${gatepassNo} is Updated` });
                }
                
            }
            if (section==='Almond') {

                const generalupdate = await almondPrimaryEntryModel.update(
                    { 
                        netWeight:netWeight,
                     
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },
                    }
                );
        
                if(generalupdate){
                    const data = await WpMsgGatePassRcv("Almond Entry/Dispatch", gatepassNo,"verify_gatepass_final",'Almond Entry/Dispatch')
            console.log(data)
                    return res.status(201).json({ message: `NetWeight of Gatepass ID ${gatepassNo} is Updated` });
                }
                
            }
            
        }
        
     



    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateNetWeight;