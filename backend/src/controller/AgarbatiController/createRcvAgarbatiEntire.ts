import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";



const updateRcvAgarbatiEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const { sku, vendorName, invoicedate, invoice, quantity, type, totalWt, totalBill } = firstrow;


        await agarbatiPrimaryEntryModel.sequelize?.transaction(async (transaction) => {
            const newPackageMaterial = await agarbatiPrimaryEntryModel.update({
                invoice: invoice,
                invoicedate: invoicedate,
                noOfBags: quantity ? parseInt(quantity) : 0,
                type: type,
                createdBy: createdBy,
                vendorName: vendorName,
                status: 1,
                grade: sku,
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
                    await agarbatiPrimaryEntryModel.create({
                        gatePassNo: data.GatePassNo, grossWt: data.GrossWt, truckNo: data.TruckNo,
                        gateType: data.gateType,
                        recevingDate: data.recevingDate,
                        invoice: data.invoice,
                        invoicedate: data.invoicedate,
                        noOfBags: data.quantity ? parseInt(data.quantity) : 0,
                        type: data.type,
                        createdBy: createdBy,
                        vendorName: data.vendorName,
                        status: 1,
                        grade: data.sku,
                        totalWt: data.totalWt, totalBill: data.totalBill


                    }, { transaction })
                }
                return res.status(201).json({ message: "Agarbati Item received/dispatched successfully" });

            }
            else{
                return res.status(500).json({ message: "internal error while creating Agarbati Rcv/Dispatch Entry" });
            }



        })

        




    } catch (error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "internal error while creating Agarbati Entry" ,error});
        }
   

    }
}
export default updateRcvAgarbatiEntire;