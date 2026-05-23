import { Request, Response } from "express";
//import sequelize from "../../config/databaseConfig";

import storePrimaryModel from "../../model/storePrimaryModel";
import ItemIssueEdit from "../../model/itemIssueEdit";

const getUnEntriedStorePrimary = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await storePrimaryModel.findAll({
    attributes: ['gatePassNo', 'gateType'],
    where: { status },
    group: ['gatePassNo', 'gateType']
  });

        if(rcnLot){
            res.status(200).json({ message: "UnEntried Store Primary Items Found", rcnLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding UnEntried Store Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default getUnEntriedStorePrimary;