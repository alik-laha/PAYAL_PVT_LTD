import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";

const CreateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const { date, blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin } = req.body;
        const receivedBy = req.cookies.user;
        const difference = netWeight - blWeight;
        const rcnPrimary = await RcnPrimary.create({
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
        });
        res.status(201).json({ message: "Rcn Primary Entry Created Successfully", rcnPrimary });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default CreateRcnPrimaryEntry;

