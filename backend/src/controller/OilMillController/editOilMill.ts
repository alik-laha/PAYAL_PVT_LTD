import { Request, Response } from "express";

import { AlmondrcvData } from "../../type/type";
import WhatsappMsg from "../../helper/WhatsappMsg";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import almondPrimaryEntryEditModel from "../../model/almondPrimaryEditModel";
import oilMillModel from "../../model/oilMillModel";
import oilMillEditModel from "../../model/oilMillEditModel";
//import VendorName from "../../model/vendorNameModel";

const EditOilMIllEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        console.log('Reached Here')
        const {  gatePassNo,gatetype,almondtype,
            grossWt, truckNo, noOfBags, VendorNam, weight, invoice, invoicedate,date,totalBill } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        //console.log(req.body)
        let vendortype:string
        if(gatetype==='IN'){
            vendortype='Vendor'
        }
        else{
            vendortype='Party'
        }
       
        //let vendorData = await VendorName.findOne({ where: { vendorName:VendorNam,type:vendortype,section:'Almond' } });
        // if( !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        // else{
        //     //folllowing code block will enter here
     
        // }

        const packageMaterialData: AlmondrcvData = await oilMillModel.findOne({ where: { id } }) as unknown as AlmondrcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Almond Item not found" });
        let netwt=req.body.netWeight
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await oilMillEditModel.create({
            id: packageMaterialData.id,
            gateType:gatetype,
            gatePassNo:gatePassNo,
            grossWt:grossWt,
            netWeight:netwt,
            recevingDate:date,
            status:1, 
            createdBy: createdBynew,
            editStatus: "Pending",
            quantity: parseInt(noOfBags),
            truckNo: truckNo,
            invoicedate: invoicedate,
            invoice: invoice,  
     
            type: almondtype,
            vendorName: VendorNam, 
            totalWt:weight,
            totalBill
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing OilMill Item" });
        const updatePackageMaterial = await oilMillModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing OilMill Item" });
        const data = await WhatsappMsg("OilMill Dispatch", createdBynew,"modify_request","Receiving")
        console.log(data)
        return res.status(201).json({ message: "OilMill material edited successfully" });

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default EditOilMIllEntry;