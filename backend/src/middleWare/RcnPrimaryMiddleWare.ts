import { Request, Response, NextFunction } from "express";

const RcnPrimaryMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin } = req.body;
        // const receivedBy = req.cookies.user;
        const receivedBy = "alik";
        const difference = netWeight - blWeight;

        if (!blNo || !truckNo || !conNo || !blWeight || !netWeight || !noOfBags || !origin) {
            console.log(blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin);
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!receivedBy) {
            return res.status(400).json({ message: "User not found" });
        }
        if (difference < 0) {
            return res.status(400).json({ message: "Net weight cannot be less than BL weight" });
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }


}

export default RcnPrimaryMiddleWare;