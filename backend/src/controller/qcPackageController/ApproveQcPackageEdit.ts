import { Request, Response } from "express";
import QualityPackage from "../../model/qualityPacjkageMaterial";
import QualityEditPackage from "../../model/editQualityPackageMaterial";


const ApproveQcPackageEdit = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.cookies.user;
        const qcPackageEdit: any = await QualityEditPackage.findOne({ where: { id } });
        if (!qcPackageEdit) {
            return res.status(404).json({ error: "Quality Package Edit not found" });
        }
        const qualityPackage = await QualityPackage.findOne({ where: { id } });
        if (!qualityPackage) {
            return res.status(404).json({ error: "Quality Package not found" });
        }
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiicate, remarks } = qcPackageEdit;

        await QualityPackage.update({
            testingDate: testingDate,
            length: length,
            width: width,
            height: height,
            gsm: gsm,
            avgWeight: avgWeight,
            leakageTest: leakageTest,
            dropTest: dropTest,
            sealCondition: sealCondition,
            labelingCondition: labelingCondition,
            coa: coa,
            foodGradeCirtiicate: foodGradeCirtiicate,
            remarks: remarks,
            foodGradeCirtificateStatus: qcPackageEdit.foodGradeCirtificateStatus,
            foodGradeCirtiFicateFile: qcPackageEdit.foodGradeCirtiFicateFile,
            coaCirtificateStatus: qcPackageEdit.coaCirtificateStatus,
            coaCirtificateFile: qcPackageEdit.coaCirtificateFile,
            damageFile: qcPackageEdit.damageFile,
            approvedBy: name,
            editStatus: "Approved"
        }, { where: { id } });
        await QualityEditPackage.destroy({ where: { id } });
        return res.status(200).json({ message: "Quality Package Edit Approved" });

    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export default ApproveQcPackageEdit;