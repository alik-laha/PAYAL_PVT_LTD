import { Request, Response } from "express";

import RcnPrimary from "../../model/RcnEntryModel";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";


const deletegatepassSection= async (req: Request, res: Response) => {
    try {
        const {id,section} = req.params;

        if(section==='Raw Cashew')
        await RcnPrimary.destroy({
            where: {
                gatePassNo: id
            }
        });
        if(section==='Packaging Material')
            await PackagingMaterial.destroy({
                where: {
                    gatePassNo: id
                }
            });
        
        
        return res.status(200).json({ message: "GatePass has deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deletegatepassSection;