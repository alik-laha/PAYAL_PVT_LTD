import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import almondPrimaryEntryModel from "../../model/almondPrimaryModel";

const createAlmondExit = async (req: Request, res: Response) => {
    try {
        const { GatePassNo,recevingDate, TruckNo,GrossWt,sku, vendorName ,invoicedate,invoice,quantity,type,totalWt,gateType,totalBill} = req.body.data;
        const createdBy = req.cookies.user;
        
    //     let vendortype:string
    //     if(gateType==='IN'){
    //         vendortype='Vendor'
    //     }
    //    else{
    //         vendortype='Party'
    //    }

       // let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Almond' } });
        // if( !vendorData){
        //     return res.status(500).json({ message: "Vendor Does Not Exist" });
        // }
        // else{
            
        //     //following block (Line 28) will eter here
        // }
        const newPackageMaterial = await almondPrimaryEntryModel.create({
            gatePassNo:GatePassNo,grossWt:GrossWt,truckNo:TruckNo,
            gateType,
            recevingDate,
            invoice:invoice,
            invoicedate:invoicedate,
            noOfBags:quantity ?parseInt(quantity):0,
            type:type,
            createdBy:createdBy,
            vendorName:vendorName,
            status:1,
            grade:sku,
            totalWt:totalWt,totalBill
        });
        if(newPackageMaterial){
            return res.status(201).json({ message: "Almond Items dispatched successfully", newPackageMaterial });
        }
        else{
            return res.status(500).json({ message: "internal error while dispatching Almond Item" });
        }

      

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating General Item" });

    }
}
export default createAlmondExit;