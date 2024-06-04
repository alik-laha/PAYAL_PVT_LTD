import { Request, Response } from "express";
import User from "../../model/userModel";
import jwt from "jsonwebtoken";
import { TokenVerify } from "../../type/type";

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
        const compareToken: TokenVerify = await jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenVerify;
        if (!compareToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const user: any = await User.findOne({ where: { employeeId: employeeId } });
        if (!user) {
            return res.status(404).json({ error: 'User is not registered' });
        }
        if (compareToken.exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: 'Token has expired' });
        }
        if (compareToken.employeeId !== employeeId) {
            return res.status(401).json({ error: 'Invalid employee' });
        }
        if (compareToken.role !== role) {
            return res.status(401).json({ error: 'Invalid role' });
        }
        if (compareToken.dept !== dept) {
            return res.status(401).json({ error: 'Invalid dept' });
        }
        return res.status(200).json({ role: compareToken.role, dept: compareToken.dept, user: user.userName })


    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default VerifyUser;