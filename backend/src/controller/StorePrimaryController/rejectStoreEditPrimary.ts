import { Request, Response } from "express";

import storePrimaryEditModel from "../../model/storePrimaryEditModel";
import storePrimaryModel from "../../model/storePrimaryModel";


const rejectStorePrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await storePrimaryEditModel.destroy({ where: { id } });
        if(EditPackagingMaterialdata){
            const packageMaterialData = await storePrimaryModel.update({
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
export default rejectStorePrimaryEdit;