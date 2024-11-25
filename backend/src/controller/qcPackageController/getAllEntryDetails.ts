import { Request, Response } from "express";


import { Op } from "sequelize";

import PackagingMaterial from "../../model/recevingPackagingMaterialModel";


const getTotalQcCountPM = async (req: Request, res: Response) => {
    try {
        const pendingQC = await PackagingMaterial.count({
            where: {
                [Op.and]: [
                    { qualityStatus: { [Op.like]: 0 } },
                    { editStatus: { [Op.notLike]: `Pending` } },
                    {status:1}
                ]
            }
        });
        const approvedQC = await PackagingMaterial.count({
            where: {
                [Op.and]: [
                    { qualityStatus: { [Op.like]: 1 } },
                    { editStatus: { [Op.notLike]: `Pending` } }
                ]
            }
        });
       
       
        
       
        ////finalpendingreport end 

        res.status(200).json({ message: "QC Count", pendingQC, approvedQC });
    }
    catch (err) {
        res.status(500).json({ message: "Error in QC Report Count", error: err });
    }
}
export default getTotalQcCountPM;