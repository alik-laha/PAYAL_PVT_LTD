import { Request, Response } from "express";

import { Op } from "sequelize";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";



const deletePMbyID = async (req: Request, res: Response) => {
    

    try{
    const id = req.body.id
    const gatepass = req.body.gatepass
    await PackagingMaterial.update(
        {
            sku:null,
            invoice:null,
            invoicedate:null,
            vendorName:null,
            quantity:null,
            unit:null,
            createdBy:null,
            status:0
           
        },
        {
            where: {
                id:id
            },
        }
    );
    await PackagingMaterial.destroy({
        where: {
            gatePassNo: gatepass,
            id: { [Op.notLike]: id } 
            
        }
    });
    return res.status(200).json({ message: "PM Entry Is deleted successfully" })
}

    catch{
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export default deletePMbyID;