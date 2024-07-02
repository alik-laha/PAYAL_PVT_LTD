import { Request, Response } from "express";

import forgotPasswordModel from "../../model/forgotPasswordModel";



const VerifyCode = async (req: Request, res: Response) => {
    try {
        const VerifyToken = req.body.verificationCode;
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
        res.cookie("userId", data.userId, { httpOnly: true });
        return res.status(200).json({ message: 'Token Has been Verified' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default VerifyCode;