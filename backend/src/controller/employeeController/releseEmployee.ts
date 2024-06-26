import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import user from "../../model/userModel";

const releseEmployee = async (req: Request, res: Response) => {
    try {
        const employeeId = req.params.id
        const { releseDate } = req.body;
        const oldEmployee = await Employee.findOne({ where: { employeeId: employeeId } });
        
        if (!oldEmployee) {
            return res.status(400).json({ msg: 'Invalid EmployeeId' })
        }
        const userExist = await user.findAll({ where: { employeeId: employeeId } });
        if (userExist) {
            user.destroy({ where: { employeeId: employeeId } });
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