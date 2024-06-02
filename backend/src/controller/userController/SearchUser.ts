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
                where: {
                    [Op.or]: [
                        {
                            username: {
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
                        }
                    ]
                }
            })
            return res.status(200).json({ msg: 'User found', user })

        }
        user = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        username: {
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
                    }
                ],
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