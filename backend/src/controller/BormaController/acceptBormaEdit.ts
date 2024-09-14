import { Request, Response } from "express";


import { AlmondModifyProps } from "../../type/type";

import almondPrimaryEntryEditModel from "../../model/almondPrimaryEditModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";

const acceptBorma = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const approvedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const rcn: AlmondModifyProps | null = await almondPrimaryEntryEditModel.findOne({
            where: {
                id
            }
        }) as AlmondModifyProps | null;
        if (!rcn) {
            return res.status(400).json({ message: "Almond Entry not found" });
        }
        const rcnEdit = await almondPrimaryEntryModel.update({
            invoice: rcn.invoice,
            invoicedate: rcn.invoicedate,   
            noOfBags: parseInt(rcn.noOfBags),
            type:rcn.type,
            grade:rcn.grade,
            vendorName:rcn.vendorName,
            editStatus: "Approved",
            approvedBy:approvedBy,
            createdBy:rcn.createdBy,
            totalWt:rcn.totalWt,
            totalBill:rcn.totalBill
           
        }, {
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Rcn Entry is not found" });
        }
        const rcnEditDelete = await almondPrimaryEntryEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEditDelete) {
            return res.status(400).json({ message: "Almond Entry is not found" });
        }


        return res.status(200).json({ message: "Edit Request of Rcn Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default acceptBorma;