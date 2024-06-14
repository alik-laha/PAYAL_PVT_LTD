import { Request, Response } from "express";
import Asset from "../../model/assetModel";


const getTotalActiveAsset = async (req: Request, res: Response) => {
    try {
        const Data = await Asset.count({ distinct:true,col:'machineID',
            where: { status: 'Active' } });
            const inactive = await Asset.count({ distinct:true,col:'machineID',
                where: { status: 'Inactive' } });
                const Dicarded = await Asset.count({ distinct:true,col:'machineID',
                    where: { status: 'Discarded' } });
        res.status(200).json({ message: "Asset Count", Data,inactive,Dicarded });
    }
    catch (err) {
        res.status(500).json({ message: "Error in ActiveAssetCount", error: err });
    }
}
export default getTotalActiveAsset;