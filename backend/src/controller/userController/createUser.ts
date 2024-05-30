import { Request, Response } from "express";
import User from "../../model/userModel";

const CreateUser = async (req: Request, res: Response) => {
    try {
        const { userName, password, dept, role, employeeId } = req.body;
        const createdBy = req.cookies.user;
        const user = await User.create({ userName, password, dept, role, employeeId, createdBy });
        if (user) {
            return res.status(201).json({ message: "User Created" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export default CreateUser;