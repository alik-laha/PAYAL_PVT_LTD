import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";

const viewEditQcPackageMeterial = async (req: Request, res: Response) => {
    try {
        const qcPackageEdit: any = await QualityEditPackageMaterial.findAll();
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