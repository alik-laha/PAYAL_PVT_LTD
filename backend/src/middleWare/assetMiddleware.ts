import { Request, Response, NextFunction } from "express";

const assetMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { machineId, machinename, section, machinestatus } = req.body;
        if (!machineId || !machinename || !section || !machinestatus ) {
            return res.status(400).json({ message: "All fields Are Required" })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}
export default assetMiddleWare