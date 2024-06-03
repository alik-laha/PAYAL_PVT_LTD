import { Request, Response } from "express";
import User from "../../model/userModel";
import jwt from "jsonwebtoken";

const VerifyUser = async (req: Request, res: Response) => {
    try {
        const employeeId = req.cookies.id;
        const role = req.cookies.role;
        const dept = req.cookies.dept;
        const token = req.cookies.token;
        if (!role || !dept) {
            return res.status(401).json({ error: 'please provide the role and dept' });
        }
        if (!employeeId) {
            return res.status(401).json({ error: 'please provide the employeeId' });
        }
        if (!token) {
            return res.status(401).json({ error: 'please provide the token' });
        }
        const compareToken = await jwt.verify(token, process.env.JWT_SECRET_KEY!);
        if (!compareToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const user: any = await User.findOne({ where: { employeeId: employeeId } });
        if (!user) {
            return res.status(404).json({ error: 'User is not registered' });
        }


    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default VerifyUser;