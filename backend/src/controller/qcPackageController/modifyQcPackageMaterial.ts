import { Request, Response } from "express";
import QualityEditPackageMaterial from "../../model/editQualityPackageMaterial";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import { promises as fs } from "fs";

const ModifyQcPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiicate, remarks } = req.body;

        const {
  existingcoaCirtificateFile,
  existingfoodGradeCirtiFicateFile,
  existingDamageFiles
} = req.body;


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
       if (files?.foodGradeCertificate) {
         if (qualityPackageMaterial.foodGradeCirtiFicateFile) {
           await fs.unlink(qualityPackageMaterial.foodGradeCirtiFicateFile);
         }
         foodGradeCirtiFicateFile = files.foodGradeCertificate[0].path;
       } else if (existingfoodGradeCirtiFicateFile) {
         foodGradeCirtiFicateFile = existingfoodGradeCirtiFicateFile;
       } else {
         if (qualityPackageMaterial.foodGradeCirtiFicateFile) {
           await fs.unlink(qualityPackageMaterial.foodGradeCirtiFicateFile);
         }
         foodGradeCirtiFicateFile = "";
       }


      if (files?.coaCertificate) {
        // replace
        if (qualityPackageMaterial.coaCirtificateFile) {
          await fs.unlink(qualityPackageMaterial.coaCirtificateFile);
        }
        coaCirtificateFile = files.coaCertificate[0].path;
      } else if (existingcoaCirtificateFile) {
        // unchanged
        coaCirtificateFile = existingcoaCirtificateFile;
      } else {
        // deleted
        if (qualityPackageMaterial.coaCirtificateFile) {
          await fs.unlink(qualityPackageMaterial.coaCirtificateFile);
        }
        coaCirtificateFile = "";
      }




    //let damagePartsImage: string[] = [];

    const existingDamage = existingDamageFiles
      ? Array.isArray(existingDamageFiles)
        ? existingDamageFiles
        : [existingDamageFiles]
      : [];

    // delete removed old files
    const oldFiles = JSON.parse(qualityPackageMaterial.damageFile || "[]");
    oldFiles.forEach(async (file: string) => {
      if (!existingDamage.includes(file)) {
        await fs.unlink(file);
      }
    });

    // keep remaining
    damagePartsImage.push(...existingDamage);

    // add new
    if (files?.damagePartsImage) {
      files.damagePartsImage.forEach((file: any) => {
        damagePartsImage.push(file.path);
      });
    }

        await QualityEditPackageMaterial.create({
            id: id,
            gatePassNo:qualityPackageMaterial.gatePassNo,
            qualityStatus:1,
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