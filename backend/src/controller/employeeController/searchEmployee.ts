import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import { Op } from "sequelize";


const searchEmployee = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { searchData } = req.body;
        const offset = (page - 1) * size;
        const limit = size;
        let where
        if (!searchData) {
            where = {}
        }
        if (searchData) {
            where = {
                [Op.or]: [
                    { employeeName: { [Op.like]: `%${searchData}%` } },
                    { designation: { [Op.like]: `%${searchData}%` } },
                    { employeeId: { [Op.like]: `%${searchData}%` } },
                    { aadhaarNo: { [Op.like]: `%${searchData}%` } },
                    { panNo: { [Op.like]: `%${searchData}%` } },
                ]
            }
        }
        let Employees
        if (page === 0 && size === 0) {
            console.log(req.query, req.params)
            Employees = await Employee.findAll({
                where,
                order: [['createdAt', 'DESC']], // Order by date descending

            });
            console.log(page, size, "Alik")
            if (Employees.length === 0) {
                return res.status(404).json({ msg: 'No Employee found' })
            }
            return res.status(200).json({ msg: 'Employee found', Employees })

        }
        else{
            Employees = await Employee.findAll({
                where,
                order: [['createdAt', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
            if (Employees.length === 0) {
                return res.status(404).json({ msg: 'No Employee found' })
            }
        }
      
        
        return res.status(200).json({ msg: 'Employee found', Employees })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default searchEmployee;