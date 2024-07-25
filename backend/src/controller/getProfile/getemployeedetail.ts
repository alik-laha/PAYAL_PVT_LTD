import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import User from "../../model/userModel";

const getEmployeeDetail = async (req: Request, res: Response) => {
    try {
        const id = req.cookies.id;
        const EmployeeDetail = await Employee.findOne({ where: { employeeId: id } });
        if (!EmployeeDetail) {
            return res.status(404).json({ message: "Employee Not Found" });
        }
        const UserDetail = await User.findOne({ attributes:['userName','dept','role'],where: { employeeId: id } });
        if (!UserDetail) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ EmployeeDetail, UserDetail });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export default getEmployeeDetail;