import { Request, Response } from "express";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import { Op } from "sequelize";

const SumOfallelement = async (req: Request, res: Response) => {
    try {
        const editDataCount = await QualityPackageMaterial.count({
            where: {
                editStatus: "Pending"
            }
        })
        const QCnotEntered = await PackagingMaterial.count({
            where: {
                qualityStatus: false,
                editStatus: {
                    [Op.notLike]: 'Pending'
                }
            }
        })
        return res.status(200).json({ editCount: editDataCount, QualityNotEntered: QCnotEntered })
    }
    catch (err) {
        console.log(err)
    }
}
export default SumOfallelement;