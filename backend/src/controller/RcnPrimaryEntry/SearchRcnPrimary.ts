import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import { Op } from "sequelize";

const SearchRcnPrimary = async (req: Request, res: Response) => {
    try {
        const { conBlNo, fromDate, toDate, origin } = req.body;
        const rcnEntries = await RcnPrimary.findAll({
            order: [['date', 'DESC']],
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { blNo: { [Op.like]: `%${conBlNo}%` } },
                            { conNo: { [Op.like]: `%${conBlNo}%` } },
                        ]
                    },
                    {
                        [Op.and]: [
                            { date: { [Op.between]: [fromDate, toDate] } },
                            { origin: { [Op.like]: `%${origin}%` } }
                        ]
                    }
                ]
            }
        });
        if (rcnEntries.length === 0) {
            return res.status(404).json({ msg: 'No Rcn Entry found' })
        }
        return res.status(200).json({ msg: 'Rcn Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }
}
export default SearchRcnPrimary