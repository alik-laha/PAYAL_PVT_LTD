import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";
import { RcnPrimaryModifyProps } from "../../type/type";
import WhatsappMsg from "../../helper/WhatsappMsg";

const UpdateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin, date } = req.body;
        const difference = blWeight - netWeight;
        const editedBy = req.cookies.user
        if (!id) {
            return res.status(400).json({ message: "Please provide the id" });
        }
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

        const rcnData = (await RcnPrimary.findOne({
            where: {
                id,
            },
        })) as RcnPrimaryModifyProps | null;

        const data = await WhatsappMsg("RcnPrimary", editedBy)
        console.log(data)


        console.log(rcn);
        const rcnEdit = await RcnEdit.create({
            blNo,
            truckNo,
            conNo,
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
        return res.status(200).json({ message: "Rcn Entry updated successfully Wait for approve" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default UpdateRcnPrimaryEntry;