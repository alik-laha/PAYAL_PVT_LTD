import { Request, Response } from "express";
import Employee from "../../model/employeeModel";


const activeEmployeeCount = async (req: Request, res: Response) => {
    try {
        const Data = await Employee.count({ where: { status: true } });
        res.status(200).json({ message: "Active Employee Count", Data });
    }
    catch (err) {
        res.status(500).json({ message: "Error in activeEmployeeCount", error: err });
    }
}
export default activeEmployeeCount;