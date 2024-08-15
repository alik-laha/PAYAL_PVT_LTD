import { Request, Response } from "express";

import VendorName from "../../model/vendorNameModel";

const deleteVendor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await VendorName.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: "Vendor has been deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export default deleteVendor;