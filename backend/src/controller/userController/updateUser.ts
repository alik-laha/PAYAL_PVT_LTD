import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../../model/userModel';
import { UserData } from '../../type/type';

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

            await User.update({ userName, role, dept }, { where: { employeeId } });
            return res.status(200).json({ message: 'User has been Updated successfully' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and Confirm Password does not match' });
        }
        const pass = await bcrypt.hash(password, 10);
        await User.update({ userName, password: pass, role, dept, modifyedBy }, { where: { employeeId } });
        return res.status(200).json({ message: 'User has been updated successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default UpdateUser;