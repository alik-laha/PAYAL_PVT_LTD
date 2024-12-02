import { Request, Response } from "express";
import QCWaterEdit from "../../model/QCWaterEditModel";
import QCWater from "../../model/QCWaterModel";


const rejectQCWaterPrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await QCWaterEdit.destroy({ where: { id } });
        if(EditPackagingMaterialdata){
            const packageMaterialData = await QCWater.update({
                editStatus: "Rejected",
                modifiedBy: req.cookies.user,
            }, { where: { id } });


            if(packageMaterialData){
                return res.status(200).json({ message: "Rejected" })
            }
        }
        

        
    }
    catch (err) {
        console.log(err)
    }
}
export default rejectQCWaterPrimaryEdit;