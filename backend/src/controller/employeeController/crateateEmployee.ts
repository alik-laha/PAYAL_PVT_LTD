import { Request, Response } from "express";
import Employee from "../../model/employeeModel";

const createEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeName, designation, email, mobNo, employeeId, aadhaarNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;
        const oldEmployee = await Employee.findOne({ where: { employeeId } });
        if (oldEmployee) {
            return res.status(400).json({ msg: 'Employee already exist with this employeeId' })
        }
        Employee.create({
            employeeName,
            employeeId,
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
