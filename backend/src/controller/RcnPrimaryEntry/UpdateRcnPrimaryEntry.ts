import { Request, Response } from "express";
import RcnPrimary from "../../model/RcnEntryModel";
import RcnEdit from "../../model/RcnEditModel";
import { RcnPrimaryModifyProps } from "../../type/type";

const UpdateRcnPrimaryEntry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { blNo, truckNo, conNo, blWeight, netWeight, noOfBags, origin } = req.body;
        const difference = blWeight - netWeight;
        // const editedBy = req.cookies.user
        const editedBy = "RC User 2"
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
            date: rcnData?.date,
            rcnStatus: rcnData?.rcnStatus,


        });
        return res.status(200).json({ message: "Rcn Entry updated successfully Wait for approve" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
export default UpdateRcnPrimaryEntry;