import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import RcvVillageModel from "../../model/RcvVillageModel";
import VendorName from "../../model/vendorNameModel";

const updateRcvVillage = async (req: Request, res: Response) => {
    try {
        const { gateType,sku, vendorN, quantity ,invoice,type,remarks,totalWt} = req.body.data;
        let vendortype:string
        if(gateType==='IN'){
            vendortype='Vendor'
        }
       else{
            vendortype='Party'
       }
        const id=req.params.id;
        const createdBy = req.cookies.user;
      
        let vendorData = await VendorName.findOne({ where: { vendorName:vendorN,type:vendortype,section:'Village' } });
        if(!vendorData){
            return res.status(500).json({ message: "Party Does Not Exist" });
        }
        else{
            const newPackageMaterial = await RcvVillageModel.update({
               
                sku,invoice,type,
                vendorName:vendorN,
                quantity,
                remarks,totalWt,
                createdBy,status:1
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "Village material received/dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating Village Entry" });
            }
        }
      
            

        
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating Village Entry" });

    }
}
export default updateRcvVillage;