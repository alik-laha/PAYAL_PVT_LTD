import { Request, Response } from "express";
import {  QCWaterData } from "../../type/type";
import QCWaterEdit from "../../model/QCWaterEditModel";
import QCWater from "../../model/QCWaterModel";



const acceptQCWaterEditPrimary = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const approvedBy= req.cookies.user
        const editPackageMaterial: QCWaterData = await QCWaterEdit.findOne({ where: { id } }) as unknown as QCWaterData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit QC Water not found" });
        
      
        
        
        const updatePackageMaterial = await QCWater.update({
            
            date:editPackageMaterial.date,
            Mc_on:editPackageMaterial.Mc_on,
            feedph:editPackageMaterial.feedph,
            feedtds:editPackageMaterial.feedtds,
            feedhardness:editPackageMaterial.feedhardness,
            boilertype:editPackageMaterial.boilertype,
            ph:editPackageMaterial.ph,
            tds:editPackageMaterial.tds,
            day:editPackageMaterial.day,
            night:editPackageMaterial.night,
            wateruse:editPackageMaterial.wateruse,
            reading:editPackageMaterial.reading,
           
            remarks:editPackageMaterial.remarks,
            editStatus: "Approved",
            CreatedBy:editPackageMaterial.CreatedBy,
            modifiedBy:approvedBy

        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting QC Water Edit" });
        const deleteEditPackageMaterial = await QCWaterEdit.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting Modified QC Water" });
        return res.status(200).json({ message: "Modification of QC Water accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}
export default acceptQCWaterEditPrimary;
