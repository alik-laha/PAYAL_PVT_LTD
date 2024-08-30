import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";
import SkuModel from "../../model/SkuModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";


const updateGeneralEntire = async (req: Request, res: Response) => {
    try {
        const id=req.params.id;
       // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData=req.body.data
        const firstrow=formData[0]
        const { sku, vendorName, quantity, unit ,invoicedate,invoice,invoicequantity,type,remarks,totalWt,totalBill} = firstrow;
        let skuData = await SkuModel.findOne({ where: { sku ,type,section:'General'} });
        //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        if(!skuData ){
            return res.status(500).json({ message: "SKU Does Not Exist" });
        }
        else
        {
            await generalPrimaryModel.sequelize?.transaction( async (transaction) =>{
                const dataToUpdate=formData.slice(1)
                console.log(dataToUpdate)
                for (let data of dataToUpdate)
                {
                    //console.log(data)
                    let skuData = await SkuModel.findOne({ where: { sku:data.sku ,type:data.type,section:'General'} });
                    if(!skuData ){
                        res.status(500).json({ message: "SKU Does Not Exist" });
                        throw new Error ('Transaction Aborted')
                    }
                    await generalPrimaryModel.create({
                        gatePassNo:data.GatePassNo,grossWt:data.GrossWt,truckNo:data.TruckNo,
                        recevingDate:data.recevingDate,
                        sku:data.sku,invoice:data.invoice,invoicedate:data.invoicedate,
                        vendorName:data.vendorName,invoicequantity:data.invoicequantity,type:data.type,
                        quantity:data.quantity,totalBill:data.totalBill,
                        unit:data.unit,remarks:data.remarks,totalWt:data.totalWt,
                        createdBy,status:1,gateType:data.gateType
                },{transaction})
            }        
            })
            const newPackageMaterial = await generalPrimaryModel.update({
                sku,invoice,invoicedate,type,
                    vendorName,
                    quantity,
                    invoicequantity,
                    unit,remarks,totalWt,totalBill,
                    createdBy,status:1
            }, {
                where: {
                    id: id
                }
            });
            if(newPackageMaterial){
                return res.status(201).json({ message: "General material received/dispatched successfully", newPackageMaterial });
            }
            else{
                return res.status(500).json({ message: "internal error while creating General Entry" });
            }
        }
       

    
        
        

    } catch (error) {
        
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating General Entry" ,error});
        }
        

    }
}
export default updateGeneralEntire;