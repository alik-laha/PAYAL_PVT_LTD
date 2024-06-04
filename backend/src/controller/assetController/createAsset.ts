import { Request, Response } from "express";
import Asset from "../../model/assetModel";


const createAsset = async (req: Request, res: Response) => {
    try {
        const { machineId, machinename, section, machinestatus, description } = req.body;
        // const createdBy = req.cookies.user;
        const createdBy = "Admin-M";
       
        const user = await Asset.create({ machineID:machineId, machineName:machinename,
            description, status:machinestatus, section,  createdBy });
        if (user) {
            return res.status(201).json({ message: "New Asset has been Created" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default createAsset;
