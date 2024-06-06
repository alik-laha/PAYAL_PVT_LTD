import { Request, Response } from "express";
import User from "../../model/userModel";


const totaluserCount = async (req: Request, res: Response) => {
    try {

        const count = await User.count()
        
        res.status(200).json({ message: "Active User Count", count });
    }
    catch (err) {
        res.status(500).json({ message: "Error in User Count", error: err });
    }
}
export default totaluserCount;