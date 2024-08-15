import { Request, Response } from "express";

import storePrimaryEditModel from "../../model/storePrimaryEditModel";

const getEditStorePrimary = async (req: Request, res: Response) => {
    try {
        const editPackageMaterial = await storePrimaryEditModel.findAll({
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
export default getEditStorePrimary;