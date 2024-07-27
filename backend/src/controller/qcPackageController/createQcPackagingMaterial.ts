import { Request, Response } from "express";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import RecivingPackageMaterial from "../../model/recevingPackagingMaterialModel";

const CreateQcPackagingMaterial = async (req: Request, res: Response) => {
    try {
        const { testingDate, length, width, height, gsm, avgWeight, leakageTest, dropTest, sealCondition, labelingCondition, coa, foodGradeCirtiFicate, remarks } = req.body;
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
            foodGradeCirtiFicate,
            remarks,
            qualityStatus: "Qc Entered",
        }, { where: { id: req.params.id } });

        await RecivingPackageMaterial.update({ qualityStatus: "Qc Entered" }, { where: { id: req.params.id } });

        return res.status(200).json({ message: "Quality Package Material created successfully" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong" });
    }
}
export default CreateQcPackagingMaterial;