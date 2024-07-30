import { Request, Response } from "express";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";

const SumOfallelement = async (req: Request, res: Response) => {
    try {
        const editDataCount = await QualityPackageMaterial.count({
            where: {
                editStatus: "Pending"
            }
        })
        return res.status(200).json({ editCount: editDataCount })
    }
    catch (err) {
        console.log(err)
    }
}
export default SumOfallelement;