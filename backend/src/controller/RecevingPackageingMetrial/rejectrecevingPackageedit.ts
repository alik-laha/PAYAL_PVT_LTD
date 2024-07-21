import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import packageMaterial from "../../model/recevingPackagingMaterialModel";
import { PackageMaterialReceivingData } from "../../type/type";


const rejectRecevingPackageEdit = async (req: Request, res: Response) => {
    try {

    }
    catch (err) {
        console.log(err)
    }
}
export default rejectRecevingPackageEdit;