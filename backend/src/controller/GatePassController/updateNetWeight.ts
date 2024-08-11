import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import RcnPrimary from "../../model/RcnEntryModel";
import sequelize from "../../config/databaseConfig";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";


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
            if (section==='Raw Cashew' && type==='IN') {

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
                    const data = await WpMsgGatePassRcv("RCN Incoming Cashew", gatepassNo,"verify_gatepass",'RCN Cashew IN')
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