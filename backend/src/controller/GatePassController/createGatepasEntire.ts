import { Request, Response } from "express";
import gatePass from "../../model/gatepassModel";
import sequelize from "../../config/databaseConfig";
import gatePassMaster from "../../model/gatePassMasterModel";
import RcnPrimary from "../../model/RcnEntryModel";
import WpMsgGatePassRcv from "../../helper/WpMsgGatePassRcv";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import RcvVillageModel from "../../model/RcvVillageModel";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";



const CreateGatePassEntire = async (req: Request, res: Response) => {
try{
    const formData=req.body.data
    const feeledBy = req.cookies.user;
    const lastGatePassNo = await gatePass.findOne({     
        order: [['gatePassNo', 'DESC']]
      });
      const newGatePassNo = lastGatePassNo ? parseInt(lastGatePassNo.dataValues.gatePassNo.slice(4)) + 1 : 1;
    //const lastgatepass = await gatePass.findOne({ order: [['id', 'DESC']] }) ;
    // const newId = lastgatepass ? lastgatepass.dataValues.id + 1 : 1;
    const gatepassNo = `PDPL${String(newGatePassNo).padStart(5, '0')}`;

    await sequelize.transaction( async (transaction) =>{
        const gate=await gatePass.create({ gatePassNo: gatepassNo ,createdBy:feeledBy},{transaction})
        if(gate)
        {
            for (let data of formData)
                {
                    const GatePassEntry = await gatePassMaster.create({
                        gatePassNo: gatepassNo,
                        date: data.Date,
                        time: data.Time,
                        DocNo:data.document,
                        type:data.type,
                        grosswt: data.grossWt,
                        grosswtNo: data.GrossWtSlip,
                        vehicleNo: data.vehicle,
                        driverName: data.drivername,
                        driverContact:data.driverContact,
                        securityName: data.SecName,
                        section: data.section,
                        createdBy: feeledBy,
                        status:'Pending_Receiving'
                    },{transaction});

                    if (GatePassEntry)
                    {
                        if (data.section==='RawCashew' && data.type==='IN') 
                        {
                            const RCNIncoming = await RcnPrimary.create({
                                gatePassNo: gatepassNo,
                                date: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,    
                            },{transaction});
                            if(RCNIncoming){
                                const data = await WpMsgGatePassRcv("Raw Cashew Incoming",gatepassNo,"gatepass_rcv_dispatch_final",'RCN Cashew IN')
                                console.log(data)
                                //return res.status(200).json({ message: "RCN Initial Entry Created Successfully" });
                            }
                            
                        }
                        if (data.section==='PackagingMaterial' && data.type==='IN') 
                        {
                            const PCIncoming = await PackagingMaterial.create({
                                gatePassNo: gatepassNo,
                                recevingDate: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,    
                            },{transaction});
                            if(PCIncoming){
                                const data = await WpMsgGatePassRcv("Packaging Material", gatepassNo,"gatepass_rcv_dispatch_final",'PC IN')
                                console.log(data)
                                //return res.status(200).json({ message: "PC Initial Entry Created Successfully" });
                            }    
                        }
                        if (data.section==='Store') 
                        {
                            const storeEntry = await storePrimaryModel.create({
                                gatePassNo: gatepassNo,
                                recevingDate: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,  
                                gateType:data.type   
                            },{transaction});
                            if(storeEntry){
                                const data = await WpMsgGatePassRcv("Store", gatepassNo,"gatepass_rcv_dispatch_final",'STORE ENTRY')
                                console.log(data)
                                //return res.status(200).json({ message: "Store Entry Created Successfully" });
                            }
                            
                        }
                        if (data.section==='General') {
                            const generalEntry = await generalPrimaryModel.create({
                                gatePassNo: gatepassNo,
                                recevingDate: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,  
                                gateType:data.type
                    
                            },{transaction});               
                            if(generalEntry){
                                const data = await WpMsgGatePassRcv("General", gatepassNo,"gatepass_rcv_dispatch_final",'GENERAL ENTRY')
                                console.log(data)
                                //return res.status(200).json({ message: "General Item Entry Created Successfully" });
                            }
                            
                        }
                        if (data.section==='Almond') {
                            const generalEntry = await almondPrimaryEntryModel.create({
                                gatePassNo:gatepassNo,
                                recevingDate: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,  
                                gateType:data.type
                    
                            },{transaction});
                           
                            if(generalEntry){
                                const data = await WpMsgGatePassRcv("Almond", gatepassNo,"gatepass_rcv_dispatch_final",'ALMOND ENTRY')
                                console.log(data)
                               // return res.status(200).json({ message: "Almond Item Entry Created Successfully" });
                            }
                            
                        }
                        if (data.section==='Village') {
                            const generalEntry = await RcvVillageModel.create({
                                gatePassNo: gatepassNo,
                                recevingDate: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,  
                                gateType:data.type
                    
                            },{transaction});
                            
                    
                            if(generalEntry){
                                const data = await WpMsgGatePassRcv("Village", gatepassNo,"gatepass_rcv_dispatch_final",'VILLAGE ENTRY')
                            console.log(data)
                               // return res.status(200).json({ message: "Village Item Entry Created Successfully" });
                            }
                            
                        }
                        if (data.section==='Agarbati') {
                            const agarbatiEntry = await agarbatiPrimaryEntryModel.create({
                                gatePassNo: gatepassNo,
                                recevingDate: data.Date,
                                grossWt:data.grossWt,
                                truckNo:data.vehicle,  
                                gateType:data.type
                    
                            },{transaction});
                            
                    
                            if(agarbatiEntry){
                                const data = await WpMsgGatePassRcv("Agarbati", gatepassNo,"gatepass_rcv_dispatch_final",'AGARBATI ENTRY')
                            console.log(data)
                               // return res.status(200).json({ message: "Village Item Entry Created Successfully" });
                            }
                            
                        }
                    }
                    else{
                        res.status(500).json({ message: "Error in Creating GatePass" });
                        throw new Error('Transaction Aborted 1')
                    }
                }
                await gatePass.update(
                    { 
                      status:'Sent To Receiver'
                    },
                    {
                        where: {
                            gatePassNo:gatepassNo
                        },transaction
                    }
                    );
                    return res.status(200).json({ message: `New Gatepass ID ${gatepassNo} Created Successfully` });
        }
        else{
            res.status(500).json({ message: "Error in Creating GatePass" });
            throw new Error('Transaction Aborted 1')
        }
    })
        
    //console.log('New sequence generated and saved:', newSequence);
    //return res.status(201).json({ message: `New GatePass ${gatepassNo} is Created`, gatepassNo });
}
catch (err) {
    if(!res.headersSent){
        console.log(err)
        return res.status(500).json({ message: "Error in Creating GatePass", err });
    }
   
}

}
export default CreateGatePassEntire;

