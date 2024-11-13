import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import oilMillModel from "../../model/oilMillModel";



const updateRcvOilMIllEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const {  vendorName, invoicedate, invoice, quantity, type, totalWt, totalBill } = firstrow;


        await almondPrimaryEntryModel.sequelize?.transaction(async (transaction) => {
            const newPackageMaterial = await oilMillModel.update({
                invoice: invoice,
                invoicedate: invoicedate,
                quantity: quantity ? parseInt(quantity) : 0,
                type: type,
                createdBy: createdBy,
                vendorName: vendorName,
                status: 1,
       
                totalWt: totalWt, totalBill
            }, {
                where: {
                    id: id
                },transaction
            });
            if (newPackageMaterial) {
                const dataToUpdate = formData.slice(1)
                for (let data of dataToUpdate) {
                    //console.log(data)
                    await oilMillModel.create({
                        gatePassNo: data.GatePassNo, grossWt: data.GrossWt, truckNo: data.TruckNo,
                        gateType: data.gateType,
                        recevingDate: data.recevingDate,
                        invoice: data.invoice,
                        invoicedate: data.invoicedate,
                        quantity: data.quantity ? parseInt(data.quantity) : 0,
                        type: data.type,
                        createdBy: createdBy,
                        vendorName: data.vendorName,
                        status: 1,
                       
                        totalWt: data.totalWt, totalBill: data.totalBill


                    }, { transaction })
                }
                return res.status(201).json({ message: "OilMill Items Dispatched successfully" });

            }
            else{
                return res.status(500).json({ message: "internal error while creating OilMill Dispatch Entry" });
            }



        })

        




    } catch (error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "internal error while creating Almond Entry" ,error});
        }
   

    }
}
export default updateRcvOilMIllEntire;