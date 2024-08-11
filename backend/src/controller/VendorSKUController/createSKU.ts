import { Request, Response } from "express";

import SkuModel from "../../model/SkuModel";



const createSKU = async (req: Request, res: Response) => {
try{
   
    const { sku, unit, section} = req.body;
 
    const feeledBy = req.cookies.user;
    if(!unit || !section ){
        return res.status(500).json({ message: "All Fields Are Required" });
    }
    else{
        console.log('reached sku 1')
        const skuEntry = await SkuModel.create({
            sku,unit,
            section,
            createdBy: feeledBy
        });
    
        if (skuEntry) {
            return res.status(200).json({ message: "SKU Entry Created Successfully" });
        }
    }
   
}
catch (err) {
    return res.status(500).json({ message: "Error in Creating SKU", err });
}

}
export default createSKU;