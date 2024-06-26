import { Request, Response } from "express";

import RcnBoiling from "../../model/RcnBoilingModel";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";


const rejectEditBoiling = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;


         const rejectedBy = req.cookies.user;

        // const rejectedBy = req.cookies.user;
  

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await RcnBoiling.update({

            editStatus: "NA",
            modifiedBy:rejectedBy

          
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Rcn Boiling Entry not found" });
        }
        const rcnEdit = await RcnBoilingEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Rcn Boiling Entry not found" });
        }
        return res.status(200).json({ message: "RCN Boiling Modify Request is Reverted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default rejectEditBoiling;