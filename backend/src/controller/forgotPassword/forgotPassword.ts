import { Request, Response } from 'express'
import Employee from '../../model/employeeModel';
import crypto from 'crypto';
import { ResetPassword } from '../../helper/userCreateMail';
import forgotPasswordModel from '../../model/forgotPasswordModel';
import User from '../../model/userModel';



export default async function forgotPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;
        console.log(email)
        const employee: any = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(404).json({ error: "No User Found with Email ID" });
        }
        const userData: any = await User.findOne({ where: { employeeId: employee.employeeId } })
        if (!userData) {
            return res.status(404).json({ error: "Employee is Not Registered as a User" });
        }
        const verificationCode = crypto.randomBytes(3).toString('hex');

        console.log(verificationCode)
        const verificationCodeTime = Date.now() + Number(process.env.FORGOT_PWD_TOKEN_EXPIRE_MIN) * 60 * 1000;

        const forgotData: any = await forgotPasswordModel.findOne({ where: { userId: userData.id } });
        if (forgotData) {
            await forgotData.destroy();
        }
        console.log(verificationCodeTime)

        const forgot = await forgotPasswordModel.create({ email, EmployeeId: employee.employeeId, verificationCode, verificationCodeTime, userId: userData.id });
        if (!forgot) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const Mail = await ResetPassword(email, verificationCode);
        if (Mail) {
            return res.status(200).json({ message: "Verification Code Has Been Sent to Email" });
        }
        return res.status(500).json({ error: "Internal Server Error" });

    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}