import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import RcvVillageModel from "../../model/RcvVillageModel";



const updateRcvVillageEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const { sku, vendorName, quantity, invoice, type, remarks, totalWt } = firstrow;


        await RcvVillageModel.sequelize?.transaction(async (transaction) => {
            const newPackageMaterial = await RcvVillageModel.update({

                sku, invoice, type,
                vendorName,
                quantity,
                remarks, totalWt,
                createdBy, status: 1
            }, {
                where: {
                    id: id
                }, transaction
            });
            if (newPackageMaterial) {
                const dataToUpdate = formData.slice(1)
                for (let data of dataToUpdate) {
                    console.log(data)
                    await RcvVillageModel.create({
                        gatePassNo: data.GatePassNo, grossWt: data.GrossWt, truckNo: data.TruckNo,
                        recevingDate: data.recevingDate,
                        sku: data.sku, invoice: data.invoice,
                        vendorName: data.vendorName, type: data.type,
                        quantity: data.quantity,
                        remarks: data.remarks, totalWt: data.totalWt,
                        createdBy, status: 1, gateType: data.gateType
                    }, { transaction })
                }
                return res.status(201).json({ message: "Village Item received/dispatched successfully" });
            }
            else {
                return res.status(500).json({ message: "internal error while creating Village Receive/Dispatch Entry" });
            }

           
        })
    
    } catch (error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "internal error while creating Village Entry" ,error});
        }
   

    }
}
export default updateRcvVillageEntire;