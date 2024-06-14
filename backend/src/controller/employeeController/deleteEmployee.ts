import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import user from "../../model/userModel";

const DeleteEmployee = async (req: Request, res: Response) => {
    try {
        const employeeId = req.params.id;
        const oldEmployee = await Employee.findOne({ where: { employeeId: employeeId } });
        if (!oldEmployee) {
            return res.status(400).json({ msg: 'Invalid Employee ID' })
        }
        const userExist = await user.findAll({ where: { employeeId: employeeId } });
        if (userExist) {
            user.destroy({ where: { employeeId: employeeId } });
        }
        await Employee.destroy({
            where: {
                employeeId: employeeId
            }
        }).then((data) => {
            return res.status(201).json({ msg: 'Employee has Deleted Successfully', data })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({ msg: 'Error While Deleting', error: err })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default DeleteEmployee;