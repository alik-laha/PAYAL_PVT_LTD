import { Request, Response } from "express";
import QceditRCN from "../../model/qcRCNeditmodel";
import RcnPrimary from "../../model/RcnEntryModel";

const searchEditQCRCN = async (req: Request, res: Response) => {
    try {
        const rcnEdit = await QceditRCN.findAll({

            include: [{
                model: RcnPrimary,
                required: false,
        }],
            order: [['date', 'DESC']], // Order by date descending
        }
            

        );
        if (!rcnEdit) {
            return res.status(200).send({ message: "No pending edit Available" });
        }

        
        return res.status(200).send({rcnEdit});
    }
    catch (err) {
        console.log(err);
    }
}
export default searchEditQCRCN;