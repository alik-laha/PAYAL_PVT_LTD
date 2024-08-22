import { Request, Response } from "express";

import { Op } from "sequelize";

import almondPrimaryEntryModel from "../../model/almondPrimaryModel";



const deleteAlmondPrimary = async (req: Request, res: Response) => {
    try{
    const id = req.body.id
    const gatepass = req.body.gatepass
    await almondPrimaryEntryModel.update(
        {
            noOfBags:null,
            invoice:null,
            invoicedate:null,
            vendorName:null,
            quantity:null,
            type:null,
            grade:null,
            createdBy:null,
            status:0,totalWt:null
           
        },
        {
            where: {
                id:id
            },
        }
    );
   

    await almondPrimaryEntryModel.destroy({
        where: {
            gatePassNo: gatepass,
            id: { [Op.notLike]: id } 
            
        }
    });
    return res.status(200).json({ message: "Almond Item Entry Is deleted successfully" })
}

    catch{
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export default deleteAlmondPrimary;