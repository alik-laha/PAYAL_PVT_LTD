import { Request, Response, NextFunction } from "express";

const RcnPrimaryMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { origin, blNo, conNo,  blWeight, noOfBags} = req.body;
         const receivedBy = req.cookies.user;
        //const receivedBy = "alik";

        if ( !blWeight  || !noOfBags || !origin) {
            console.log(blNo, conNo, blWeight, noOfBags, origin);
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