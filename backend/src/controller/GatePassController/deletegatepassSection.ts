import { Request, Response } from "express";

import RcnPrimary from "../../model/RcnEntryModel";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";


const deletegatepassSection= async (req: Request, res: Response) => {
    try {
        const {id,section} = req.params;

        if(section==='RawCashew'){
            await RcnPrimary.destroy({
                where: {
                    gatePassNo: id
                }
            });
        }
      
        if(section==='PackagingMaterial'){
            await PackagingMaterial.destroy({
                where: {
                    gatePassNo: id
                }
            });
        }
        if(section==='Store'){
            await storePrimaryModel.destroy({
                where: {
                    gatePassNo: id
                }
            });
        }
        if(section==='General'){
            await generalPrimaryModel.destroy({
                where: {
                    gatePassNo: id
                }
            });
        }
            
        
        
        return res.status(200).json({ message: "GatePass Section has deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deletegatepassSection;