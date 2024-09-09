import { Request, Response } from "express";
import QceditRCN from "../../model/qcRCNeditmodel";
import QcRCN from "../../model/qcRCNmodel";
import WhatsappMsg from "../../helper/WhatsappMsg";



const modifyrcnReport = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { origin,date,blNo,conNo,qcapprvBy, sampling,moisture,nutCount ,fluteRate,goodKernel,spim,reject,shell
            ,outturn,remarks } = req.body;
        
         const createdBy = req.cookies.user
        //const editedBy = "RC User 2"
        if (!id) {
            return res.status(400).json({ message: "Please Provide the id" });
        }
        const rcnedit = await QceditRCN.create(
            {   
                id:id,
                origin:origin,
                date:date,
                blNo:blNo,
                conNo:conNo,
                sampling: sampling,
                moisture:moisture,
                nutCount:nutCount,
                fluteRate:fluteRate,
                spIm:spim,
                goodKernel:goodKernel,
                reject:reject,
                shell:shell,
                outTurn:outturn,
                Remarks:remarks,
                createdBy:createdBy,
                reportStatus:0,
                qcapprovedBy:qcapprvBy,
                editStatus:'Pending'
            },
           
        );
      
        if(rcnedit){
            const rcn = await QcRCN.update(
                {   
                   editStatus:'Pending',
                   reportStatus:0
    
                },
                {
                    where: {
                        id,
                    },
                }
            );
            if(rcn){
                const data = await WhatsappMsg("RCN Incoming QC", createdBy,"modify_request","QC")
                 console.log(data)
                    return res.status(200).json({ message: "RCN QC Report Edit Requested",rcn });
            }
            else{
                return res.status(400).json({ message: " QC Rcn Edit Entry is not found" });
            }
        }
        else{
            return res.status(400).json({ message: " QC Rcn Edit Entry is not found" });

        }
        

        
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default modifyrcnReport;