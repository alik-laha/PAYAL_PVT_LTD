import { Request, Response } from "express";
import Asset from "../../model/assetModel";

const deleteMachine = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Asset.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: "Machine has been deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteMachine;