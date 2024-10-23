import { Request, Response } from "express";
import { AgarbatiModifyProps } from "../../type/type";
import agarbatiPrimaryEntryEditModel from "../../model/agarbatiPrimaryEditModel";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";

const approveAgarbati = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const approvedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const rcn: AgarbatiModifyProps | null = await agarbatiPrimaryEntryEditModel.findOne({
            where: {
                id
            }
        }) as AgarbatiModifyProps | null;
        if (!rcn) {
            return res.status(400).json({ message: "Agarbati Entry not found" });
        }
        const rcnEdit = await agarbatiPrimaryEntryModel.update({
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
            return res.status(400).json({ message: "Agarbati Entry is not found" });
        }
        const rcnEditDelete = await agarbatiPrimaryEntryEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEditDelete) {
            return res.status(400).json({ message: "Agarbati Entry is not found" });
        }


        return res.status(200).json({ message: "Edit Request of Agarbati Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default approveAgarbati;