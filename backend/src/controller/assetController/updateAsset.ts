import { Request, Response } from "express";
import Asset from "../../model/assetModel";

const UpdateAsset = async (req: Request, res: Response) => {
    try {
        const { machineId, machinename, section, machinestatus, description, id ,primary} = req.body;
        const modifyedBy = req.cookies.user
        await Asset.update({
            machineID: machineId, machineName: machinename,primaryAsset:primary,
            description, status: machinestatus, section,modifiedBy:modifyedBy
        }, {
            where: {
                id: id
            }
        });

        return res.status(200).json({ message: "Asset updated successfully" })

    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export default UpdateAsset