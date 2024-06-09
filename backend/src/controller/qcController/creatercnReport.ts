import { Request, Response } from "express";
import QcRCN from "../../model/qcRCNmodel";


const creatercnReport = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {  sampling,moisture,nutCount ,fluteRate,goodKernel,spim,reject,shell
            ,outturn,remarks } = req.body;
        
         const createdBy = req.cookies.user
        //const editedBy = "RC User 2"
        if (!id) {
            return res.status(400).json({ message: "Please Provide the id" });
        }
        const rcn = await QcRCN.update(
            {
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
                reportStatus:1
            },
            {
                where: {
                    id,
                },
            }
        );

       
        return res.status(200).json({ message: "RCN QC Report Uploaded Successfully",rcn });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default creatercnReport;