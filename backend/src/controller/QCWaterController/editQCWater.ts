import { Request, Response } from "express";


import {  QCWaterData } from "../../type/type";

import WhatsappMsg from "../../helper/WhatsappMsg";
import QCWater from "../../model/QCWaterModel";
import QCWaterEdit from "../../model/QCWaterEditModel";


const editQCWater = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        const {   date,Mc_on,feedph,feedtds,boilertype,feedhardness,ph,tds,day,night,wateruse,reading,remarks } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        
       
      
            
        const packageMaterialData: QCWaterData = await QCWater.findOne({ where: { id } }) as unknown as QCWaterData;
        if (!packageMaterialData) return res.status(404).json({ message: "QC Water Details Not found" });
        
        console.log(req.body)
        const editPackageMaterial = await QCWaterEdit.create({
            id: packageMaterialData.id,
            date:date,
                    Mc_on:Mc_on,
                    feedph:feedph,
                    feedtds:feedtds,
                    feedhardness:feedhardness,
                    boilertype:boilertype,
                    ph:ph,
                    tds:tds,
                    day:day,
                    night:night,
                    wateruse:wateruse,
                    reading:reading,
                    
                    remarks:remarks,
            editStatus: "Pending",
            CreatedBy:createdBynew
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing QC Water" });
        const updatePackageMaterial = await QCWater.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing QC Water" });
        const data = await WhatsappMsg("QC Water", createdBynew,"modify_request","QC")
        console.log(data)
        return res.status(201).json({ message: "QC Water Entry Details edited successfully" });
        

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default editQCWater;