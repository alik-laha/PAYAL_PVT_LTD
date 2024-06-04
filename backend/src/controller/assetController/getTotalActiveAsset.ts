import { Request, Response } from "express";
import Asset from "../../model/assetModel";


const getTotalActiveAsset = async (req: Request, res: Response) => {
    try {
        const Data = await Asset.count({ distinct:true,col:'machineID',
            where: { status: 'Active' } });
        res.status(200).json({ message: "Active Asset Count", Data });
    }
    catch (err) {
        res.status(500).json({ message: "Error in ActiveAssetCount", error: err });
    }
}
export default getTotalActiveAsset;