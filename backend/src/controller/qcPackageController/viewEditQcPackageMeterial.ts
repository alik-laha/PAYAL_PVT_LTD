import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";
import recevingPackageMaterial from "../../model/recevingPackagingMaterialModel";
import { Op } from "sequelize";

const viewEditQcPackageMeterial = async (req: Request, res: Response) => {
    try {

        const qcPackageEdit = await QualityEditPackageMaterial.findAll({
            order: [['testingDate', 'DESC']], // Order by date descending
            include: [{
                model: recevingPackageMaterial,
                required: true,
                where: {
                    qualityStatus: {
                        [Op.like]: false
                    }
                }
            }]
        }); // Include the recevingPackageMaterial model

        if (!qcPackageEdit) {
            return res.status(404).json({ error: "Quality Package Edit not found" });
        }
        return res.status(200).json(qcPackageEdit);
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export default viewEditQcPackageMeterial;