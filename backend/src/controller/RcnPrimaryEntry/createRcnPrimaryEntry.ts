import { Request, Response } from "express";
import { RcnPrimary } from "../../model/indexmapping";

const CreateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin, date } = req.body;
        // const date = new Date();
        const receivedBy = req.cookies.user;
        // const receivedBy = "RC User 1";
        let difference = blWeight - netWeight;
        const rcnPrimaryExists = await RcnPrimary.findOne({ where: { blNo, conNo } });
        if (rcnPrimaryExists) {
            return res.status(400).json({ message: "Entry Already Exists With this Bl-No and Con-No" });
        }

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
        res.status(201).json({ message: "Rcn Primary Entry is Created Successfully", rcnPrimary });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default CreateRcnPrimaryEntry;

