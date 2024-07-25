import { Request, Response } from "express";
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";


const QcPackageMaterialInitialEntry = (req: Request, res: Response) => {
    const { id } = req.body
    const create = QualityPackageMaterial.create({ id })
    if (!create) return res.status(400).json({ msg: "not created" })
    return res.status(201).json({ msg: "sucessFully created" })
}
export default QcPackageMaterialInitialEntry