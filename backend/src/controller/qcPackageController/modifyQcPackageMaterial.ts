import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";

const ModifyQcPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiicate, remarks } = req.body;
        const name = req.cookies.user;
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


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default ModifyQcPackageMaterial;

