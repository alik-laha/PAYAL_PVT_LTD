import { Request, Response } from "express";
import User from "../../model/userModel";
import bcrypt from 'bcryptjs';
import { userPasswordModifiedMail } from '../../helper/userCreateMail';

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
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        await user.save();
        const Mail = await userPasswordModifiedMail(user.email, password);
        if (!Mail) {
            return res.status(400).json({ error: "Mail not sent" });
        }
        return res.status(200).json({ message: "Password Updated Successfully" });

    }
    catch (err) {

    }
}
export default addNewPassword;