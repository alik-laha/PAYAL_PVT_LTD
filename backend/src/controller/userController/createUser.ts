import { Request, Response } from "express";
import User from "../../model/userModel";
import bcrypt from "bcryptjs";

const CreateUser = async (req: Request, res: Response) => {
    try {
        const { userName, password, dept, role, employeeId, employeeName } = req.body;
        const createdBy = req.cookies.user;
        const pass = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, password: pass, dept, role, employeeId, createdBy, employeeName });
        if (user) {
            return res.status(201).json({ message: "User Created" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default CreateUser;