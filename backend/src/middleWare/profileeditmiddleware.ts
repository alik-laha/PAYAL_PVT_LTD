import { Request, Response, NextFunction } from 'express';

const profileEditMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const {  mobNo,  emergencyMobNo, pincode, alternatecontact } = req.body;

  
    if ((mobNo && mobNo.length !== 10 )|| (alternatecontact && alternatecontact.length !== 10) || 
    (emergencyMobNo && emergencyMobNo.length !== 10)) {
        return res.status(400).json({ message: "Mobile numbers should be of 10 digits" });
    }
    if (pincode.length !== 6) {
        return res.status(400).json({ message: "Pincode should be of 6 digits" });
    }
 
   

    next();
};

export default profileEditMiddleWare;
