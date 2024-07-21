import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import packageMaterial from "../../model/recevingPackagingMaterialModel";


const rejectRecevingPackageEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await EditPackagingMaterial.destroy({ where: { id } });
        const packageMaterialData = await packageMaterial.update({
            editStatus: "Rejected",
            approvedBy: req.cookies.user,
        }, { where: { id } });

        return res.status(200).json({ message: "Rejected" })
    }
    catch (err) {
        console.log(err)
    }
}
export default rejectRecevingPackageEdit;