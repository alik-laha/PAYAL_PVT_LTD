import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import { Op } from "sequelize";

const getEmployeeforUser = async (req: Request, res: Response) => {
    try {
        const { searchData } = req.body;
        let where
        if (!searchData) {
            return res.status(403).json({ msg: 'No Employee found' })
        }
        where = {
            [Op.and]: [
                {
                    [Op.or]: [
                        { employeeName: { [Op.like]: `%${searchData}%` } },
                        { designation: { [Op.like]: `%${searchData}%` } },
                        { employeeId: { [Op.like]: `%${searchData}%` } },
                        { aadhaarNo: { [Op.like]: `%${searchData}%` } },
                        { panNo: { [Op.like]: `%${searchData}%` } },
                    ]
                },
                { status: 1 }
            ]
        }
        const Employees = await Employee.findAll(
            {
                where,
                order: [['createdAt', 'DESC']], // Order by date descending
            }
        );
        return res.status(200).json({ msg: 'Employee found', Employees })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default getEmployeeforUser;