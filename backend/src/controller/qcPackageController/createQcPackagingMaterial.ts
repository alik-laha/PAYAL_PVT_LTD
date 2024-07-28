import { Request, Response } from "express";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import RecivingPackageMaterial from "../../model/recevingPackagingMaterialModel";

const CreateQcPackagingMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiFicate, remarks } = req.body;
        const name = req.cookies.user;
        console.log(req.files)
        const files: any = req.files;
        const foodGradeCirtiFicateFile = files.foodGradeCirtiFicateFile[0].path;
        const coaCirtificateFile = files.coaCirtificateFile[0].path;
        const damagePartsImage = files.damagePartsImage.map((file: any) => file.path);
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
            foodGradeCirtiicate: foodGradeCirtiFicate,
            remarks,
            qualityStatus: true,
            qcBy: name,
            foodGradeCirtiFicateFile,
            coaCirtificateFile,
            damageFile: JSON.stringify(damagePartsImage),
            editStatus: "NA",
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