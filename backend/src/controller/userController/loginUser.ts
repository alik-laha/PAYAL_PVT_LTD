import { Request, Response } from "express";
import User from "../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserData } from "../../type/type";


const LoginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const pass = await bcrypt.hash(password, 10);
        const user: UserData | null = await User.findOne({ where: { userName } }) as UserData | null;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.cookie("user", user.userName, { httpOnly: true, secure: true });
        res.cookie("role", user.role, { httpOnly: true, secure: true });
        res.cookie("dept", user.dept, { httpOnly: true, secure: true });
        return res.status(200).json({ message: "Login Success", user: user.userName, role: user.role, dept: user.dept });

    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
export default LoginUser;