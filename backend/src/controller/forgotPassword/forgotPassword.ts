import { Request, Response } from 'express'
import User from '../../model/userModel';
import crypto from 'crypto';
import { ResetPassword } from '../../helper/userCreateMail';



export default async function forgotPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;
        const user: any = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Check the email this email is not Registered" });
        }
        let verificationCode = 0;
        crypto.randomInt(100000, 999999, (err, n) => {
            if (err) throw err;
            verificationCode = n;
        });
        const Mail = await ResetPassword(email, verificationCode);
        const currentTime = String(new Date().getTime() + 5 * 60 * 1000);
        if (Mail) {
            res.cookie('reset', verificationCode, { httpOnly: true })
            res.cookie('userId', user.id, { httpOnly: true });
            res.cookie('verifyExpResetPass', new Date().getTime() + 5 * 60 * 1000, { httpOnly: true });
            return res.status(200).json({ message: "Verification code sent to your email" });
        }
        else {
            return res.status(400).json({ error: "Verification code not sent" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}