import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";
import SkuModel from "../../model/SkuModel";

import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";
import PackageMaterial from "../../model/recevingPackagingMaterialModel";
import sequelize from "../../config/databaseConfig";

const updatePMEntire = async (req: Request, res: Response) => {
    try {
        const id=req.params.id;
       // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData=req.body.data
        const gatePassNo  = req.body.gatePassNo
        const firstrow=formData[0]
        const { sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type,remarks,totalWt,totalBill} = firstrow;
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'PackagingMaterial'} });
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        if(!skuData ){
            return res.status(500).json({ message: "SKU Does Not Exist" });
        }
        else
        {
            await sequelize.transaction( async (transaction) =>{
                const dataToUpdate=formData.slice(1)
                console.log(dataToUpdate)
                for (let data of dataToUpdate)
                {
                    //console.log(data)
                    let skuData = await SkuModel.findOne({ where: { sku: data.sku, type: data.type, section: 'PackagingMaterial' } });
                    if (!skuData) {
                        res.status(500).json({ message: "SKU Does Not Exist" });
                        throw new Error('Transaction Aborted 1')
                    }
                    const PMRes = await PackageMaterial.create({
                        gatePassNo: data.GatePassNo, grossWt: data.GrossWt, truckNo: data.TruckNo,
                        recevingDate: data.recevingDate,
                        sku: data.sku, invoice: data.invoice, invoicedate: data.invoicedate,
                        vendorName: data.vendorName, invoicequantity: data.invoicequantity, type: data.type,
                        quantity: data.quantity, totalBill: data.totalBill,
                        unit: data.unit, remarks: data.remarks, totalWt: data.totalWt,
                        createdBy, status: 1
                    },{transaction})
                    if (PMRes) {
                        //console.log(PMRes)
                        console.log(PMRes.dataValues.id)
                        const create =await QualityPackageMaterial.create({ id:PMRes.dataValues.id, gatePassNo }, { transaction })
                        if (!create) return res.status(400).json({ message: "internal error while creating PM" })
                        //return res.status(201).json({ msg: "sucessFully created" })
                        //return res.status(201).json({ message: "package material received successfully", newPackageMaterial });


                    }
                    else {
                        throw new Error('Transaction Aborted 2')
                    }
                    
                }   
                const newPackageMaterial = await PackageMaterial.update({
                    sku,invoice,invoicedate,type,
                        vendorName,
                        quantity,
                        invoicequantity,
                        unit,remarks,totalWt,totalBill,
                        createdBy,status:1
                }, {
                    where: {
                        id: id
                    },transaction}
                );   
                
                if(newPackageMaterial){
                    const create =await QualityPackageMaterial.create({ id ,gatePassNo},{transaction})
                    if (!create)
                    {
                       res.status(400).json({ message: "internal error while creating PM 2" })
                       throw new Error('Transaction Aborted 3')
                    } 
                    //return res.status(201).json({ msg: "sucessFully created" })
                    return res.status(201).json({ message: "package material received successfully", newPackageMaterial });
                }
                else{
                    res.status(400).json({ message: "internal error while creating PM 3" })
                    throw new Error('Transaction Aborted 4')
                }
            })
            
                //return res.status(201).json({ message: "General material received/dispatched successfully", newPackageMaterial });
            
          
        }
       

    
        
        

    } catch (error) {
        
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating PM Entry" ,error});
        }
        

    }
}
export default updatePMEntire;