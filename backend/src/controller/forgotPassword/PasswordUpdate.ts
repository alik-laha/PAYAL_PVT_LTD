import { Request, Response } from 'express';
import User from '../../model/userModel';
import becrypt from 'bcryptjs';

const PasswordUpdate = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const userId = req.cookies.userId;
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const user: any = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const hashedPassword = await becrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password Updated Successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default PasswordUpdate;
