import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";
import { RcnPrimaryModifyProps } from "../../type/type";
import WhatsappMsg from "../../helper/WhatsappMsg";

const UpdateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin, date } = req.body;
        let difference = netWeight -blWeight ;
        let systemBags=(netWeight/80).toFixed(2)

        const editedBy = req.cookies.user
            if (!id) 
            {
            return res.status(400).json({ message: "Please provide the id" });
            }
        
            const rcnData = (await RcnPrimary.findOne({
                where: {
                    id,
                },
            })) as RcnPrimaryModifyProps | null;
    
            if(rcnData){
                const rcnEdit = await RcnEdit.create({
                    gatePassNo:rcnData?.gatePassNo,
                    grossWt:rcnData?.grossWt,
                    blNo,
                    truckNo,
                    conNo,
                    systemBags,
                    blWeight,
                    netWeight,
                    difference,
                    noOfBags,
                    origin,
                    id,
                    editedBy,
                    rcnStatus: rcnData?.rcnStatus,
                    date
        
        
                });
                if(rcnEdit){
                    const rcn = await RcnPrimary.update(
                        {
                            editStatus: "Pending",
                        },
                        {
                            where: {
                                id,
                            },
                        }
                    );
                    if(rcn){
                        const data = await WhatsappMsg("RCN Primary Receiving", editedBy, "modify_request")
                    console.log(data)
                    return res.status(200).json({ message: "Rcn Entry updated successfully Wait for approval" });
                    }
                    
                }
            }
            //console.log(rcn);
            else{
                res.status(500).json({ message: "Internal Server Error" });
            }
           

        
        
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default UpdateRcnPrimaryEntry;