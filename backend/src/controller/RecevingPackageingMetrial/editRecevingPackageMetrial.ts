import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import packageMaterial from "../../model/recevingPackagingMaterialModel";
import { PackageMaterialReceivingData } from "../../type/type";

import WhatsappMsg from "../../helper/WhatsappMsg";


const editRecevingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        const { recevingDate, sku, vendorName, quantity, unit,invoice,invoicedate } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        const packageMaterialData: PackageMaterialReceivingData = await packageMaterial.findOne({ where: { id } }) as unknown as PackageMaterialReceivingData;
        if (!packageMaterialData) return res.status(404).json({ message: "package material not found" });
      
        const editPackageMaterial = await EditPackagingMaterial.create({
            id: packageMaterialData.id,
            recevingDate,
            sku,
            vendorName,
            quantity,
            unit,invoice,invoicedate,
            createdBy: createdBynew,
            editStatus: "Pending",
            qualityStatus: packageMaterialData.qualityStatus,
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Packaging material" });
        const updatePackageMaterial = await packageMaterial.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Packaging material" });
        const data = await WhatsappMsg("Packaging Material Receiving", createdBynew,"modify_request")
        console.log(data)
        return res.status(201).json({ message: "package material edited successfully" });

    }
    catch (err) {
        console.log(err);
    }
}
export default editRecevingPackageMaterial;