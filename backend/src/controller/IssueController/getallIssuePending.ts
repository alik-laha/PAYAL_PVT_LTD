import { Request, Response } from "express";

import ItemIssueEdit from "../../model/itemIssueEdit";

const GetAllIssueEditPendingData = async (req: Request, res: Response) => {
    try {
        const data = await ItemIssueEdit.findAll({ order: [['date', 'DESC']]}
           

        )
        if (data) {
            return res.status(200).json({ data })
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}

export default GetAllIssueEditPendingData