import { Request, Response } from "express";

import QCWaterEdit from "../../model/QCWaterEditModel";

const GetAllQCWaterEditPendingData = async (req: Request, res: Response) => {
    try {
        const data = await QCWaterEdit.findAll({ order: [['date', 'DESC']]}
           

        )
        if (data) {
            return res.status(200).json({ data })
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}

export default GetAllQCWaterEditPendingData