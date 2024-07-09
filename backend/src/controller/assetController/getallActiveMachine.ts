import { Request, Response } from "express";
import Asset from "../../model/assetModel";

const getAllActiveMachineForDropDown = async (req: Request, res: Response) => {
    try {
        const asset = await Asset.findAll({
            where: {
                status: "Active"
            }
        });
        if (asset.length > 0) {
            res.status(200).json(asset);
        } else {
            res.status(404).json({ message: "No Machine Found" });
        }
    }
    catch (err) {
        res.status(400).json({ message: "internal server Error" });
        console.log(err);
    }

}
export default getAllActiveMachineForDropDown;