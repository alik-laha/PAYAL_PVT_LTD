import { Request, Response } from "express";


import Mayur from "../../model/mayurModel";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import DPDS from "../../model/dpdsmodel";
import DPDSEdit from "../../model/dpdsEditModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import mixingModel from "../../model/mixingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";
import VLotNo from "../../model/vlotNomodel";


// //DPDS.tsx
export const findEditDPDSAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await DPDSEdit.findAll({ order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditDPDSAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const sumOfallDPDS = async (req: Request, res: Response) => {


    try {

        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0, 0, 0, 0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else {
            targetDate = new Date(`${Year}-04-01`);
        }

        targetDate.setHours(0, 0, 0, 0)
        if (today.getHours() < 5 || (today.getHours() === 5 && today.getMinutes() <= 30)) {
            today.setHours(today.getHours() + 5);
            today.setMinutes(today.getMinutes() + 30);
        }

        const data = await DPDS.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_m_ds')), 'issue_m_ds'],
                [sequelize.fn('sum', sequelize.col('issue_m_dp')), 'issue_m_dp'],
                [sequelize.fn('sum', sequelize.col('issue_k_dp')), 'issue_k_dp'],

                [sequelize.fn('sum', sequelize.col('issue_ds_1')), 'issue_ds_1'],
                [sequelize.fn('sum', sequelize.col('issue_ds_2')), 'issue_ds_2'],
                [sequelize.fn('sum', sequelize.col('issue_sp_2')), 'issue_sp_2'],
                [sequelize.fn('sum', sequelize.col('issue_yjh')), 'issue_yjh'],
                [sequelize.fn('sum', sequelize.col('issue_kp')), 'issue_kp'],
                [sequelize.fn('sum', sequelize.col('issue_yk')), 'issue_yk'],
                [sequelize.fn('sum', sequelize.col('issue_wp')), 'issue_wp'],
                [sequelize.fn('sum', sequelize.col('issue_rs')), 'issue_rs'],
                [sequelize.fn('sum', sequelize.col('issue_dp_2')), 'issue_dp_2'],
                [sequelize.fn('sum', sequelize.col('issue_dp_3')), 'issue_dp_3'],
                [sequelize.fn('sum', sequelize.col('issue_dp_4')), 'issue_dp_4'],
                [sequelize.fn('sum', sequelize.col('issue_dp_3l')), 'issue_dp_3l'],
                [sequelize.fn('sum', sequelize.col('issue_ss')), 'issue_ss'],
                [sequelize.fn('sum', sequelize.col('issue_os')), 'issue_os'],
                [sequelize.fn('sum', sequelize.col('issue_os1')), 'issue_os1'],
                [sequelize.fn('sum', sequelize.col('issue_add_1')), 'issue_add_1'],
                [sequelize.fn('sum', sequelize.col('issue_add_2')), 'issue_add_2'],
                [sequelize.fn('sum', sequelize.col('issue_add_3')), 'issue_add_3'],
                [sequelize.fn('sum', sequelize.col('issue_add_4')), 'issue_add_4'],
                [sequelize.fn('sum', sequelize.col('issue_add_5')), 'issue_add_5'],
                [sequelize.fn('sum', sequelize.col('issue_add_6')), 'issue_add_6'],
                [sequelize.fn('sum', sequelize.col('issue_add_7')), 'issue_add_7'],
                [sequelize.fn('sum', sequelize.col('issue_add_8')), 'issue_add_8'],
                [sequelize.fn('sum', sequelize.col('issue_add_9')), 'issue_add_9'],
                [sequelize.fn('sum', sequelize.col('issue_add_10')), 'issue_add_10'],
                [sequelize.fn('sum', sequelize.col('issue_V_ds')), 'issue_V_ds'],
                [sequelize.fn('sum', sequelize.col('issue_V_m_ds')), 'issue_V_m_ds'],
                [sequelize.fn('sum', sequelize.col('issue_V_dp')), 'issue_V_dp'],
                [sequelize.fn('sum', sequelize.col('issue_V_m_dp')), 'issue_V_m_dp'],
                [sequelize.fn('sum', sequelize.col('issue_V_lp')), 'issue_V_lp'],
                [sequelize.fn('sum', sequelize.col('issue_V_lp_2')), 'issue_V_lp_2'],
                [sequelize.fn('sum', sequelize.col('issue_V_k_dp')), 'issue_V_k_dp'],
                [sequelize.fn('sum', sequelize.col('issue_V_ss')), 'issue_V_ss'],
                [sequelize.fn('sum', sequelize.col('issue_V_yjh')), 'issue_V_yjh'],
                [sequelize.fn('sum', sequelize.col('issue_V_yk')), 'issue_V_yk'],
                [sequelize.fn('sum', sequelize.col('issue_V_sp_2')), 'issue_V_sp_2'],
                [sequelize.fn('sum', sequelize.col('issue_V_kp')), 'issue_V_kp'],
                [sequelize.fn('sum', sequelize.col('issue_V_dp_2')), 'issue_V_dp_2'],
                [sequelize.fn('sum', sequelize.col('issue_V_dp_3')), 'issue_V_dp_3'],
                [sequelize.fn('sum', sequelize.col('issue_V_dp_4')), 'issue_V_dp_4'],
                [sequelize.fn('sum', sequelize.col('issue_V_os')), 'issue_V_os'],
                [sequelize.fn('sum', sequelize.col('issue_V_os_1')), 'issue_V_os_1'],
                [sequelize.fn('sum', sequelize.col('issue_V_wp')), 'issue_V_wp'],
                [sequelize.fn('sum', sequelize.col('issue_V_rs')), 'issue_V_rs'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_1')), 'issue_ext_grade_1'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_2')), 'issue_ext_grade_2'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_3')), 'issue_ext_grade_3'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_4')), 'issue_ext_grade_4'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_5')), 'issue_ext_grade_5'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_6')), 'issue_ext_grade_6'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_7')), 'issue_ext_grade_7'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_8')), 'issue_ext_grade_8'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_9')), 'issue_ext_grade_9'],
                [sequelize.fn('sum', sequelize.col('issue_ext_grade_10')), 'issue_ext_grade_10'],

                [sequelize.fn('sum', sequelize.col('issue_rejection')), 'issue_rejection'],
                [sequelize.fn('sum', sequelize.col('issue_village')), 'issue_village'],
                [sequelize.fn('sum', sequelize.col('issue_bigTaiho')), 'issue_bigTaiho'],
                [sequelize.fn('sum', sequelize.col('issue_mayur')), 'issue_mayur'],
               
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });

        const Sumdata = await DPDS.findAll({
                    attributes: [
        
                        [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
        
        
                    ],
                    where: {
                        [Op.or]: [
                            { editStatus: "Approved" },
                            { editStatus: "NA" }
                        ], date: {
                            [Op.between]: [targetDate, today]
                        }, latest: 1
                    }
                });
        const EditData = await DPDSEdit.count()
        if (data && Sumdata) {
            return res.status(200).json({ data, EditData,Sumdata });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getDPDSLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await DPDS.findAll({

            attributes: ['LotNo', 'origin', 'current_backlog', 'rcv_dp', 'rcv_ds', 'rcv_dp1','rcv_Sorting'],
            where: {
                Status: status
            }

        });
        if (scoopingLot) {
            res.status(200).json({ message: "Un DPDS Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding DPDS Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //DPDSInitial.tsx
export const getDPDSBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const origin = req.params.origin
        const scoopingLot = await DPDS.findAll({
            where: {
                LotNo: lotNO, origin: origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if (scoopingLot) {
            res.status(200).json({ message: "Un DPDS Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding DPDS Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //DPDSCreateForm.tsx
export const CreateEntireDPDS = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo
        const vilLot:boolean=Boolean(req.body.vilLot)
        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {
                if ((parseFloat(data.issue_add_1)+
                    // parseFloat(data.rcv_dpN) + parseFloat(data.rcv_dsN) + parseFloat(data.rcv_dp1N)
                     + (data.rcv_Sorting ? parseFloat(data.rcv_Sorting) : 0)
                    + (data.rcv_transfer ? parseFloat(data.rcv_transfer) : 0)
                ) < (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                    + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                    parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                    + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                    + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+

                        parseFloat(data.issue_V_ds) +
                        parseFloat(data.issue_V_m_ds) +
                        parseFloat(data.issue_V_dp) +
                        parseFloat(data.issue_V_m_dp) +
                        parseFloat(data.issue_V_lp) +
                        parseFloat(data.issue_V_lp_2) +
                        parseFloat(data.issue_V_k_dp) +
                        parseFloat(data.issue_V_ss) +
                        parseFloat(data.issue_V_yjh) +
                        parseFloat(data.issue_V_yk) +
                        parseFloat(data.issue_V_sp_2) +
                        parseFloat(data.issue_V_kp) +
                        parseFloat(data.issue_V_dp_2) +
                        parseFloat(data.issue_V_dp_3) +
                        parseFloat(data.issue_V_dp_4) +
                        parseFloat(data.issue_V_os) +
                        parseFloat(data.issue_V_os_1) +
                        parseFloat(data.issue_V_wp) +
                        parseFloat(data.issue_V_rs) +
                        parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)

                    + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                    + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                    + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                    )) {
                    console.log(parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                        + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                        parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                        + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                        + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                        + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1) +
                        
                        parseFloat(data.issue_V_ds) +
                        parseFloat(data.issue_V_m_ds) +
                        parseFloat(data.issue_V_dp) +
                        parseFloat(data.issue_V_m_dp) +
                        parseFloat(data.issue_V_lp) +
                        parseFloat(data.issue_V_lp_2) +
                        parseFloat(data.issue_V_k_dp) +
                        parseFloat(data.issue_V_ss) +
                        parseFloat(data.issue_V_yjh) +
                        parseFloat(data.issue_V_yk) +
                        parseFloat(data.issue_V_sp_2) +
                        parseFloat(data.issue_V_kp) +
                        parseFloat(data.issue_V_dp_2) +
                        parseFloat(data.issue_V_dp_3) +
                        parseFloat(data.issue_V_dp_4) +
                        parseFloat(data.issue_V_os) +
                        parseFloat(data.issue_V_os_1) +
                        parseFloat(data.issue_V_wp) +
                        parseFloat(data.issue_V_rs) +
                        parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)


                        + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                        + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                        + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }
                const DPDSUpdate = await DPDS.update(
                    {
                        date: data.Date,
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,

                        issue_m_ds: data.issue_m_ds,
                        issue_m_dp: data.issue_m_dp,
                        issue_k_dp: data.issue_k_dp,
                        issue_ds_1: data.issue_ds_1,
                        issue_ds_2: data.issue_ds_2,
                        issue_sp_2: data.issue_sp_2,
                        issue_yjh: data.issue_yjh,
                        issue_yk: data.issue_yk,
                        issue_kp: data.issue_kp,
                        issue_wp: data.issue_wp,
                        issue_rs: data.issue_rs,
                        issue_dp_2: data.issue_dp_2,
                        issue_dp_3: data.issue_dp_3,
                        issue_dp_4: data.issue_dp_4,
                        issue_dp_3l: data.issue_dp_3l,
                        issue_ss: data.issue_ss,
                        issue_os: data.issue_os,
                        issue_os1: data.issue_os1,

                        issue_V_ds: data.issue_V_ds,
                        issue_V_m_ds: data.issue_V_m_ds,
                        issue_V_dp: data.issue_V_dp,
                        issue_V_m_dp: data.issue_V_m_dp,
                        issue_V_lp: data.issue_V_lp,
                        issue_V_lp_2: data.issue_V_lp_2,
                        issue_V_k_dp: data.issue_V_k_dp,
                        issue_V_ss: data.issue_V_ss,
                        issue_V_yjh: data.issue_V_yjh,
                        issue_V_yk: data.issue_V_yk,
                        issue_V_sp_2: data.issue_V_sp_2,
                        issue_V_kp: data.issue_V_kp,
                        issue_V_dp_2: data.issue_V_dp_2,
                        issue_V_dp_3: data.issue_V_dp_3,
                        issue_V_dp_4: data.issue_V_dp_4,
                        issue_V_os: data.issue_V_os,
                        issue_V_os_1: data.issue_V_os_1,
                        issue_V_wp: data.issue_V_wp,
                        issue_V_rs: data.issue_V_rs,
                        issue_ext_grade_1: data.issue_ext_grade_1,
                        issue_ext_grade_2: data.issue_ext_grade_2,
                        issue_ext_grade_3: data.issue_ext_grade_3,
                        issue_ext_grade_4: data.issue_ext_grade_4,
                        issue_ext_grade_5: data.issue_ext_grade_5,
                        issue_ext_grade_6: data.issue_ext_grade_6,
                        issue_ext_grade_7: data.issue_ext_grade_7,
                        issue_ext_grade_8: data.issue_ext_grade_8,
                        issue_ext_grade_9: data.issue_ext_grade_9,
                        issue_ext_grade_10: data.issue_ext_grade_10,
                

                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3: data.issue_add_3,
                        issue_add_4: data.rcv_dpN,
                        issue_add_5: data.rcv_dsN,
                        issue_add_6: data.rcv_dp1N,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_mayur: data.issue_mayur,
                        entry_backlog: (parseFloat(data.issue_add_1)+
                            //parseFloat(data.rcv_dpN) + parseFloat(data.rcv_dsN) + parseFloat(data.rcv_dp1N)
                            + (data.rcv_Sorting ? parseFloat(data.rcv_Sorting) : 0) + (data.rcv_transfer ? parseFloat(data.rcv_transfer) : 0))
                            - (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                                + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                                parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                                + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                                + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                                + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                                parseFloat(data.issue_V_ds) +
                                parseFloat(data.issue_V_m_ds) +
                                parseFloat(data.issue_V_dp) +
                                parseFloat(data.issue_V_m_dp) +
                                parseFloat(data.issue_V_lp) +
                                parseFloat(data.issue_V_lp_2) +
                                parseFloat(data.issue_V_k_dp) +
                                parseFloat(data.issue_V_ss) +
                                parseFloat(data.issue_V_yjh) +
                                parseFloat(data.issue_V_yk) +
                                parseFloat(data.issue_V_sp_2) +
                                parseFloat(data.issue_V_kp) +
                                parseFloat(data.issue_V_dp_2) +
                                parseFloat(data.issue_V_dp_3) +
                                parseFloat(data.issue_V_dp_4) +
                                parseFloat(data.issue_V_os) +
                                parseFloat(data.issue_V_os_1) +
                                parseFloat(data.issue_V_wp) +
                                parseFloat(data.issue_V_rs) +
                                parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)


                                + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                                + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                                + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                            ),
                        current_backlog: (parseFloat(data.issue_add_1)+
                        //parseFloat(data.rcv_dpN) + parseFloat(data.rcv_dsN) + parseFloat(data.rcv_dp1N)
                            + (data.rcv_Sorting ? parseFloat(data.rcv_Sorting) : 0) + (data.rcv_transfer ? parseFloat(data.rcv_transfer) : 0))
                            - (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                                + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                                parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                                + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                                + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                                + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                                parseFloat(data.issue_V_ds) +
                                parseFloat(data.issue_V_m_ds) +
                                parseFloat(data.issue_V_dp) +
                                parseFloat(data.issue_V_m_dp) +
                                parseFloat(data.issue_V_lp) +
                                parseFloat(data.issue_V_lp_2) +
                                parseFloat(data.issue_V_k_dp) +
                                parseFloat(data.issue_V_ss) +
                                parseFloat(data.issue_V_yjh) +
                                parseFloat(data.issue_V_yk) +
                                parseFloat(data.issue_V_sp_2) +
                                parseFloat(data.issue_V_kp) +
                                parseFloat(data.issue_V_dp_2) +
                                parseFloat(data.issue_V_dp_3) +
                                parseFloat(data.issue_V_dp_4) +
                                parseFloat(data.issue_V_os) +
                                parseFloat(data.issue_V_os_1) +
                                parseFloat(data.issue_V_wp) +
                                parseFloat(data.issue_V_rs) +
                                parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)


                                + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                                + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                                + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                            ),
                        Status: 1,
                        CreatedBy: feeledBy
                    },
                    {
                        where: {
                            id: data.id
                        }, transaction
                    }
                );
                if (DPDSUpdate) {

                    // Mayur Out//
                    const mayur_backlog = await Mayur.findOne({
                        attributes: ['current_backlog', 'rcv_DPDS'],
                        where: {
                            lotNo: LotNO,
                            origin: data.origin,
                            latest: 1

                        },
                        order: [['LotNo', 'ASC']]

                    });
                    console.log(mayur_backlog)
                    if (mayur_backlog && mayur_backlog.dataValues.current_backlog >= 0) {
                        await sectionTransfer.create({
                            LotNo: LotNO,
                            origin: data.origin,
                            amount: data.issue_mayur,
                            issueid: 1,
                            date: data.Date,
                            fromSection: 'DPDS',
                            toSection: 'Mayur',
                            toSectionBeforeBacklog: mayur_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(mayur_backlog.dataValues.current_backlog) + parseFloat(data.issue_mayur),
                            createdBy: feeledBy
                        }, { transaction });
                        if (mayur_backlog.dataValues.rcv_DPDS) {
                            await Mayur.update(
                                {
                                    rcv_DPDS: sequelize.literal(`rcv_DPDS+ ${data.issue_mayur}`),
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                                },
                                {
                                    where: {
                                        lotNo: LotNO,
                                        origin: data.origin,
                                        latest: 1
                                    }, transaction
                                }
                            );
                        }
                        else {
                            await Mayur.update(
                                {
                                    rcv_DPDS: data.issue_mayur,
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                                },
                                {
                                    where: {
                                        lotNo: LotNO,
                                        origin: data.origin,
                                        latest: 1
                                    }, transaction
                                }
                            );
                        }



                    }
                    else {
                        res.status(500).json({ message: "Error In Creating Transaction History" });
                        throw new Error('Transaction Aborted')
                    }


                    // Rejection Out//

                const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_dpds'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(rejection_backlog)
                if (rejection_backlog && rejection_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_rejection,
                        issueid:1,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_dpds){
                        await rejectionModel.update(
                            { 
                                rcv_dpds:sequelize.literal(`rcv_dpds+ ${data.issue_rejection}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     else{
                        await rejectionModel.update(
                            { 
                                rcv_dpds:data.issue_rejection,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     

                    
                }
                else{
                    res.status(500).json({ message: "Error In Creating Rejection Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                    // BigTaiho Out//

                    const bigT_backlog = await bigTaihoModel.findOne({
                        attributes: ['current_backlog', 'rcv_dpds'],
                        where: {
                            lotNo: LotNO,
                            origin: data.origin,
                            latest: 1

                        },
                        order: [['LotNo', 'ASC']]

                    });
                    console.log(bigT_backlog)
                    if (bigT_backlog && bigT_backlog.dataValues.current_backlog >= 0) {
                        await sectionTransfer.create({
                            LotNo: LotNO,
                            origin: data.origin,
                            amount: data.issue_bigTaiho,
                            issueid: 1,
                            date: data.Date,
                            fromSection: 'DPDS',
                            toSection: 'BigTaiho',
                            toSectionBeforeBacklog: bigT_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(bigT_backlog.dataValues.current_backlog) + parseFloat(data.issue_bigTaiho),
                            createdBy: feeledBy
                        }, { transaction });
                        if (bigT_backlog.dataValues.rcv_dpds) {
                            await bigTaihoModel.update(
                                {
                                    rcv_dpds: sequelize.literal(`rcv_dpds+ ${data.issue_bigTaiho}`),
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                                },
                                {
                                    where: {
                                        lotNo: LotNO,
                                        origin: data.origin,
                                        latest: 1
                                    }, transaction
                                }
                            );
                        }
                        else {
                            await bigTaihoModel.update(
                                {
                                    rcv_dpds: data.issue_bigTaiho,
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                                },
                                {
                                    where: {
                                        lotNo: LotNO,
                                        origin: data.origin,
                                        latest: 1
                                    }, transaction
                                }
                            );
                        }



                    }
                    else {
                        res.status(500).json({ message: "Error In Creating Transaction History" });
                        throw new Error('Transaction Aborted')
                    }

                    //4. Village Out//

                const vil_backlog = await villageProduction.findOne({
                    attributes: ['current_backlog','rcv_dpds'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(vil_backlog)
                if (vil_backlog && vil_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_village,
                        issueid:1,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'Village',
                        toSectionBeforeBacklog:vil_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(vil_backlog.dataValues.current_backlog)+parseFloat(data.issue_village),
                        createdBy: feeledBy
                     },{transaction});
                     if(vil_backlog.dataValues.rcv_dpds){
                        await villageProduction.update(
                            { 
                                rcv_dpds:sequelize.literal(`rcv_dpds+ ${data.issue_village}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     else{
                        await villageProduction.update(
                            { 
                                rcv_dpds:data.issue_village,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     

                    
                }
                else{
                    res.status(500).json({ message: "Error In Creating Village Transaction History" });
                    throw new Error('Transaction Aborted')
                }

                let lotupdate
                //Lot Update
                if(vilLot===true){
                    lotupdate =await VLotNo.update(
                        { 
                          modifiedBy:'Next Interconnected'
                        },
                        {
                            where: {
                                vlotNo:LotNO
                            },transaction
                        }
                    );
                }
                else{
                    lotupdate =await LotNo.update(
                        { 
                          modifiedBy:'Next Interconnected'
                        },
                        {
                            where: {
                                lotNo:LotNO
                            },transaction
                        }
                    );
                }
                    const lotoriginupdate = await lotoriginmodel.update(
                        {
                            latest_section: 'DPDS',
                            dPDSStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                    );
                    if (lotupdate && lotoriginupdate) {
                        res.status(200).json({ message: "DPDS Entry Made Successfully" });
                    }
                    else {
                        console.log('No Need For Update')
                    }
                }


            }

        })
    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating DPDS Entry", error });
        }
    }
}

// //DPDSTable.tsx
export const SearchRCNDPDS = async (req: Request, res: Response) => {
    try {
        const { searchitem, fromDate, toDate, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                LotNo: {
                    [Op.like]: `%${searchitem}%`
                }
            });
        }
        if (fromDate && toDate) {
            whereClause.push({
                date: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }
        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }
        whereClause.push({
            Status: {
                [Op.eq]: 1
            }
        });

        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if (limit === 0 && offset === 0) {
            rcnEntries = await DPDS.findAll({
                where,
                order: [['LotNo', 'DESC'], ['origin', 'ASC'], ['altid', 'ASC']], // Order by date descending

            });
        }
        else {
            rcnEntries = await DPDS.findAll({
                where,
                order: [['LotNo', 'DESC'], ['origin', 'ASC'], ['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }

        return res.status(200).json({ message: 'DPDS Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }

}
// //DPDSRecreate.tsx
export const CreateReissueDPDS = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {

                //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
                if (parseFloat(data.issue_add_1) < (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                    + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                    parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                    + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                    + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                    + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                    parseFloat(data.issue_V_ds) +
                    parseFloat(data.issue_V_m_ds) +
                    parseFloat(data.issue_V_dp) +
                    parseFloat(data.issue_V_m_dp) +
                    parseFloat(data.issue_V_lp) +
                    parseFloat(data.issue_V_lp_2) +
                    parseFloat(data.issue_V_k_dp) +
                    parseFloat(data.issue_V_ss) +
                    parseFloat(data.issue_V_yjh) +
                    parseFloat(data.issue_V_yk) +
                    parseFloat(data.issue_V_sp_2) +
                    parseFloat(data.issue_V_kp) +
                    parseFloat(data.issue_V_dp_2) +
                    parseFloat(data.issue_V_dp_3) +
                    parseFloat(data.issue_V_dp_4) +
                    parseFloat(data.issue_V_os) +
                    parseFloat(data.issue_V_os_1) +
                    parseFloat(data.issue_V_wp) +
                    parseFloat(data.issue_V_rs) +
                    parseFloat(data.issue_ext_grade_1) +
                    parseFloat(data.issue_ext_grade_2) +
                    parseFloat(data.issue_ext_grade_3) +
                    parseFloat(data.issue_ext_grade_4) +
                    parseFloat(data.issue_ext_grade_5) +
                    parseFloat(data.issue_ext_grade_6) +
                    parseFloat(data.issue_ext_grade_7) +
                    parseFloat(data.issue_ext_grade_8) +
                    parseFloat(data.issue_ext_grade_9) +
                    parseFloat(data.issue_ext_grade_10)
                
                    + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                    + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                    + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                )) {
                    console.log(parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                        + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                        parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                        + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                        + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                        + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                        parseFloat(data.issue_V_ds) +
                        parseFloat(data.issue_V_m_ds) +
                        parseFloat(data.issue_V_dp) +
                        parseFloat(data.issue_V_m_dp) +
                        parseFloat(data.issue_V_lp) +
                        parseFloat(data.issue_V_lp_2) +
                        parseFloat(data.issue_V_k_dp) +
                        parseFloat(data.issue_V_ss) +
                        parseFloat(data.issue_V_yjh) +
                        parseFloat(data.issue_V_yk) +
                        parseFloat(data.issue_V_sp_2) +
                        parseFloat(data.issue_V_kp) +
                        parseFloat(data.issue_V_dp_2) +
                        parseFloat(data.issue_V_dp_3) +
                        parseFloat(data.issue_V_dp_4) +
                        parseFloat(data.issue_V_os) +
                        parseFloat(data.issue_V_os_1) +
                        parseFloat(data.issue_V_wp) +
                        parseFloat(data.issue_V_rs) +
                        parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)
                       
                        + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                        + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                        + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }

                const dpdsupdate = await DPDS.update(
                    {
                        latest: 0

                    }, {
                    where: {
                        id: data.id
                    }, transaction
                }


                );
                if (dpdsupdate) {
                    const reissuecreate = await DPDS.create(
                        {
                            date: data.Date,
                            altid: parseInt(data.alt_id) + 1,
                            LotNo: data.LotNo,
                            origin: data.origin,
                            mixingLot: data.mixingLot,
                            rcv_dp: data.rcv_dp,
                            rcv_ds: data.rcv_ds,
                            rcv_dp1: data.rcv_dp1,
                            rcv_Sorting: data.rcv_SortingN,

                            noOfdayOperators: data.dayoperator,
                            noOfnightOperators: data.nightoperator,
                            rcv_transfer: data.rcv_transferN,
                            issue_m_ds: data.issue_m_ds,
                            issue_m_dp: data.issue_m_dp,
                            issue_k_dp: data.issue_k_dp,
                            issue_ds_1: data.issue_ds_1,
                            issue_ds_2: data.issue_ds_2,
                            issue_sp_2: data.issue_sp_2,
                            issue_yjh: data.issue_yjh,
                            issue_yk: data.issue_yk,
                            issue_kp: data.issue_kp,
                            issue_wp: data.issue_wp,
                            issue_rs: data.issue_rs,
                            issue_dp_2: data.issue_dp_2,
                            issue_dp_3: data.issue_dp_3,
                            issue_dp_4: data.issue_dp_4,
                            issue_dp_3l: data.issue_dp_3l,
                            issue_ss: data.issue_ss,
                            issue_os: data.issue_os,
                            issue_os1: data.issue_os1,
                            
                            issue_V_ds: data.issue_V_ds,
                            issue_V_m_ds: data.issue_V_m_ds,
                            issue_V_dp: data.issue_V_dp,
                            issue_V_m_dp: data.issue_V_m_dp,
                            issue_V_lp: data.issue_V_lp,
                            issue_V_lp_2: data.issue_V_lp_2,
                            issue_V_k_dp: data.issue_V_k_dp,
                            issue_V_ss: data.issue_V_ss,
                            issue_V_yjh: data.issue_V_yjh,
                            issue_V_yk: data.issue_V_yk,
                            issue_V_sp_2: data.issue_V_sp_2,
                            issue_V_kp: data.issue_V_kp,
                            issue_V_dp_2: data.issue_V_dp_2,
                            issue_V_dp_3: data.issue_V_dp_3,
                            issue_V_dp_4: data.issue_V_dp_4,
                            issue_V_os: data.issue_V_os,
                            issue_V_os_1: data.issue_V_os_1,
                            issue_V_wp: data.issue_V_wp,
                            issue_V_rs: data.issue_V_rs,
                            issue_ext_grade_1: data.issue_ext_grade_1,
                            issue_ext_grade_2: data.issue_ext_grade_2,
                            issue_ext_grade_3: data.issue_ext_grade_3,
                            issue_ext_grade_4: data.issue_ext_grade_4,
                            issue_ext_grade_5: data.issue_ext_grade_5,
                            issue_ext_grade_6: data.issue_ext_grade_6,
                            issue_ext_grade_7: data.issue_ext_grade_7,
                            issue_ext_grade_8: data.issue_ext_grade_8,
                            issue_ext_grade_9: data.issue_ext_grade_9,
                            issue_ext_grade_10: data.issue_ext_grade_10,

                            issue_add_1: data.issue_add_1,
                            issue_add_2: data.issue_add_2,
                            issue_add_3: data.issue_add_3,
                            issue_add_4: data.issue_add_4,
                            issue_add_5: data.issue_add_5,
                            issue_add_6: data.issue_add_6,
                            issue_add_7: data.issue_add_7,
                            issue_add_8: data.issue_add_8,
                            issue_add_9: data.issue_add_9,
                            issue_add_10: data.issue_add_10,
                            issue_rejection: data.issue_rejection,
                            issue_village: data.issue_village,
                            issue_bigTaiho: data.issue_bigTaiho,
                            issue_mayur: data.issue_mayur,

                            entry_backlog: parseFloat(data.issue_add_1) - (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                                + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                                parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                                + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                                + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                                + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                                parseFloat(data.issue_V_ds) +
                                parseFloat(data.issue_V_m_ds) +
                                parseFloat(data.issue_V_dp) +
                                parseFloat(data.issue_V_m_dp) +
                                parseFloat(data.issue_V_lp) +
                                parseFloat(data.issue_V_lp_2) +
                                parseFloat(data.issue_V_k_dp) +
                                parseFloat(data.issue_V_ss) +
                                parseFloat(data.issue_V_yjh) +
                                parseFloat(data.issue_V_yk) +
                                parseFloat(data.issue_V_sp_2) +
                                parseFloat(data.issue_V_kp) +
                                parseFloat(data.issue_V_dp_2) +
                                parseFloat(data.issue_V_dp_3) +
                                parseFloat(data.issue_V_dp_4) +
                                parseFloat(data.issue_V_os) +
                                parseFloat(data.issue_V_os_1) +
                                parseFloat(data.issue_V_wp) +
                                parseFloat(data.issue_V_rs) +
                                parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)
                               
                                + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                                + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                                + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                            ),
                            current_backlog: parseFloat(data.issue_add_1) - (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                                + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                                parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                                + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                                + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                                + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                                parseFloat(data.issue_V_ds) +
                                parseFloat(data.issue_V_m_ds) +
                                parseFloat(data.issue_V_dp) +
                                parseFloat(data.issue_V_m_dp) +
                                parseFloat(data.issue_V_lp) +
                                parseFloat(data.issue_V_lp_2) +
                                parseFloat(data.issue_V_k_dp) +
                                parseFloat(data.issue_V_ss) +
                                parseFloat(data.issue_V_yjh) +
                                parseFloat(data.issue_V_yk) +
                                parseFloat(data.issue_V_sp_2) +
                                parseFloat(data.issue_V_kp) +
                                parseFloat(data.issue_V_dp_2) +
                                parseFloat(data.issue_V_dp_3) +
                                parseFloat(data.issue_V_dp_4) +
                                parseFloat(data.issue_V_os) +
                                parseFloat(data.issue_V_os_1) +
                                parseFloat(data.issue_V_wp) +
                                parseFloat(data.issue_V_rs) +
                                parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)
                              
                                + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                                + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                                + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                            ),
                            Status: 1,
                            CreatedBy: feeledBy
                        },
                        {
                            transaction
                        }
                    );
                    if (reissuecreate) {

                          //Mayur Out//
                        const mayur_backlog = await Mayur.findOne({
                            attributes: ['current_backlog', 'rcv_DPDS'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(mayur_backlog)
                        if (mayur_backlog && mayur_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_mayur,
                                date: data.Date,
                                fromSection: 'DPDS',
                                toSection: 'Mayur',
                                toSectionBeforeBacklog: mayur_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(mayur_backlog.dataValues.current_backlog) + parseFloat(data.issue_mayur),
                                createdBy: feeledBy,
                                issueid: parseInt(data.alt_id) + 1,
                            }, { transaction });
                            if (mayur_backlog.dataValues.rcv_DPDS) {
                                await Mayur.update(
                                    {
                                        rcv_DPDS: sequelize.literal(`rcv_DPDS+ ${data.issue_mayur}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }
                            else {
                                await Mayur.update(
                                    {
                                        rcv_DPDS: data.issue_mayur,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_mayur}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }


                        }
                        else {
                            res.status(500).json({ message: "Error In Creating Reissue Mayur Transaction History" });
                            throw new Error('Transaction Aborted')
                        }


                        // Rejection Out//

                        const rejection_backlog = await rejectionModel.findOne({
                            attributes: ['current_backlog','rcv_dpds'],
                            where: {
                                lotNo:LotNO,
                                origin: data.origin,
                                latest:1
                    
                            },
                            order: [['LotNo', 'ASC']]
                    
                        });
                        console.log(rejection_backlog)
                        if (rejection_backlog && rejection_backlog.dataValues.current_backlog>=0){
                            await sectionTransfer.create({              
                                LotNo:LotNO,
                                origin:data.origin,
                                amount:data.issue_rejection,
                                issueid:parseInt(data.alt_id)+1,
                                date:data.Date,
                                fromSection:'DPDS',
                                toSection:'Rejection',
                                toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                                createdBy: feeledBy
                             },{transaction});
                             if(rejection_backlog.dataValues.rcv_dpds){
                                await rejectionModel.update(
                                    { 
                                        rcv_dpds:sequelize.literal(`rcv_dpds+ ${data.issue_rejection}`),
                                        current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
                                    },
                                    {
                                        where: {
                                            lotNo:LotNO,
                                            origin: data.origin,
                                            latest:1
                                        },transaction
                                    }
                                );
                             }
                             else{
                                await rejectionModel.update(
                                    { 
                                        rcv_dpds:data.issue_rejection,
                                        current_backlog:sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
                                    },
                                    {
                                        where: {
                                            lotNo:LotNO,
                                            origin: data.origin,
                                            latest:1
                                        },transaction
                                    }
                                );
                             }
                             
        
                            
                        }
                        else{
                            res.status(500).json({ message: "Error In Creating Rejection re-Issue Transaction History" });
                            throw new Error('Transaction Aborted')
                        } 

                        //BigTaiho Out//

                        const bigT_backlog = await bigTaihoModel.findOne({
                            attributes: ['current_backlog', 'rcv_dpds'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(bigT_backlog)
                        if (bigT_backlog && bigT_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_bigTaiho,
                                date: data.Date,
                                fromSection: 'DPDS',
                                toSection: 'BigTaiho',
                                toSectionBeforeBacklog: bigT_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(bigT_backlog.dataValues.current_backlog) + parseFloat(data.issue_bigTaiho),
                                createdBy: feeledBy,
                                issueid: parseInt(data.alt_id) + 1,
                            }, { transaction });
                            if (bigT_backlog.dataValues.rcv_dpds) {
                                await bigTaihoModel.update(
                                    {
                                        rcv_DPDS: sequelize.literal(`rcv_dpds+ ${data.issue_bigTaiho}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }
                            else {
                                await bigTaihoModel.update(
                                    {
                                        rcv_dpds: data.issue_bigTaiho,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNO,
                                            origin: data.origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );
                            }


                        }
                        else {
                            res.status(500).json({ message: "Error In Creating Reissue BigTaiho Transaction History" });
                            throw new Error('Transaction Aborted')
                        }

                        //4. Village Re-Issue//

                const vil_backlog = await villageProduction.findOne({
                    attributes: ['current_backlog','rcv_dpds'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(vil_backlog)
                if (vil_backlog && vil_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_village,
                        issueid:parseInt(data.alt_id)+1,
                        date:data.Date,
                        fromSection:'DPDS',
                        toSection:'Village',
                        toSectionBeforeBacklog:vil_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(vil_backlog.dataValues.current_backlog)+parseFloat(data.issue_village),
                        createdBy: feeledBy
                     },{transaction});
                     if(vil_backlog.dataValues.rcv_dpds){
                        await villageProduction.update(
                            { 
                                rcv_dpds:sequelize.literal(`rcv_dpds+ ${data.issue_village}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     else{
                        await villageProduction.update(
                            { 
                                rcv_dpds:data.issue_village,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_village}`)
                            },
                            {
                                where: {
                                    lotNo:LotNO,
                                    origin: data.origin,
                                    latest:1
                                },transaction
                            }
                        );
                     }
                     

                    
                }
                else{
                    res.status(500).json({ message: "Error In Creating Village Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                        const lotupdate = await lotoriginmodel.update(
                            {
                                latest_section: 'DPDS',
                                dPDSStatus: 1
                            },
                            {
                                where: {
                                    lotNo: LotNO,
                                    origin: data.origin
                                }, transaction
                            }
                        );
                        if (lotupdate) {
                            res.status(200).json({ message: "DPDS Re-Issue Entry Made Successfully" });
                        }
                        else {
                            console.log('No Need For Update')
                        }
                    }
                    else {
                        return res.status(500).json({ message: "Error while creating DPDS Re Issue Entry" });
                    }
                }


            }




        })
    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating DPDS Re-Issue Entry", error });
        }
    }



}

export const updateEntireDPDS = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo



        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {


                if ((
                    parseFloat(data.rcv_dpN) + parseFloat(data.rcv_dsN) + parseFloat(data.rcv_dp1N) 
                    + (data.rcv_Sorting ? parseFloat(data.rcv_Sorting) : 0)
                    + (data.rcv_transfer ? parseFloat(data.rcv_transfer) : 0)) < (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                        + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                        parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                        + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                        + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                        + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                        parseFloat(data.issue_V_ds) +
                        parseFloat(data.issue_V_m_ds) +
                        parseFloat(data.issue_V_dp) +
                        parseFloat(data.issue_V_m_dp) +
                        parseFloat(data.issue_V_lp) +
                        parseFloat(data.issue_V_lp_2) +
                        parseFloat(data.issue_V_k_dp) +
                        parseFloat(data.issue_V_ss) +
                        parseFloat(data.issue_V_yjh) +
                        parseFloat(data.issue_V_yk) +
                        parseFloat(data.issue_V_sp_2) +
                        parseFloat(data.issue_V_kp) +
                        parseFloat(data.issue_V_dp_2) +
                        parseFloat(data.issue_V_dp_3) +
                        parseFloat(data.issue_V_dp_4) +
                        parseFloat(data.issue_V_os) +
                        parseFloat(data.issue_V_os_1) +
                        parseFloat(data.issue_V_wp) +
                        parseFloat(data.issue_V_rs) +
                        parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)

                        + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                        + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                        + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                    )) {
                    console.log(parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                        + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                        parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                        + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                        + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                        + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                        parseFloat(data.issue_V_ds) +
                        parseFloat(data.issue_V_m_ds) +
                        parseFloat(data.issue_V_dp) +
                        parseFloat(data.issue_V_m_dp) +
                        parseFloat(data.issue_V_lp) +
                        parseFloat(data.issue_V_lp_2) +
                        parseFloat(data.issue_V_k_dp) +
                        parseFloat(data.issue_V_ss) +
                        parseFloat(data.issue_V_yjh) +
                        parseFloat(data.issue_V_yk) +
                        parseFloat(data.issue_V_sp_2) +
                        parseFloat(data.issue_V_kp) +
                        parseFloat(data.issue_V_dp_2) +
                        parseFloat(data.issue_V_dp_3) +
                        parseFloat(data.issue_V_dp_4) +
                        parseFloat(data.issue_V_os) +
                        parseFloat(data.issue_V_os_1) +
                        parseFloat(data.issue_V_wp) +
                        parseFloat(data.issue_V_rs) +
                        parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)
                        + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                        + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                        + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }


                await DPDSEdit.create(
                    {
                        id: data.id,
                        date: data.Date,
                        LotNo: LotNO,
                        origin: data.origin,
                        altid: data.alt_id,
                        mixingLot: data.mixingLot,
                        rcv_dp: data.rcv_dp,
                        rcv_ds: data.rcv_ds,
                        rcv_dp1: data.rcv_ds,
                        rcv_Sorting: data.rcv_Sorting,
                        rcv_transfer: data.rcv_transfer,
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                        issue_m_ds: data.issue_m_ds,
                        issue_m_dp: data.issue_m_dp,
                        issue_k_dp: data.issue_k_dp,
                        issue_ds_1: data.issue_ds_1,
                        issue_ds_2: data.issue_ds_2,
                        issue_sp_2: data.issue_sp_2,
                        issue_yjh: data.issue_yjh,
                        issue_yk: data.issue_yk,
                        issue_kp: data.issue_kp,
                        issue_wp: data.issue_wp,
                        issue_rs: data.issue_rs,
                        issue_dp_2: data.issue_dp_2,
                        issue_dp_3: data.issue_dp_3,
                        issue_dp_4: data.issue_dp_4,
                        issue_dp_3l: data.issue_dp_3l,
                        issue_ss: data.issue_ss,
                        issue_os: data.issue_os,
                        issue_os1: data.issue_os1,

                        issue_V_ds: data.issue_V_ds,
                        issue_V_m_ds: data.issue_V_m_ds,
                        issue_V_dp: data.issue_V_dp,
                        issue_V_m_dp: data.issue_V_m_dp,
                        issue_V_lp: data.issue_V_lp,
                        issue_V_lp_2: data.issue_V_lp_2,
                        issue_V_k_dp: data.issue_V_k_dp,
                        issue_V_ss: data.issue_V_ss,
                        issue_V_yjh: data.issue_V_yjh,
                        issue_V_yk: data.issue_V_yk,
                        issue_V_sp_2: data.issue_V_sp_2,
                        issue_V_kp: data.issue_V_kp,
                        issue_V_dp_2: data.issue_V_dp_2,
                        issue_V_dp_3: data.issue_V_dp_3,
                        issue_V_dp_4: data.issue_V_dp_4,
                        issue_V_os: data.issue_V_os,
                        issue_V_os_1: data.issue_V_os_1,
                        issue_V_wp: data.issue_V_wp,
                        issue_V_rs: data.issue_V_rs,
                        issue_ext_grade_1: data.issue_ext_grade_1,
                        issue_ext_grade_2: data.issue_ext_grade_2,
                        issue_ext_grade_3: data.issue_ext_grade_3,
                        issue_ext_grade_4: data.issue_ext_grade_4,
                        issue_ext_grade_5: data.issue_ext_grade_5,
                        issue_ext_grade_6: data.issue_ext_grade_6,
                        issue_ext_grade_7: data.issue_ext_grade_7,
                        issue_ext_grade_8: data.issue_ext_grade_8,
                        issue_ext_grade_9: data.issue_ext_grade_9,
                        issue_ext_grade_10: data.issue_ext_grade_10,

                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3: data.issue_add_3,
                        issue_add_4: data.rcv_dpN,
                        issue_add_5: data.rcv_dsN,
                        issue_add_6: data.rcv_dp1N,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_mayur: data.issue_mayur,
                        entry_backlog: (parseFloat(data.rcv_dpN) + parseFloat(data.rcv_dsN) + parseFloat(data.rcv_dp1N)
                            + (data.rcv_Sorting ? parseFloat(data.rcv_Sorting) : 0) + (data.rcv_transfer ? parseFloat(data.rcv_transfer) : 0))
                            - (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                                + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                                parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                                + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                                + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                                + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                                parseFloat(data.issue_V_ds) +
                                parseFloat(data.issue_V_m_ds) +
                                parseFloat(data.issue_V_dp) +
                                parseFloat(data.issue_V_m_dp) +
                                parseFloat(data.issue_V_lp) +
                                parseFloat(data.issue_V_lp_2) +
                                parseFloat(data.issue_V_k_dp) +
                                parseFloat(data.issue_V_ss) +
                                parseFloat(data.issue_V_yjh) +
                                parseFloat(data.issue_V_yk) +
                                parseFloat(data.issue_V_sp_2) +
                                parseFloat(data.issue_V_kp) +
                                parseFloat(data.issue_V_dp_2) +
                                parseFloat(data.issue_V_dp_3) +
                                parseFloat(data.issue_V_dp_4) +
                                parseFloat(data.issue_V_os) +
                                parseFloat(data.issue_V_os_1) +
                                parseFloat(data.issue_V_wp) +
                                parseFloat(data.issue_V_rs) +
                                parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)
                            
                                + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                                + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                                + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)
                            ),
                        current_backlog: (parseFloat(data.rcv_dpN) + parseFloat(data.rcv_dsN) + parseFloat(data.rcv_dp1N)
                            + (data.rcv_Sorting ? parseFloat(data.rcv_Sorting) : 0) + (data.rcv_transfer ? parseFloat(data.rcv_transfer) : 0))
                            - (parseFloat(data.issue_m_ds) + parseFloat(data.issue_m_dp) + parseFloat(data.issue_k_dp)
                                + parseFloat(data.issue_ds_1) + parseFloat(data.issue_ds_2) + parseFloat(data.issue_sp_2) +
                                parseFloat(data.issue_yjh) + parseFloat(data.issue_yk) + parseFloat(data.issue_kp)
                                + parseFloat(data.issue_wp) + parseFloat(data.issue_rs) + parseFloat(data.issue_dp_2)
                                + parseFloat(data.issue_dp_3) + parseFloat(data.issue_dp_4) + parseFloat(data.issue_dp_3l)
                                + parseFloat(data.issue_ss) + parseFloat(data.issue_os) + parseFloat(data.issue_os1)+
                                parseFloat(data.issue_V_ds) +
                                parseFloat(data.issue_V_m_ds) +
                                parseFloat(data.issue_V_dp) +
                                parseFloat(data.issue_V_m_dp) +
                                parseFloat(data.issue_V_lp) +
                                parseFloat(data.issue_V_lp_2) +
                                parseFloat(data.issue_V_k_dp) +
                                parseFloat(data.issue_V_ss) +
                                parseFloat(data.issue_V_yjh) +
                                parseFloat(data.issue_V_yk) +
                                parseFloat(data.issue_V_sp_2) +
                                parseFloat(data.issue_V_kp) +
                                parseFloat(data.issue_V_dp_2) +
                                parseFloat(data.issue_V_dp_3) +
                                parseFloat(data.issue_V_dp_4) +
                                parseFloat(data.issue_V_os) +
                                parseFloat(data.issue_V_os_1) +
                                parseFloat(data.issue_V_wp) +
                                parseFloat(data.issue_V_rs) +
                                parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)
                             
                                + parseFloat(data.issue_add_7) + parseFloat(data.issue_add_8) + parseFloat(data.issue_add_9)
                                + parseFloat(data.issue_add_10) + parseFloat(data.issue_rejection) + parseFloat(data.issue_village)
                                + parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_mayur)

                            ),
                        Status: 1,
                        CreatedBy: feeledBy,
                        editStatus: 'Pending'
                    },
                    {
                        transaction
                    }
                );

                await lotoriginmodel.update(
                    {
                        editStatus: 'Pending',

                    },
                    {
                        where: {
                            lotNo: LotNO,
                            origin: data.origin
                        }, transaction
                    }
                );
                const lotupdate = await DPDS.update({
                    editStatus: 'Pending'
                },
                    {
                        where: {
                            id: data.id
                        }, transaction
                    });


                if (lotupdate) {

                    const data = await WhatsappMsg("DPDS", feeledBy, "modify_request", "Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of DPDS Entry Raised successfully" });

                }
                else {
                    console.log('No Need For Update')
                }

            }





        })
    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while Editing DPDS Entry", error });
        }
    }



}

export const approveDPDS = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await DPDSEdit.findOne({
            where: {
                id
            }
        }) as any;

        if (!data) {
            return res.status(400).json({ message: "DPDS Edit Entry not found" });
        }
        else {
            const transferMayurdata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'DPDS',
                    toSection: 'Mayur'
                }
            }) as any

            const transferBigTaihodata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'DPDS',
                    toSection: 'BigTaiho'
                }
            }) as any

            const transferRejectiondata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'DPDS',
                    toSection: 'Rejection'
                }
            }) as any

            const transferVildata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'DPDS',
                    toSection:'Village'
                }
            }) as any

            if (transferMayurdata && transferBigTaihodata && transferRejectiondata && transferVildata) {
                await sequelize.transaction(async (transaction: any) => {

                    const bormaEdit = await DPDS.update({
                        date: data.date,

                        noOfdayOperators: data.noOfdayOperators,
                        noOfnightOperators: data.noOfnightOperators,

                        issue_m_ds: data.issue_m_ds,
                        issue_m_dp: data.issue_m_dp,
                        issue_k_dp: data.issue_k_dp,
                        issue_ds_1: data.issue_ds_1,
                        issue_ds_2: data.issue_ds_2,
                        issue_sp_2: data.issue_sp_2,
                        issue_yjh: data.issue_yjh,
                        issue_yk: data.issue_yk,
                        issue_kp: data.issue_kp,
                        issue_wp: data.issue_wp,
                        issue_rs: data.issue_rs,
                        issue_dp_2: data.issue_dp_2,
                        issue_dp_3: data.issue_dp_3,
                        issue_dp_4: data.issue_dp_4,
                        issue_dp_3l: data.issue_dp_3l,
                        issue_ss: data.issue_ss,
                        issue_os: data.issue_os,
                        issue_os1: data.issue_os1,

                        issue_V_ds: data.issue_V_ds,
                        issue_V_m_ds: data.issue_V_m_ds,
                        issue_V_dp: data.issue_V_dp,
                        issue_V_m_dp: data.issue_V_m_dp,
                        issue_V_lp: data.issue_V_lp,
                        issue_V_lp_2: data.issue_V_lp_2,
                        issue_V_k_dp: data.issue_V_k_dp,
                        issue_V_ss: data.issue_V_ss,
                        issue_V_yjh: data.issue_V_yjh,
                        issue_V_yk: data.issue_V_yk,
                        issue_V_sp_2: data.issue_V_sp_2,
                        issue_V_kp: data.issue_V_kp,
                        issue_V_dp_2: data.issue_V_dp_2,
                        issue_V_dp_3: data.issue_V_dp_3,
                        issue_V_dp_4: data.issue_V_dp_4,
                        issue_V_os: data.issue_V_os,
                        issue_V_os_1: data.issue_V_os_1,
                        issue_V_wp: data.issue_V_wp,
                        issue_V_rs: data.issue_V_rs,
                        issue_ext_grade_1: data.issue_ext_grade_1,
                        issue_ext_grade_2: data.issue_ext_grade_2,
                        issue_ext_grade_3: data.issue_ext_grade_3,
                        issue_ext_grade_4: data.issue_ext_grade_4,
                        issue_ext_grade_5: data.issue_ext_grade_5,
                        issue_ext_grade_6: data.issue_ext_grade_6,
                        issue_ext_grade_7: data.issue_ext_grade_7,
                        issue_ext_grade_8: data.issue_ext_grade_8,
                        issue_ext_grade_9: data.issue_ext_grade_9,
                        issue_ext_grade_10: data.issue_ext_grade_10,

                        
                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3: data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        issue_rejection: data.issue_rejection,
                        issue_village: data.issue_village,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_mayur: data.issue_mayur,

                        entry_backlog: data.entry_backlog,
                        current_backlog: data.current_backlog,
                        CreatedBy: data.CreatedBy,
                        editStatus: "Approved",
                        modifiedBy: approvedBy,



                    }, {
                        where: {
                            id
                        }, transaction
                    });
                    if (bormaEdit) {
                        console.log(transferMayurdata)
                        console.log(transferBigTaihodata)
                        console.log(transferRejectiondata)
                        if (parseFloat(transferMayurdata.amount) !== parseFloat(data.issue_mayur)) {
                            console.log('Needs Update In Mayur')
                            const difference_mayur = parseFloat(data.issue_mayur) - parseFloat(transferMayurdata.amount)
                            console.log(difference_mayur)
                            const backlog = await Mayur.findOne({
                                attributes: ['current_backlog', 'rcv_DPDS'],
                                where: {
                                    lotNo: LotNo,
                                    origin: origin,
                                    latest: 1

                                },
                                order: [['LotNo', 'ASC']]

                            });
                            if (backlog && backlog.dataValues.current_backlog >= 0) {
                                await Mayur.update(
                                    {
                                        rcv_DPDS: sequelize.literal(`rcv_DPDS+ ${difference_mayur}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_mayur}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNo,
                                            origin: origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );

                                await sectionTransfer.update({
                                    date: data.Date,
                                    amount: data.issue_mayur,
                                    toSectionBeforeBacklog: transferMayurdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog: parseFloat(transferMayurdata.toSectionBeforeBacklog) + parseFloat(data.issue_mayur)

                                }, {
                                    where: {
                                        id: transferMayurdata.id
                                    }, transaction
                                });
                            }
                            else {
                                res.status(500).json({ message: "Associated Mayur Entry Not Found" });
                                throw new Error('Transaction Aborted due to Improper Value')
                            }
                        }

                        if (parseFloat(transferBigTaihodata.amount) !== parseFloat(data.issue_bigTaiho)) {
                            console.log('Needs Update In bigTaiho')
                            const difference_bigT = parseFloat(data.issue_bigTaiho) - parseFloat(transferBigTaihodata.amount)
                            console.log(difference_bigT)
                            const backlog = await bigTaihoModel.findOne({
                                attributes: ['current_backlog', 'rcv_dpds'],
                                where: {
                                    lotNo: LotNo,
                                    origin: origin,
                                    latest: 1

                                },
                                order: [['LotNo', 'ASC']]

                            });
                            if (backlog && backlog.dataValues.current_backlog >= 0) {
                                await bigTaihoModel.update(
                                    {
                                        rcv_dpds: sequelize.literal(`rcv_dpds+ ${difference_bigT}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_bigT}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNo,
                                            origin: origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );

                                await sectionTransfer.update({
                                    date: data.Date,
                                    amount: data.issue_bigTaiho,
                                    toSectionBeforeBacklog: transferBigTaihodata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog: parseFloat(transferBigTaihodata.toSectionBeforeBacklog) + parseFloat(data.issue_bigTaiho)

                                }, {
                                    where: {
                                        id: transferBigTaihodata.id
                                    }, transaction
                                });
                            }
                            else {
                                res.status(500).json({ message: "Associated BigTaiho Entry Not Found" });
                                throw new Error('Transaction Aborted due to Improper Value')
                            }
                        }

                        if(parseFloat(transferRejectiondata.amount)!==parseFloat(data.issue_rejection)){
                            console.log('Needs Update In Rejection')
                            const difference_rejection=parseFloat(data.issue_rejection)-parseFloat(transferRejectiondata.amount)
                            console.log(difference_rejection)
                            const backlog = await rejectionModel.findOne({
                                attributes: ['current_backlog','rcv_dpds'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await rejectionModel.update(
                                    {
                                        rcv_dpds: sequelize.literal(`rcv_dpds+ ${difference_rejection}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_rejection}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNo,
                                            origin: origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );

                                await sectionTransfer.update({
                                    date: data.Date,
                                    amount:data.issue_rejection,
                                    toSectionBeforeBacklog:transferRejectiondata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferRejectiondata.toSectionBeforeBacklog)+parseFloat(data.issue_rejection)
                        
                                }, {
                                    where: {
                                        id:transferRejectiondata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Rejection Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferVildata.amount)!==parseFloat(data.issue_village)){
                            console.log('Needs Update In Village')
                            const difference_vil=parseFloat(data.issue_village)-parseFloat(transferVildata.amount)
                            console.log(difference_vil)
                            const backlog = await villageProduction.findOne({
                                attributes: ['current_backlog','rcv_dpds'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await villageProduction.update(
                                    {
                                        rcv_dpds: sequelize.literal(`rcv_dpds+ ${difference_vil}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_vil}`)
                                    },
                                    {
                                        where: {
                                            lotNo: LotNo,
                                            origin: origin,
                                            latest: 1
                                        }, transaction
                                    }
                                );

                                await sectionTransfer.update({
                                    date: data.Date,
                                    amount:data.issue_village,
                                    toSectionBeforeBacklog:transferVildata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferVildata.toSectionBeforeBacklog)+parseFloat(data.issue_village)
                        
                                }, {
                                    where: {
                                        id:transferVildata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Village Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        await lotoriginmodel.update(
                            {
                                editStatus: 'NA',

                            },
                            {
                                where: {
                                    lotNo: LotNo,
                                    origin: origin
                                }, transaction
                            }
                        );
                        await DPDSEdit.destroy({
                            where: {
                                id
                            }, transaction
                        });
                        return res.status(200).json({ message: "Edit Request of DPDS Entry is Approved Successfully" });
                    }

                })
            }
            else {
                return res.status(400).json({ message: "DPDS Transfer Entry is not found" });
            }

        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectDPDS = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const rejectedBy = req.cookies.user;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await DPDS.update({
            editStatus: "NA",
            modifiedBy: rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "DPDS Entry not found" });
        }
        await lotoriginmodel.update(
            {
                editStatus: 'NA',

            },
            {
                where: {
                    lotNo: LotNo,
                    origin: origin
                }
            }
        );
        const rcnEdit = await DPDSEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "DPDS Entry not found" });
        }
        return res.status(200).json({ message: "DPDS Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
// //RCNDPDSMix.tsx
export const SearchRCNDPDSMix = async (req: Request, res: Response) => {
    try {
        const { lotNo, origin } = req.body;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (lotNo) {
            whereClause.push({
                LotNo: lotNo
            });
        }

        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }
        whereClause.push({
            latest: {
                [Op.eq]: 1
            }
        });

        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries

        rcnEntries = await DPDS.findOne({
            attributes: ['id', 'rcv_transfer', 'current_backlog', 'rcv_dp', 'rcv_dp1',
                 'rcv_ds', 'rcv_Sorting', 'editStatus','Status','issue_add_4','issue_add_5','issue_add_6'],
            where


        });



        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }

}

export const CreateMixDPDS = async (req: Request, res: Response) => {

    try {
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid = req.body.fsourceid;
        const sourcelot = req.body.fsourcelot;
        const sourceorigin = req.body.fsourceorigin;
        const source_rcv_dp = req.body.fsourcercv_dp;
        const source_rcv_ds = req.body.fsourcercv_ds;
        const source_rcv_dp1 = req.body.fsourcercv_dp1;

        const source_sorting = req.body.fsourcercv_sorting;
        const source_bigT = req.body.fsourcercv_bigT;
        const source_backlog = req.body.fsourcebacklog;

        const transfer_amount = req.body.amount

        const destid = req.body.destid;
        const destlot = req.body.destlot;
        const destorigin = req.body.destorigin;
        const dest_rcv_dp = req.body.destrcv_dp;
        const dest_rcv_ds = req.body.destrcv_ds;
        const dest_rcv_dp1 = req.body.destrcv_dp1;

        const dest_sorting = req.body.destrcv_sorting;
        const dest_bigT = req.body.destrcv_bigT;
        const dest_backlog = req.body.destbacklog;
        const destrcv_status = req.body.destrcv_status;
        const b_soucre_backlog = req.body.bsourcebacklog;
        const b_dest_backlog = req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourcedata = await DPDS.findOne({
                attributes: ['rcv_dp','rcv_ds','rcv_dp1','issue_add_4','issue_add_5','issue_add_6'],
                where: {
                    id: sourceid

                },

            });
            let sourceupdate
            if(sourcedata){
                const dpdiff=parseFloat(sourcedata.dataValues.issue_add_4)-parseFloat(source_rcv_dp)
                const dsdiff=parseFloat(sourcedata.dataValues.issue_add_5)-parseFloat(source_rcv_ds)
                const dp1diff=parseFloat(sourcedata.dataValues.issue_add_6)-parseFloat(source_rcv_dp1)
                const totbeforeborma=(parseFloat(sourcedata.dataValues.rcv_dp)-dpdiff)
                +(parseFloat(sourcedata.dataValues.rcv_ds)-dsdiff)+(parseFloat(sourcedata.dataValues.rcv_dp1)-  dp1diff)
                const totafterborma=parseFloat(source_rcv_dp)+parseFloat(source_rcv_ds)+parseFloat(source_rcv_dp1)

                
                sourceupdate = await DPDS.update(
                    {
                        rcv_dp: sequelize.literal(`rcv_dp- ${dpdiff}`),
                        rcv_ds: sequelize.literal(`rcv_ds- ${dsdiff}`),
                        rcv_dp1: sequelize.literal(`rcv_dp1- ${dp1diff}`),
                        issue_add_3: ((totbeforeborma-totafterborma)/totbeforeborma)*100,
                        issue_add_4: source_rcv_dp,
                        issue_add_5: source_rcv_ds,
                        issue_add_6: source_rcv_dp1,
                        rcv_Sorting: source_sorting,
                        rcv_transfer: source_bigT,
                        current_backlog: source_backlog,
                    },
                    {
                        where: {
                            id: sourceid
                        }, transaction
                    }
                );
            }
            
            const destdata = await DPDS.findOne({
                attributes: ['mixingLot','rcv_dp','rcv_ds','rcv_dp1','issue_add_4','issue_add_5','issue_add_6'],
                where: {
                    id: destid

                },

            });

            if (destdata) {
                let destupdate
                if (Number(destrcv_status) === 0) {
                    destupdate = await DPDS.update(
                        {
                            rcv_dp: dest_rcv_dp,
                            rcv_ds: dest_rcv_ds,
                            rcv_dp1: dest_rcv_dp1,
                            rcv_Sorting: dest_sorting,
                            rcv_transfer: dest_bigT,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                            sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`):`${sourcelot}(${sourceorigin})`,
                        },
                        {
                            where: {
                                id: destid
                            }, transaction
                        }
                    );
                }
                else {

                const dpdiffD=parseFloat(dest_rcv_dp)-parseFloat(destdata.dataValues.issue_add_4)
                const dsdiffD=parseFloat(dest_rcv_ds)-parseFloat(destdata.dataValues.issue_add_5)
                const dp1diffD=parseFloat(dest_rcv_dp1)-parseFloat(destdata.dataValues.issue_add_6)
                const totbeforebormaD=(parseFloat(destdata.dataValues.rcv_dp)+dpdiffD)
                +(parseFloat(destdata.dataValues.rcv_ds)+dsdiffD)+(parseFloat(destdata.dataValues.rcv_dp1)+dp1diffD)
                const totafterbormaD=parseFloat(dest_rcv_dp)
                +parseFloat(dest_rcv_ds)+parseFloat(dest_rcv_dp1)

                    destupdate = await DPDS.update(
                        {
                            rcv_dp: sequelize.literal(`rcv_dp+ ${dpdiffD}`),
                            rcv_ds: sequelize.literal(`rcv_ds+ ${dsdiffD}`),
                            rcv_dp1: sequelize.literal(`rcv_dp1+ ${dp1diffD}`),
                            issue_add_3: ((totbeforebormaD-totafterbormaD)/totbeforebormaD)*100,

                            issue_add_4: dest_rcv_dp,
                            issue_add_5: dest_rcv_ds,
                            issue_add_6: dest_rcv_dp1,

                            rcv_Sorting: dest_sorting,
                            rcv_transfer: dest_bigT,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                            sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`):`${sourcelot}(${sourceorigin})`,
                        },
                        {
                            where: {
                                id: destid
                            }, transaction
                        }
                    );
                }

                if (sourceupdate && destupdate) {
                    const mixcreate = await mixingModel.create(
                        {
                            FromLotNo: sourcelot,
                            Fromorigin: sourceorigin,
                            ToLotNo: destlot,
                            Toorigin: destorigin,
                            amount: transfer_amount,
                            date: new Date(),
                            Section: 'DPDS',
                            amountBeforeBacklog: b_soucre_backlog,
                            amountAfterBacklog: source_backlog,
                            destamountBeforeBacklog: b_dest_backlog,
                            destamountAfterBacklog: dest_backlog,
                            createdBy: createdBy,
                        },
                        {
                            transaction
                        }
                    );
                    if (mixcreate) {
                        return res.status(200).json({ message: "Mixing Performed Successfully" });

                    }
                    else {
                        return res.status(500).json({ message: "Internal Server Error" });
                    }
                }
                else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }


            }
            
        })


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}







