import { Request, Response, NextFunction } from "express";

const RcnPrimaryMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin } = req.body;
        // const receivedBy = req.cookies.user;
        const receivedBy = "alik";
        const difference =  blWeight-netWeight;

        if (!blNo || !truckNo || !conNo || !blWeight || !netWeight || !noOfBags || !origin) {
            console.log(blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin);
            return res.status(400).json({ message: "All Fields Are Required" });
        }
        if (!receivedBy) {
            return res.status(400).json({ message: "User Not found" });
        }
        if (difference < 0) {
            return res.status(400).json({ message: "Net weight Can't be Greater than BL weight" });
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }


}

export default RcnPrimaryMiddleWare;