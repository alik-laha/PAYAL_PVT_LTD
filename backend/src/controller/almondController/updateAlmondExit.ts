import { Request, Response } from "express";


import VendorName from "../../model/vendorNameModel";

import almondPrimaryEntryModel from "../../model/almondPrimaryModel";

const updateAlmondExit = async (req: Request, res: Response) => {
    try {
        const { sku, vendorName ,invoicedate,invoice,quantity,type,totalWt,gateType} = req.body.data;
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
        const id=req.params.id;
        const createdBy = req.cookies.user;
       
        let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Almond' } });
        if( !vendorData){
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }
        else{
            const newPackageMaterial = await almondPrimaryEntryModel.update({
                invoice:invoice,
                invoicedate:invoicedate,
                noOfBags:parseInt(quantity),
                type:type,
                createdBy:createdBy,
                vendorName:vendorName,
                status:1,
                grade:sku,
                totalWt:totalWt
               
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "Almond item dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating Almond Item Exit" });
            }

        }
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating General Item" });

    }
}
export default updateAlmondExit;