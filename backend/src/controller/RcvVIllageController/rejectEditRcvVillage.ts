import { Request, Response } from "express";



import RcvVillageEditModel from "../../model/rcvVillageEditModel";
import RcvVillageModel from "../../model/RcvVillageModel";


const rejectVillagePrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await RcvVillageEditModel.destroy({ where: { id } });
        if(EditPackagingMaterialdata){
            const packageMaterialData = await RcvVillageModel.update({
                editStatus: "Rejected",
                approvedBy: req.cookies.user,
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
export default rejectVillagePrimaryEdit;