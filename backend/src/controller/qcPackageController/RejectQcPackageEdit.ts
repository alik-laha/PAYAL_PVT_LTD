import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";
import QualityPackage from "../../model/qualityPacjkageMaterial";

const RejectQcPackageEdit = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.cookies.user;
        const qcPackageEdit: any = await QualityEditPackageMaterial.findOne({ where: { id } });
        if (!qcPackageEdit) {
            return res.status(404).json({ error: "Quality Package Edit not found" });
        }
        await QualityEditPackageMaterial.destroy({ where: { id } });
        await QualityPackage.update({
            editStatus: "Rejected",
            approvedBy: name
        }, { where: { id } });
        return res.status(200).json({ message: "Quality Package Edit Rejected" });
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export default RejectQcPackageEdit;