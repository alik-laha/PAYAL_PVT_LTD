import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";

const ModifyQcPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiicate, remarks } = req.body;
        const name = req.cookies.user;
        const id = req.params.id;
        const files: any = req.files;
        let foodGradeCirtiFicateFile: string = "";
        let coaCirtificateFile: string = "";
        let damagePartsImage: string[] = [];
        if (files.foodGradeCirtiFicateFile) {
            foodGradeCirtiFicateFile = files.foodGradeCirtiFicateFile[0].path;
        }
        if (files.coaCirtificateFile) {
            coaCirtificateFile = files.coaCirtificateFile[0].path;
        }
        if (files.damagePartsImage) {
            files.damagePartsImage.map((file: any) => damagePartsImage.push(file.path));
        }
        const qualityPackageMaterial: any = await QualityPackageMaterial.findOne({ where: { id } });
        if (!qualityPackageMaterial) {
            return res.status(404).json({ error: "Quality Package Material not found" });
        }
        await QualityEditPackageMaterial.create({
            testingDate: qualityPackageMaterial.testingDate,
            length: qualityPackageMaterial.length,
            width: qualityPackageMaterial.width,
            height: qualityPackageMaterial.height,
            gsm: qualityPackageMaterial.gsm,
            avgWeight: qualityPackageMaterial.avgWeight,
            leakageTest: qualityPackageMaterial.leakageTest,
            dropTest: qualityPackageMaterial.dropTest,
            sealCondition: qualityPackageMaterial.sealCondition,
            labelingCondition: qualityPackageMaterial.labelingCondition,
            coa: qualityPackageMaterial.coa,
            foodGradeCirtiicate: qualityPackageMaterial.foodGradeCirtiicate,
            remarks: qualityPackageMaterial.remarks,
            foodGradeCirtificateStatus: qualityPackageMaterial.foodGradeCirtificateStatus,
            foodGradeCirtiFicateFile: qualityPackageMaterial.foodGradeCirtiFicateFile,
            coaCirtificateStatus: qualityPackageMaterial.coaCirtificateStatus,
            coaCirtificateFile: qualityPackageMaterial.coaCirtificateFile,
            damageFile: qualityPackageMaterial.damageFile,
            qualityPackageMaterialId: qualityPackageMaterial.id,
            createdBy: qualityPackageMaterial.createdBy,
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default ModifyQcPackageMaterial;

