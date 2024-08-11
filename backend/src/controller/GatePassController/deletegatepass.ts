import { Request, Response } from "express";

import gatePass from "../../model/gatepassModel";
import gatePassMaster from "../../model/gatePassMasterModel";


const deletegatepass= async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await gatePass.destroy({
            where: {
                gatePassNo: id
            }
        });
        await gatePassMaster.destroy({
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
export default deletegatepass;