import { Request, Response } from "express";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";


const QcPackageMaterialInitialEntry = (req: Request, res: Response) => {
    const { id,gatePassNo } = req.body
    const create = QualityPackageMaterial.create({ id ,gatePassNo})
    if (!create) return res.status(400).json({ msg: "not created" })
    return res.status(201).json({ msg: "sucessFully created" })
}
export default QcPackageMaterialInitialEntry