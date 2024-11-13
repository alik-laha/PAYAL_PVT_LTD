import { Request, Response } from "express";
import {  StoreIssueData } from "../../type/type";
import ItemIssueEdit from "../../model/itemIssueEdit";
import ItemIssue from "../../model/itemissueModel";



const acceptIssueEditPrimary = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const approvedBy= req.cookies.user
        const editPackageMaterial: StoreIssueData = await ItemIssueEdit.findOne({ where: { id } }) as unknown as StoreIssueData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit Issue material not found" });
        
        // const vendor = await VendorName.findOne({ where: { vendorName:editPackageMaterial.vendorName } });
        // if (!vendor) {
        //     VendorName.create({ vendorName:editPackageMaterial.vendorName, createdBy: editPackageMaterial.createdBy });
        // }
        // const skuData = await SkuModel.findOne({ where: { sku:editPackageMaterial.sku } });
        // if (!skuData) {
        //     SkuModel.create({ sku:editPackageMaterial.sku, unit:editPackageMaterial.unit,createdBy: editPackageMaterial.createdBy });
        // }
        
        
        const updatePackageMaterial = await ItemIssue.update({

            date:editPackageMaterial.date,
            category:editPackageMaterial.category,
            materialName:editPackageMaterial.materialName,
            quantity:editPackageMaterial.quantity,
            itemunit:editPackageMaterial.itemunit,
            unitPrice:editPackageMaterial.unitPrice,
            totalPrice:editPackageMaterial.totalPrice,
            section:editPackageMaterial.section,
            subsection:editPackageMaterial.subsection,
            sectionunit:editPackageMaterial.sectionunit,
            issueUser:editPackageMaterial.issueUser,
            damagereturn:editPackageMaterial.damagereturn,
            damagequantity:editPackageMaterial.damagequantity,
            damageunit:editPackageMaterial.damageunit,
            remarks:editPackageMaterial.remarks,
            editStatus: "Approved",
            CreatedBy:editPackageMaterial.CreatedBy,
            modifiedBy:approvedBy

        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting Item Issue Edit" });
        const deleteEditPackageMaterial = await ItemIssueEdit.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting Modified Item Issue" });
        return res.status(200).json({ message: "Modification of Item Issue accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}
export default acceptIssueEditPrimary;
