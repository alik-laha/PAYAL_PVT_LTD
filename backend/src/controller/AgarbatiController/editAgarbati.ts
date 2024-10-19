import { Request, Response } from "express";

import { AlmondrcvData } from "../../type/type";
import WhatsappMsg from "../../helper/WhatsappMsg";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";
import agarbatiPrimaryEntryEditModel from "../../model/agarbatiPrimaryEditModel";
//import VendorName from "../../model/vendorNameModel";

const EditAgarbatiEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew= req.cookies.user
        console.log('Reached Here')
        const {  gatePassNo,gatetype,almondtype,almondgrade,
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

        const packageMaterialData: AlmondrcvData = await agarbatiPrimaryEntryModel.findOne({ where: { id } }) as unknown as AlmondrcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Agarbati Item not found" });
        let netwt=req.body.netWeight
        if(netwt===''|| netwt===null)
        {
            netwt=0
        }
        console.log(req.body)
        const editPackageMaterial = await agarbatiPrimaryEntryEditModel.create({
            id: packageMaterialData.id,
            gateType:gatetype,
            gatePassNo:gatePassNo,
            grossWt:grossWt,
            netWeight:netwt,
            recevingDate:date,
            status:1, 
            createdBy: createdBynew,
            editStatus: "Pending",
            noOfBags: parseInt(noOfBags),
            truckNo: truckNo,
            invoicedate: invoicedate,
            invoice: invoice,  
            grade: almondgrade, 
            type: almondtype,
            vendorName: VendorNam, 
            totalWt:weight,
            totalBill
        });
      
        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Agarbati Item" });
        const updatePackageMaterial = await agarbatiPrimaryEntryModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Agarbati Item" });
        const data = await WhatsappMsg("Agarbati Primary Rcv/Dispatch", createdBynew,"modify_request","Receiving")
        console.log(data)
        return res.status(201).json({ message: "Agarbati material edited successfully" });

        
        

    }
    catch (err) {
        console.log(err);
    }
}
export default EditAgarbatiEntry;