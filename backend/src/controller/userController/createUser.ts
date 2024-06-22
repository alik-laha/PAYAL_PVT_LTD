import { Request, Response } from "express";
import User from "../../model/userModel";
import bcrypt from "bcryptjs";
import Employee from "../../model/employeeModel";

import { EmployeeData } from "../../type/type";
import { userCreatedMail } from "../../helper/userCreateMail";

const CreateUser = async (req: Request, res: Response) => {
    try {
        const { userName, password, dept, role, employeeId, employeeName } = req.body;
        const createdBy = req.cookies.user;
        const pass = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, password: pass, dept, role, employeeId, createdBy, employeeName });
        const EmployeeData: EmployeeData = await Employee.findOne({ where: { employeeId } }) as unknown as EmployeeData
       
        const Msg = await userCreatedMail(EmployeeData.email, userName, password)
        console.log(Msg)

        if (Msg) {
            return res.status(201).json({ message: "New User Along with Credential Has Been Sent Over Mail" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default CreateUser;