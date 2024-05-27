import { Request, Response } from "express";
import Employee from "../../model/employeeModel";

const getAllEmployee = async (req: Request, res: Response) => {
    try {
        const Employees = await Employee.findAll();
        if (Employees.length === 0) {
            return res.status(404).json({ msg: 'No Employee found' })
        }
        return res.status(200).json({ msg: 'Employee found', Employees })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default getAllEmployee;