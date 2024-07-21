import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";

const sumOfAllRecenvingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const sumOfAllRecenvingPackageMaterial = await EditPackagingMaterial.count();
        return res.status(200).json(sumOfAllRecenvingPackageMaterial);
    }
    catch (err) {
        console.log(err)
    }
}
export default sumOfAllRecenvingPackageMaterial;