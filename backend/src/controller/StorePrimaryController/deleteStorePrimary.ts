import { Request, Response } from "express";

import { Op } from "sequelize";

import storePrimaryModel from "../../model/storePrimaryModel";



const deleteStorePrimary = async (req: Request, res: Response) => {
    try{
    const id = req.body.id
    const gatepass = req.body.gatepass
    await storePrimaryModel.update(
        {
            sku:null,
            invoice:null,
            invoicedate:null,
            vendorName:null,
            quantity:null,
            invoicequantity:null,
            type:null,
            unit:null,
            createdBy:null,
            status:0,remarks:null,totalWt:null,totalBill:null
           
        },
        {
            where: {
                id:id
            },
        }
    );
   

    await storePrimaryModel.destroy({
        where: {
            gatePassNo: gatepass,
            id: { [Op.notLike]: id } 
            
        }
    });
    return res.status(200).json({ message: "Store Item Entry Is deleted successfully" })
}

    catch{
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export default deleteStorePrimary;