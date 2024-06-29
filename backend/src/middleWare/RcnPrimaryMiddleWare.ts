import { Request, Response, NextFunction } from "express";

const RcnPrimaryMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin } = req.body;
         const receivedBy = req.cookies.user;
        //const receivedBy = "alik";

        if (!blNo || !truckNo || !conNo || !blWeight || !netWeight || !noOfBags || !origin) {
            console.log(blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin);
            return res.status(400).json({ message: "All Fields Are Required" });
        }
        if (!receivedBy) {
            return res.status(400).json({ message: "User Not found" });
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }


}

export default RcnPrimaryMiddleWare;