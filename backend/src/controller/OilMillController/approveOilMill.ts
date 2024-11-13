import { Request, Response } from "express";
import {  OilMillModifyProps } from "../../type/type";
import oilMillEditModel from "../../model/oilMillEditModel";
import oilMillModel from "../../model/oilMillModel";

const approveOilMIll = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const approvedBy = req.cookies.user;
       // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const rcn: OilMillModifyProps | null = await oilMillEditModel.findOne({
            where: {
                id
            }
        }) as OilMillModifyProps | null;
        if (!rcn) {
            return res.status(400).json({ message: "Almond Entry not found" });
        }
        const rcnEdit = await oilMillModel.update({
            invoice: rcn.invoice,
            invoicedate: rcn.invoicedate,   
            quantity: parseInt(rcn.quantity),
            type:rcn.type,
          
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
            return res.status(400).json({ message: "OilMill Entry is not found" });
        }
        const rcnEditDelete = await oilMillEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEditDelete) {
            return res.status(400).json({ message: "OilMill Entry is not found" });
        }


        return res.status(200).json({ message: "Edit Request of OilMill Entry is Approved Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default approveOilMIll;