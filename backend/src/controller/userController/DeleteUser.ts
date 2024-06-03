import { Request, Response } from "express";
import User from "../../model/userModel";

const DeleteUser = async (req: Request, res: Response) => {
    try {
        const employeeId = req.params.id;
        const user = await User.findOne({ where: { employeeId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.destroy({ where: { employeeId } });
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export default DeleteUser;