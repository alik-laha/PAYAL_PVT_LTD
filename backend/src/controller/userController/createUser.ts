import { Request, Response } from "express";
import User from "../../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const CreateUser = async (req: Request, res: Response) => {
    try {
        const { userName, password, dept, role, employeeId } = req.body;
        const createdBy = req.cookies.user;
        const pass = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, password: pass, dept, role, employeeId, createdBy });
        if (user) {
            jwt.sign({ dept, role, employeeId }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRE! }, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: "Internal Server Error", err });
                }
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie("user", userName, {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie("role", role, {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie("dept", dept, {
                    httpOnly: true,
                    secure: true,
                });
                return res.status(201).json({ message: "User Created" });

            });

        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export default CreateUser;