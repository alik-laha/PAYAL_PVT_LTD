import { Request, Response, NextFunction } from "express";

const assetMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { machineId, machinename, section, machinestatus, id } = req.body;
        if (!machineId || !machinename || !section || !machinestatus || !id) {
            return res.status(400).json({ message: "All field are required" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}
export default assetMiddleWare