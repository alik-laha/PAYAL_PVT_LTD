import { Request, Response } from "express";
import Employee from "../../model/employeeModel";


const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeName, designation, email, mobNo, aadhaarNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;
        const employeeId = req.params.id
        const modifyedBy = req.cookies.user
        const oldEmployee = await Employee.findOne({ where: { employeeId: employeeId } });
        if (!oldEmployee) {
            return res.status(400).json({ msg: 'Employee does not exist with employeeId' })
        }
        Employee.update({
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
            alternateMobNo,
            bloodGroup,
            heighstQualification,
            pfNo,
            modifyedBy
        }, {
            where: {
                employeeId: employeeId
            }
        }).then((data) => {
            return res.status(201).json({ msg: 'Employee Updated Successfully', data })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({ msg: 'Error While Updating', error: err })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error', error: err })
    }
}
export default updateEmployee;