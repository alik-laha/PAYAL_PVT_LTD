import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import { Op } from "sequelize";


const searchEmployee = async (req: Request, res: Response) => {
    try {
        const { searchData } = req.body;
        const Employees = await Employee.findAll({
            where: {
                [Op.or]: [
                    { employeeName: { [Op.like]: `%${searchData}%` } },
                    { employeeId: { [Op.like]: `%${searchData}%` } },
                ]
            }

        });
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
export default searchEmployee;