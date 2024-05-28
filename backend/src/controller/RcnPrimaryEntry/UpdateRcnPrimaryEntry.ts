import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";

const UpdateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { date, blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin } = req.body;
        const receivedBy = req.cookies.user;
        const difference = netWeight - blWeight;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const oldRcnPrimary = await RcnPrimary.findOne({
            where: {
                id
            }
        });
        if (!oldRcnPrimary) {
            return res.status(400).json({ message: "Rcn Primary Entry not found" });
        }
        const rcnPrimary = await RcnPrimary.update({
            date,
            blNo,
            truckNo,
            conNo,
            blWeight,
            netWeight,
            difference,
            noOfBags,
            origin,
            receivedBy
        }, {
            where: {
                id
            }
        });
        res.status(200).json({ message: "Rcn Primary Entry Updated Successfully", rcnPrimary });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default UpdateRcnPrimaryEntry;