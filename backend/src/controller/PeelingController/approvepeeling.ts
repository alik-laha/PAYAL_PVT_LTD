import { Request, Response } from "express";
import { PeelingRcvData } from "../../type/type";
import RcnEditPeeling from "../../model/peelingEditModel";
import RcnPeeling from "../../model/peelingModel";
import Mayur from "../../model/mayurModel";
import DPDS from "../../model/dpdsmodel";
import bigTaihoModel from "../../model/bigTaihoModel";
import SortingModel from "../../model/sortingModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";

const approvePeeling = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data: PeelingRcvData | null = await RcnEditPeeling.findOne({
            where: {
                id
            }
        }) as PeelingRcvData | null;
        if (!data) {
            return res.status(400).json({ message: "Peeling Entry not found" });
        }
        const bormaEdit = await RcnPeeling.update({
            date: data.date,
            Mc_on: data.Mc_on,
            Mc_off: data.Mc_off,
            Mc_breakdown: data.Mc_breakdown,
            Mc_runTime: data.Mc_runTime,
            noOfdayOperators: data.noOfdayOperators,
            noOfnightOperators: data.noOfnightOperators,
            noOfhuskOperators: data.noOfhuskOperators,
            otherTime: data.otherTime,
            NoOfTrolley: data.NoOfTrolley,
            WholesPeel: data.WholesPeel,
            WholesUnpeel: data.WholesUnpeel,
            DP: data.DP,
            DS: data.DS,
            DP1: data.DP1,
            JJH: data.JJH,
            SJH: data.SJH,
            SJH1: data.SJH1,
            JH1: data.JH1,
            JK_K: data.JK_K,
            SP1: data.SP1,
            Husk: data.Husk,
             brokenp: data.brokenp,
            unpeelp: data.unpeelp,
            churap: data.churap,
            Rejection: data.Rejection,
            UnpeelPiece: data.UnpeelPiece,
            Big_Taiho: data.Big_Taiho,
            pressure: data.pressure,
            moisture: data.moisture,
            peelingTime: data.peelingTime,
            difference: data.difference,
            Status: 1,
            CreatedBy: data.CreatedBy,
            editStatus: "Approved",
            modifiedBy: approvedBy,



        }, {
            where: {
                id
            }
        });
        if (!bormaEdit) {
            return res.status(400).json({ message: "Peeling Entry is not found" });
        }
        else {
            const bormaEditDelete = await RcnEditPeeling.destroy({
                where: {
                    id
                }
            });
            if (!bormaEditDelete) {
                return res.status(400).json({ message: "Peeling Entry is not found" });
            }
            else {


                await Mayur.update(
                    {
                        rcv_wholespeel: data.WholesPeel,
                        rcv_wholesunpeel: data.WholesUnpeel,
                        current_backlog: parseFloat(data.WholesPeel) + parseFloat(data.WholesUnpeel),
                    },
                    {
                        where: {
                            LotNo: LotNo, origin: origin, latest: 1
                        }
                    })

                await DPDS.update(
                    {
                        rcv_dp: data.DP,
                        rcv_ds: data.DS,
                        rcv_dp1: data.DP1,
                        current_backlog: parseFloat(data.DP) + parseFloat(data.DS) + parseFloat(data.DP1),
                    },
                    {
                        where: {
                            LotNo: LotNo, origin: origin, latest: 1
                        }
                    })

                await SortingModel.update(
                        {
                            rcv_jjh: data.JJH,
                            rcv_sjh: data.SJH,
                            rcv_sjh1: data.SJH1,
                            rcv_jh1: data.JH1,
                            rcv_jk_k: data.JK_K,
                            rcv_sp1: data.SP1,
                            current_backlog:parseFloat(data.JJH)+parseFloat(data.SJH)+parseFloat(data.SJH1)
                            +parseFloat(data.JH1)+parseFloat(data.JK_K)+parseFloat(data.SP1),
                        },
                        {
                            where: {
                                LotNo: LotNo, origin: origin, latest: 1
                            }
                        })


                await bigTaihoModel.update(
                    {
                        rcv_peeling: data.Big_Taiho,
                        current_backlog: data.Big_Taiho
                    },
                    {
                        where: {
                            LotNo: LotNo, origin: origin, latest: 1
                        }
                    })


                await villageProduction.update(
                        {
                            rcv_peeling: data.UnpeelPiece,
                            current_backlog: data.UnpeelPiece
                        },
                        {
                            where: {
                                LotNo: LotNo, origin: origin, latest: 1
                            }
                        })




                    await rejectionModel.update(
                        {
                            rcv_peeling: data.Rejection,
                            current_backlog: data.Rejection
                        },
                        {
                            where: {
                                LotNo: LotNo, origin: origin, latest: 1
                            }
                        })
                return res.status(200).json({ message: "Edit Request of Peeling Entry is Approved Successfully" });
            }
        }





    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}
export default approvePeeling;