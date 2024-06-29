import { Request, Response } from 'express'
import Employee from '../../model/userModel';
import crypto from 'crypto';
import { ResetPassword } from '../../helper/userCreateMail';
import forgotPasswordModel from '../../model/forgotPasswordModel';
import User from '../../model/userModel';



export default async function forgotPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;
        const employee: any = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(404).json({ error: "Check the email this email is not Registered" });
        }
        let verificationCode = crypto.randomBytes(8).toString('hex');
        const verificationCodeTime = Date.now() + 5 * 60 * 1000;
        const user: any = await User.findOne({ where: { employeeId: employee.employeeId } })
        if (!user) {
            return res.status(404).json({ error: "Check the email this email is not Registered" });
        }
        const forgot = await forgotPasswordModel.create({ email, EmployeeId: employee.id, verificationCode, verificationCodeTime, userId: user.id });
        if (!forgot) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const Mail = await ResetPassword(email, verificationCode);
        if (Mail) {
            return res.status(200).json({ message: "Verification Code Sent to your Email" });
        }
        return res.status(500).json({ error: "Internal Server Error" });

    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}