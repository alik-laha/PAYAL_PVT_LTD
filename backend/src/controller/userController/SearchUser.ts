import { Request, Response } from "express";
import User from "../../model/userModel";
import { Op } from "sequelize";


const SearchUser = async (req: Request, res: Response) => {
    try {
        const { SearchUser } = req.body
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;
        let user
        

        if (page === 0 || size === 0) {
            user = await User.findAll({
                attributes: ['employeeName', 'userName', 'dept', 'role', 'createdBy', 'employeeId'],
                where: {
                    [Op.or]: [
                        {
                            userName: {
                                [Op.like]: `%${SearchUser}%`
                            }
                        },
                        {
                            dept: {
                                [Op.like]: `%${SearchUser}%`
                            }
                        },
                        {
                            role: {
                                [Op.like]: `%${SearchUser}%`
                            }
                        },
                        {
                            employeeId: {
                                [Op.like]: `%${SearchUser}%`
                            }
                        },
                        {
                            employeeName: {
                                [Op.like]: `%${SearchUser}%`
                            }
                        }
                    ]
                }
            })
            return res.status(200).json({ msg: 'User found', user })
        }
        user = await User.findAll({
            where: {
                limit: limit,
                offset: offset
            }
        })
        return res.status(200).json({ msg: 'User found', user })

    } catch (error) {
        console.log(error)
    }
}
export default SearchUser;