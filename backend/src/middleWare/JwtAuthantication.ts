import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ msg: "No Token found Please logout and re-Login" })
        } else {
            const decoded = Object(jwt.verify(token, process.env.JWT_SECRET!));
            if (decoded) {
                next()
            } else {
                return res.status(400).json({ msg: "your token is not valid" })
            }

        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Server Error", err })
    }
}
