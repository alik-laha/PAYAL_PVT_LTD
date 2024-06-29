import { Request, Response } from "express";
import User from "../../model/userModel";
import forgotPasswordModel from "../../model/forgotPasswordModel";
import becrypt from 'bcryptjs';
import { ResetPassword } from "../../helper/userCreateMail";


const VerifyCode = async (req: Request, res: Response) => {
    try {
        const VerifyToken = req.params.token;
        const data: any = await forgotPasswordModel.findOne({ where: { verificationCode: VerifyToken } });
        const password = req.body.password;
        if (!data) {
            return res.status(404).json({ error: 'Invalid Token' });
        }
        const currentTime = Date.now();
        if (currentTime > data.verificationCodeTime) {
            await data.destroy();
            return res.status(404).json({ error: 'Token Expired' });
        }
        const user: any = await User.findOne({ where: { id: data.userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.password = password;
        await user.save();
        await data.destroy();
        const Mail = await ResetPassword(user.email, password);
        if (!Mail) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Password Updated Successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default VerifyCode;