import { Request, Response } from "express";
import VendorName from "../../model/vendorNameModel";



const createVendor = async (req: Request, res: Response) => {
try{
   
    const { vendor,vendoradd,vendorNo,section,type} = req.body;
 
    const feeledBy = req.cookies.user;
    if(!section ){
        return res.status(500).json({ message: "All Fields Are Required" });
    }
    else{
    
        const skuEntry = await VendorName.create({
            vendorName:vendor,
            vendorAddress:vendoradd,
            vendorContact:vendorNo,
            section,type,
            createdBy: feeledBy
        });
    
        if (skuEntry) {
            return res.status(200).json({ message: "Vendor Entry Created Successfully" });
        }
    }
   
}
catch (err) {
    return res.status(500).json({ message: "Error in Creating Vendor/Duplicate Entry", err });
}

}
export default createVendor;