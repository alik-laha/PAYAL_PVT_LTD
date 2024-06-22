import { Request, Response } from "express";
import User from "../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const LoginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const user: any = await User.findOne({ where: { userName: userName } });
        if (!user) {
            return res.status(404).json({ error: 'Invalid Username' });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({ error: 'Password is Not Matching' });
        }

        const token = await jwt.sign({ employeeId: user.employeeId, role: user.role, dept: user.dept }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRE! });

        res.cookie('token', token, { httpOnly: true })
        res.cookie("user", user.userName, { httpOnly: true });
        res.cookie("role", user.role, { httpOnly: true })
        res.cookie("dept", user.dept, { httpOnly: true })
        res.cookie("id", user.employeeId, { httpOnly: true })
        return res.status(200).json({ role: user.role, dept: user.dept, user: user.userName })
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error', err });
    }

}
export default LoginUser;