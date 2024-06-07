import { Request, Response, NextFunction } from "express";
import User from "../model/userModel";
import Employee from "../model/employeeModel";

const UserMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, password, dept, role, employeeId, confirmPassword } = req.body;
        // const createdBy = req.cookies.user;
        const createdBy = "Admin";
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!userName || !password || !dept || !role || !employeeId || !confirmPassword) {
            return res.status(400).json({ message: "All Fields are Required" })
        }
        if (!createdBy) {
            return res.status(401).json({ message: "Unauthorized", createdBy })
        }
        if (specialCharRegex.test(userName)) {
            return res.status(400).json({ message: "User Name Should Not Contain Special Characters" })
        }
        if (!specialCharRegex.test(password)) {
            return res.status(400).json({ message: "Password Should Contain Atleast One Special Character" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password does not Match" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password Must be atleast of 6 characters" })
        }
        const employee = await Employee.findOne({ where: { employeeId } });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        const oldUserByName = await User.findOne({ where: { userName } });
        if (oldUserByName) {
            return res.status(400).json({ message: "User Name already Exists" })
        }
        const oldUserByEmployeeId = await User.findOne({ where: { employeeId } });
        // if (oldUserByEmployeeId) {
        //     return res.status(400).json({ message: "Employee already has a User" })
        // }
        next();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default UserMiddleWare;