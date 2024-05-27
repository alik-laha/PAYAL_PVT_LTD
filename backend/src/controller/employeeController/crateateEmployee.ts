import { Request, Response } from "express";
import Employee from "../../model/employeeModel";

const createEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeName, designation, email, mobNo, employeeId, adharNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;
        Employee.create({
            employeeName,
            employeeId,
            designation,
            email,
            mobNo,
            adharNo,
            panNo,
            dateOfJoining,
            address,
            pincode,
            emergencyContact,
            emergencyMobNo,
            alternateMobNo,
            bloodGroup,
            heighstQualification,
            pfNo
        }).then((data) => {
            return res.status(201).json({ msg: 'Employee created successfully', data })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({ msg: 'error While Creating', error: err })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default createEmployee;