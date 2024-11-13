import { Request, Response } from "express";


//import VendorName from "../../model/vendorNameModel";

import oilMillModel from "../../model/oilMillModel";

const updateOilMIllExit = async (req: Request, res: Response) => {
    try {
        const { vendorName ,invoicedate,invoice,quantity,type,totalWt,gateType,totalBill} = req.body.data;
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
        const id=req.params.id;
        const createdBy = req.cookies.user;
       
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Almond' } });
        // if( !vendorData){
        //     return res.status(500).json({ message: "Vendor Does Not Exist" });
        // }
        // else{
           
        //     //folllowing block will go here
        // }
        const newPackageMaterial = await oilMillModel.update({
            invoice:invoice,
            invoicedate:invoicedate,
            quantity:quantity ?parseInt(quantity):0,
            type:type,
            createdBy:createdBy,
            vendorName:vendorName,
            status:1,
           
            totalWt:totalWt,totalBill
           
        }, {
            where: {
                id: id
            }
        });
        if(newPackageMaterial){
            return res.status(201).json({ message: "OilMill items Dispatched Successfully", newPackageMaterial });
        }
        else{
            return res.status(500).json({ message: "internal error while creating OilMill Item Exit" });
        }
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating OilMill Dispatch" });

    }
}
export default updateOilMIllExit;