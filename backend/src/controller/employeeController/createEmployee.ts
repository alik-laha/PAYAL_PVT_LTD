import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import { EmployeeData } from "../../type/type";

const createEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeName, designation, email, mobNo, aadhaarNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;

        let oldEmployee = await Employee.findOne({ where: { aadhaarNo } });
        if (oldEmployee) {
            return res.status(400).json({ msg: 'Employee Already Exists with this Aadhaar No.' })
        }
        let oldpanEmployee = await Employee.findOne({ where: { panNo } });
        if (oldpanEmployee) {
            return res.status(400).json({ msg: 'Employee Already Exists with this Pan No.' })
        }


        const LastUserId: EmployeeData | null = await Employee.findOne({ order: [['id', 'DESC']] }) as EmployeeData | null;
       
        let Id: number;
        let employeeId: string;
        const createdBy = req.cookies.user;
        if (LastUserId===null ) {
            Id = 1;
        }
        else {
            Id = LastUserId.id + 1;
        }
            let id = "";
            const schoolName = "PAYC";
            const year = new Date().getFullYear().toString();
            const ID = Id.toString();
            if (ID.length === 1) {
                id = "0000" + ID;
            } else if (ID.length === 2) {
                id = "000" + ID;
            } else if (ID.length === 3) {
                id = "00" + ID;
            } else if (ID.length === 4) {
                id = "0" + ID;
            } else if (ID.length === 5) {
                id = ID;
            }
            employeeId = schoolName + year + id;
            console.log(employeeId)

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
                pfNo,createdBy
            }).then((data) => {
                return res.status(201).json({ msg: `New Employee has Created with Emp ID ${employeeId}`, data })
            }).catch((err) => {
                console.log(err)
                return res.status(500).json({ msg: 'Error While Creating', error: err })
            })
        

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error', error: err })
    }
}
export default createEmployee;
