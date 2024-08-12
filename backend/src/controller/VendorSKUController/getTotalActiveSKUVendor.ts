import { Request, Response } from "express";

import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";


const getTotalActiveSKUVendor = async (req: Request, res: Response) => {
    try {
        const SKU = await SkuModel.count({ distinct:true,col:'sku',
            });
        const Vendor = await VendorName.count({ distinct:true,col:'vendorName',
                });
        
        res.status(200).json({ message: "SKU & Vendor Count", SKU,Vendor });
    }
    catch (err) {
        res.status(500).json({ message: "Error in Active Vendor & Asset Count", error: err });
    }
}
export default getTotalActiveSKUVendor;