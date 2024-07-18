import { Request, Response } from "express";
import RcnScooping from "../../model/scoopingModel";

const CreateInitialScooping = async (req: Request, res: Response) => {

    try {
        const { ScoopingLine,columnLotNo,sizeName,size,origin,rcvQuantity,openQuantity } = req.body.data2;
        
        const scoopingnInitial = await RcnScooping.create({
            Scooping_Line_Mc:ScoopingLine,
            Size:size,
            SizeName:sizeName,
            origin, 
            LotNo:columnLotNo,
            Opening_Qty:openQuantity,
            Receiving_Qty:rcvQuantity

        });
        res.status(200).json({ message: "Boiling Entry Made Successfully" });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export default CreateInitialScooping;