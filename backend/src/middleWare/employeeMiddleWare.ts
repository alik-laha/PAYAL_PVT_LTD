import { Request, Response, NextFunction } from 'express';

const employeeMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const {
        employeeName,
        designation,
        email,
        mobNo,
        aadhaarNo,
        panNo,
        dateOfJoining,
        address,
        pincode,
        emergencyContact,
        emergencyMobNo,
        alternateMobNo
    } = req.body;

    if (!employeeName || !designation || !email || !mobNo || !aadhaarNo || !panNo || !dateOfJoining || !address || !pincode || !emergencyContact || !emergencyMobNo) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    if (mobNo.length !== 10 || (alternateMobNo && alternateMobNo.length !== 10) || emergencyMobNo.length !== 10) {
        return res.status(400).json({ msg: "Mobile numbers should be of 10 digits" });
    }
    if (pincode.length !== 6) {
        return res.status(400).json({ msg: "Pincode should be of 6 digits" });
    }
    if (aadhaarNo.length !== 12) {
        return res.status(400).json({ msg: "Aadhaar No. should be of 12 digits" });
    }
    if (panNo.length !== 10) {
        return res.status(400).json({ msg: "PAN No. should be of 10 digits" });
    }

    next();
};

export default employeeMiddleWare;
