import { Request, Response } from "express";
import gatePassMaster from "../../model/gatePassMasterModel";
import sequelize from "../../config/databaseConfig";
import RcnPrimary from "../../model/RcnEntryModel";




const updateReleaseGate = async (req: Request, res: Response) => {
    try {
        const gatepassId = req.params.id
        const outtime = req.body.outtime
        //console.log(req.body)
        const gatepassupdate=await gatePassMaster.update(
            {               
                status:'Closed',
                OutTime:outtime
            },
            {
                where: {
                    id:gatepassId
                },
            }
        );
            
        if(gatepassupdate){
            return res.status(200).json({ message: "Vehicle is Now Released" });
        }


    }
 catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
}
}
export default updateReleaseGate;