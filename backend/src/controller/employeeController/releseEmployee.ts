import { Request, Response } from "express";
import Employee from "../../model/employeeModel";

const releseEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeId, releseDate } = req.body;
        const oldEmployee = await Employee.findOne({ where: { employeeId: employeeId } });
        if (!oldEmployee) {
            return res.status(400).json({ msg: 'Employee does not exist with this employeeId' })
        }
        Employee.update({
            releseDate,
            status: 0
        }, {
            where: {
                employeeId: employeeId
            }
        }).then((data) => {
            return res.status(201).json({ msg: 'Employee Resgination Date updated successfully', data })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({ msg: 'error While updating', error: err })
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default releseEmployee;