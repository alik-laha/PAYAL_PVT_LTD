import { Request, Response } from "express";

import sequelize from "../../config/databaseConfig";

import QCWater from "../../model/QCWaterModel";

const CreateQCWaterEntire = async (req: Request, res: Response) => {
    try{
        const formData=req.body.data
        const feeledBy = req.cookies.user;

        

        

          await sequelize.transaction( async (transaction) =>{
            for (let data of formData){
             
               await QCWater.create({
                    
                    date:data.Date,
                    Mc_on:data.Time,
                    feedph:data.waterPh,
                    feedtds:data.waterTDS,
                    feedhardness:data.waterHardness,
                    boilertype:data.type,
                    ph:data.ph,
                    tds:data.tds,
                    day:data.day,
                    night:data.night,
                    wateruse:data.waterUse,
                    reading:data.reading,
                    
                    remarks:data.remarks,
                    CreatedBy:feeledBy
                },{transaction})

               
            }
            
          })
          return res.status(200).json({ message: `Water Quality Entry Created Successfully` });
    }
    catch(err){
        if(!res.headersSent){
            console.log(err)
            return res.status(500).json({ message: "Error in Creating Issue Item", err });
        }
    }
}
export default CreateQCWaterEntire;