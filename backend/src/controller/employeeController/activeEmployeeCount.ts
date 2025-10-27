import { Request, Response } from "express";
import Employee from "../../model/employeeModel";


const activeEmployeeCount = async (req: Request, res: Response) => {
    try {
        const Data = await Employee.count({ where: { status: true } });
        const ResignData = await Employee.count({ where: { status: false } });
        res.status(200).json({ message: "Active Employee Count", Data,ResignData });
    }
    catch (err) {
        res.status(500).json({ message: "Error in activeEmployeeCount", error: err });
    }
}
export default activeEmployeeCount;