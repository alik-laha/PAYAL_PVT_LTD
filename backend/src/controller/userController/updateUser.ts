import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../../model/userModel';
import { UserData } from '../../type/type';
import { EmployeeData } from "../../type/type";
import { userModifiedMail, userNameModifiedMail, userPasswordModifiedMail } from "../../helper/userCreateMail";
import Employee from "../../model/employeeModel";

const UpdateUser = async (req: Request, res: Response) => {
    try {
        const modifyedBy = req.cookies.user;
        const { userName, password, role, dept, employeeId, confirmPassword } = req.body;
        const user: UserData | null = await User.findOne({ where: { employeeId } }) as UserData | null;
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        if (userName !== user.userName) {
            const userExist = await User.findOne({ where: { userName } });
            if (userExist) {

                return res.status(400).json({ message: 'User Already Exists' });
            }
        }
        if (!password && !confirmPassword) {
            await User.update({ userName, role, dept, modifyedBy }, { where: { employeeId } });
            //if only user name changed
            if (user.userName != userName) {
                const EmployeeData: EmployeeData = await Employee.findOne({ where: { employeeId } }) as unknown as EmployeeData

                const Msg = await userNameModifiedMail(EmployeeData.email, userName, user.userName)

                return res.status(200).json({ message: 'User has been Updated successfully' });
            }
            return res.status(200).json({ message: "User modified Sucessfully" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and Confirm Password does not match' });
        }
        const pass = await bcrypt.hash(password, 10);
        await User.update({ userName, password: pass, role, dept, modifyedBy }, { where: { employeeId } });

        if (user.userName === userName && !password) {
            return res.status(200).json({ message: "User modified Sucessfully" })
        }

        //if user name and pass is changed
        if (user.userName != userName && password) {
            const EmployeeData: EmployeeData = await Employee.findOne({ where: { employeeId } }) as unknown as EmployeeData
            const Msg = await userModifiedMail(EmployeeData.email, userName, password)
            if (Msg) {
                return res.status(201).json({ message: "User Modification Mail Has been Sent" });
            }
        }
        if (user.userName === userName && password) {
            const EmployeeData: EmployeeData = await Employee.findOne({ where: { employeeId } }) as unknown as EmployeeData
            const Msg = await userPasswordModifiedMail(EmployeeData.email, password)
            if (Msg) {
                return res.status(201).json({ message: "User Modification Mail Has been Sent" });
            }
        }


    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default UpdateUser;