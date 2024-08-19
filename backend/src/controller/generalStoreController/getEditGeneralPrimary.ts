import { Request, Response } from "express";

import generalPrimaryEditModel from "../../model/generalPrimaryEditModel";

const getEditGeneralPrimary = async (req: Request, res: Response) => {
    try {
        const editPackageMaterial = await generalPrimaryEditModel.findAll({
            order: [['recevingDate', 'DESC']]
        });
        if (!editPackageMaterial) {
            return res.status(200).send({ message: "No pending edit Available" });
        }
        return res.status(200).send(editPackageMaterial);
    }
    catch (err) {
        console.log(err);
    }
}
export default getEditGeneralPrimary;