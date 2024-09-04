import { Request, Response } from "express";

import { Op } from "sequelize";

import RcvVillageModel from "../../model/RcvVillageModel";



const deleteVillagePrimary = async (req: Request, res: Response) => {
    try{
    const id = req.body.id
    const gatepass = req.body.gatepass
    await RcvVillageModel.update(
        {
            sku:null,
            invoice:null,
        
            vendorName:null,
            quantity:null,
          
            type:null,
         
            createdBy:null,
            status:0,remarks:null,totalWt:null
           
        },
        {
            where: {
                id:id
            },
        }
    );
   

    await RcvVillageModel.destroy({
        where: {
            gatePassNo: gatepass,
            id: { [Op.notLike]: id } 
            
        }
    });
    return res.status(200).json({ message: "Village Item Entry Is deleted successfully" })
}

    catch{
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export default deleteVillagePrimary;