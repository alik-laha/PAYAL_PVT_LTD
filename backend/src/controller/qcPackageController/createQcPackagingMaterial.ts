import { Request, Response } from "express";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import RecivingPackageMaterial from "../../model/recevingPackagingMaterialModel";

const CreateQcPackagingMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiicate, remarks } = req.body;
        const name = req.cookies.user;
        console.log(req.files)
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
        let foodGradeCirtificateStatus: string = "NA";
        let coaCirtificateStatus: string = "NA";
        if (foodGradeCirtiFicateFile) {
            foodGradeCirtificateStatus = "Uploaded";
        }
        if (coaCirtificateFile) {
            coaCirtificateStatus = "Uploaded";
        }
        await QualityPackageMaterial.update({
            testingDate,
            length,
            width,
            height,
            gsm,
            avgWeight,
            leakageTest,
            dropTest,
            sealCondition,
            labelingCondition,
            coa,
            foodGradeCirtiicate,
            remarks,
            qualityStatus: true,
            createdBy: name,
            foodGradeCirtiFicateFile,
            coaCirtificateFile,
            damageFile: JSON.stringify(damagePartsImage),
            foodGradeCirtificateStatus,
            coaCirtificateStatus
        }, { where: { id: req.params.id } });

        await RecivingPackageMaterial.update({ qualityStatus: true }, { where: { id: req.params.id } });

        return res.status(200).json({ message: "Quality Package Material created successfully" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default CreateQcPackagingMaterial;