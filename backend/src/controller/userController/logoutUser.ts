import { Request, Response } from "express";
import User from "../../model/userModel";

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.clearCookie("id")
        res.clearCookie("role")
        res.clearCookie("dept")
        res.clearCookie("user")
        return res.status(200).json({ message: "Logged out successfully" });

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
}
export default logoutUser;