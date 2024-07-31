import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import { promises as fs } from "fs";

const ModifyQcPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiicate, remarks } = req.body;
        const name = req.cookies.user;
        const id = req.params.id;
        const files: any = req.files;
        let foodGradeCirtiFicateFile: string = "";
        let coaCirtificateFile: string = "";
        let damagePartsImage: any[] = [];
        const qualityPackageMaterial: any = await QualityPackageMaterial.findOne({ where: { id } });
        if (!qualityPackageMaterial) {
            return res.status(404).json({ error: "Quality Package Material not found" });
        }
        if (files.foodGradeCirtiFicateFile) {
            if (qualityPackageMaterial.foodGradeCirtiFicateFile) {
                fs.unlink(qualityPackageMaterial.foodGradeCirtiFicateFile);
            }
            foodGradeCirtiFicateFile = files.foodGradeCirtiFicateFile[0].path;
        }
        if (!files.foodGradeCirtiFicateFile) {
            foodGradeCirtiFicateFile = qualityPackageMaterial.foodGradeCirtiFicateFile;
        }
        if (files.coaCirtificateFile) {
            if (qualityPackageMaterial.coaCirtificateFile) {
                fs.unlink(qualityPackageMaterial.coaCirtificateFile);
            }
            coaCirtificateFile = files.coaCirtificateFile[0].path;
        }
        if (!files.coaCirtificateFile) {
            coaCirtificateFile = qualityPackageMaterial.coaCirtificateFile;
        }
        if (files.damagePartsImage) {
            if (qualityPackageMaterial.damageFile) {
                qualityPackageMaterial.damageFile.JSON.parse().map((file: any) => fs.unlink(file));
            }
            files.damagePartsImage.map((file: any) => damagePartsImage.push(file.path));
        }
        if (!files.damagePartsImage) {
            damagePartsImage = JSON.parse(qualityPackageMaterial.damageFile);
        }

        await QualityEditPackageMaterial.create({
            id: id,
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
            foodGradeCirtificateStatus: qualityPackageMaterial.foodGradeCirtificateStatus,
            foodGradeCirtiFicateFile: foodGradeCirtiFicateFile,
            coaCirtificateStatus: qualityPackageMaterial.coaCirtificateStatus,
            coaCirtificateFile: coaCirtificateFile,
            damageFile: JSON.stringify(damagePartsImage),
            createdBy: name,
            editStatus: "Pending"
        });
        const qualityPackageMaterialUpdate = await QualityPackageMaterial.update({ editStatus: "Pending" }, { where: { id } });
        if (!qualityPackageMaterialUpdate) {
            return res.status(400).json({ error: "Quality Package Material not updated" });
        }
        return res.status(200).json({
            message: "Quality Package Material updated successfully"

        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default ModifyQcPackageMaterial;

