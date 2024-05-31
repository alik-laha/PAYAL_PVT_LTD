import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";

const UpdateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin, id } = req.body;
        const difference = netWeight - blWeight;
        if (!id) {
            return res.status(400).json({ message: "Please provide the id" });
        }
        const rcn = await RcnPrimary.update({
            editStatus: "Pending",
        },
            {
                where: {
                    id
                }
            });
        const rcnEdit = await RcnEdit.create({
            blNo,
            truckNo,
            conNo,
            blWeight,
            netWeight,
            difference,
            noOfBags,
            origin,
            id,
        });
        return res.status(200).json({ message: "Rcn Entry updated successfully Wait for approve" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default UpdateRcnPrimaryEntry;