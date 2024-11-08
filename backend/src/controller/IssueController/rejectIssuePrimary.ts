import { Request, Response } from "express";

import ItemIssueEdit from "../../model/itemIssueEdit";
import ItemIssue from "../../model/itemissueModel";


const rejectIssuePrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await ItemIssueEdit.destroy({ where: { id } });
        if(EditPackagingMaterialdata){
            const packageMaterialData = await ItemIssue.update({
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
export default rejectIssuePrimaryEdit;