import { Request, Response } from "express";
import User from "../../model/userModel";


const addNewPassword = async (req: Request, res: Response) => {
    try {
        const { password, confirmPassword } = req.body;
        const UserId = req.cookies.userId;
        const user: any = await User.findOne({ where: { id: UserId } });
        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password and Confirm Password does not match" });
        }

    }
    catch (err) {

    }
}
export default addNewPassword;