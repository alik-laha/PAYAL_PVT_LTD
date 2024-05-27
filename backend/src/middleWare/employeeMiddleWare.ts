import { Request, Response, NextFunction } from "express";

const employeeMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const { employeeName, designation, email, mobNo, adharNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;

    if (!employeeName || !designation || !email || !mobNo || !adharNo || !panNo || !dateOfJoining || !address || !pincode || !emergencyContact || !emergencyMobNo) {
        return res.status(400).json({ message: "All fields are required" })
    }
    if (mobNo.length !== 10) {
        return res.status(400).json({ message: "Mobile number should be of 10 digits" })
    }
    if (alternateMobNo && alternateMobNo.length !== 10) {
        return res.status(400).json({ message: "Alternate Mobile number should be of 10 digits" })
    }
    if (emergencyMobNo.length !== 10) {
        return res.status(400).json({ message: "Emergency Mobile number should be of 10 digits" })
    }
    if (pincode.length !== 6) {
        return res.status(400).json({ message: "Pincode should be of 6 digits" })
    }
    if (adharNo.length !== 12) {
        return res.status(400).json({ message: "Adhar number should be of 12 digits" })
    }
    if (panNo.length !== 10) {
        return res.status(400).json({ message: "Pan number should be of 10 digits" })
    }
    else {
        next();
    }
}

export default employeeMiddleWare;