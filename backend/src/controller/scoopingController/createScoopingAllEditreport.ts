import { Request, Response } from "express";

import RcnAllEditScooping from "../../model/scoopingAllEditModel";


const createscoopingAllEditReport = async (req: Request, res: Response) => {


    try {


        let { LotNo,
            origin,

            Opening_Qty,
            Receiving_Qty,
            Wholes,
            Broken,
            Uncut,
            Unscoop,
            NonCut,
            Rejection,
            Dust,

            noOfEmployees,
            noOfOperators, male, female, supervisor, Date } = req.body.data2;

        const createdBy = req.cookies.user
        const total_bag = (((parseFloat(Receiving_Qty) + parseFloat(Opening_Qty))
            - (parseFloat(Uncut) + parseFloat(Unscoop) + parseFloat(NonCut) + parseFloat(Dust))) / 80)
        console.log(total_bag)

        const kor = ((parseFloat(Wholes) + parseFloat(Broken)) / (total_bag * 0.453)).toFixed(2)
        const scoop = await RcnAllEditScooping.create(
            {
                LotNo: LotNo,
                origin: origin,

                Opening_Qty: Opening_Qty,
                Receiving_Qty: Receiving_Qty,
                date: Date,
                Wholes: Wholes,
                Broken: Broken,
                Unscoop: Unscoop,
                Uncut: Uncut,
                NonCut: NonCut,
                Rejection: Rejection,
                Dust: Dust,
                KOR: kor,
                TotBagCutting: total_bag,
                noOfGents: male,
                noOfLadies: female,
                noOfSupervisors: supervisor,
                noOfEmployees: noOfEmployees,
                noOfOperators: noOfOperators,
                CreatedBy: createdBy,


            }
        );



        return res.status(200).json({ message: "RCN Scooping Entry is Uploaded Successfully", scoop });
    } catch (err) {
        return res.status(500).json({ message: "internal server Error", err });
    }
}

export default createscoopingAllEditReport;