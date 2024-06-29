import { Request, Response } from "express";
import User from "../../model/userModel";


const VerifyCode = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const OTP = req.cookies.reset;
        const Expiry = req.cookies.verifyExpResetPass;
        const userId = req.cookies.userId;
        if (!OTP || !Expiry) {
            return res.status(400).json({ error: "You Have no Verification Code" });
        }
        if (Expiry < new Date().getTime()) {
            return res.status(400).json({ error: "Verification Code Expired" });
        }
        if (OTP !== token) {
            return res.status(400).json({ error: "Incorrect Verification Code" });
        }
        const user: any = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }
        return res.status(200).json({ message: "Verification Code Verified" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default VerifyCode;