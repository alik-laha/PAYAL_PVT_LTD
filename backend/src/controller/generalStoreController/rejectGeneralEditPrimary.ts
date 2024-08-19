import { Request, Response } from "express";

import generalPrimaryEditModel from "../../model/generalPrimaryEditModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";


const rejectGeneralPrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await generalPrimaryEditModel.destroy({ where: { id } });
        if(EditPackagingMaterialdata){
            const packageMaterialData = await generalPrimaryModel.update({
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
export default rejectGeneralPrimaryEdit;