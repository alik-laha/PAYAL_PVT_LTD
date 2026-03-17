import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import LWEditModel from "../../model/lowerGradeEditModel";
import LWModel from "../../model/lowerGradeModel";
import hamsaModel from "../../model/hamsamodel";
import sectionTransfer from "../../model/transactionsectionmodel";
import bigTaihoModel from "../../model/bigTaihoModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";
import lotoriginmodel from "../../model/lotoriginModel";
//import WhatsappMsg from "../../helper/WhatsappMsg";
import mixingModel from "../../model/mixingModel";

// //LW.tsx
export const findEditLWAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await LWEditModel.findAll({ order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditLWAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const sumOfallLW = async (req: Request, res: Response) => {


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

        const Sumdata = await LWModel.findAll({
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

        const data = await LWModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_kw')), 'issue_kw'],
                [sequelize.fn('sum', sequelize.col('issue_kw_1')), 'issue_kw_1'],
                [sequelize.fn('sum', sequelize.col('issue_kw_2')), 'issue_kw_2'],
                [sequelize.fn('sum', sequelize.col('issue_kn')), 'issue_kn'],
                [sequelize.fn('sum', sequelize.col('issue_dw')), 'issue_dw'],
                [sequelize.fn('sum', sequelize.col('issue_dw_1')), 'issue_dw_1'],
                [sequelize.fn('sum', sequelize.col('issue_dw_2')), 'issue_dw_2'],
                [sequelize.fn('sum', sequelize.col('issue_ow')), 'issue_ow'],
                [sequelize.fn('sum', sequelize.col('issue_ow_1')), 'issue_ow_1'],
                [sequelize.fn('sum', sequelize.col('issue_ow_2')), 'issue_ow_2'],
                [sequelize.fn('sum', sequelize.col('issue_jw')), 'issue_jw'],
                [sequelize.fn('sum', sequelize.col('issue_pw')), 'issue_pw'],
                [sequelize.fn('sum', sequelize.col('issue_row')), 'issue_row'],
                [sequelize.fn('sum', sequelize.col('issue_rej_1')), 'issue_rej_1'],
                [sequelize.fn('sum', sequelize.col('issue_lw3_180')), 'issue_lw3_180'],
                [sequelize.fn('sum', sequelize.col('issue_lw3_210')), 'issue_lw3_210'],
                [sequelize.fn('sum', sequelize.col('issue_lw3_240')), 'issue_lw3_240'],
                [sequelize.fn('sum', sequelize.col('issue_lw3_280')), 'issue_lw3_280'],
                [sequelize.fn('sum', sequelize.col('issue_lw3_360')), 'issue_lw3_360'],
                [sequelize.fn('sum', sequelize.col('issue_lw2')), 'issue_lw2'],
                [sequelize.fn('sum', sequelize.col('issue_lw4')), 'issue_lw4'],
                [sequelize.fn('sum', sequelize.col('issue_lw5')), 'issue_lw5'],
                [sequelize.fn('sum', sequelize.col('issue_lw6')), 'issue_lw6'],
                [sequelize.fn('sum', sequelize.col('issue_lw7')), 'issue_lw7'],
                [sequelize.fn('sum', sequelize.col('issue_rej_3')), 'issue_rej_3'],
                [sequelize.fn('sum', sequelize.col('issue_rej_4')), 'issue_rej_4'],
                [sequelize.fn('sum', sequelize.col('issue_jb2')), 'issue_jb2'],
                [sequelize.fn('sum', sequelize.col('issue_sjb')), 'issue_sjb'],
                [sequelize.fn('sum', sequelize.col('issue_k_240')), 'issue_k_240'],
                [sequelize.fn('sum', sequelize.col('issue_k_280')), 'issue_k_280'],
                [sequelize.fn('sum', sequelize.col('issue_k_360')), 'issue_k_360'],
                [sequelize.fn('sum', sequelize.col('issue_pkw')), 'issue_pkw'],
                [sequelize.fn('sum', sequelize.col('issue_bw')), 'issue_bw'],
                [sequelize.fn('sum', sequelize.col('issue_rw')), 'issue_rw'],
                [sequelize.fn('sum', sequelize.col('issue_rrw')), 'issue_rrw'],
                [sequelize.fn('sum', sequelize.col('issue_fw')), 'issue_fw'],
                [sequelize.fn('sum', sequelize.col('issue_lw')), 'issue_lw'],
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
                [sequelize.fn('sum', sequelize.col('issue_hamsa')), 'issue_hamsa'],

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
        const EditData = await LWEditModel.count()
        const PendingData = await LWModel.count({where: { [Op.or]: [
                            { editStatus: "Approved" },
                            { editStatus: "NA" }
                        ],latest: 1,current_backlog: {
                            [Op.gt]: 0
                        }}} )
        if (data && Sumdata) {
            return res.status(200).json({ data, EditData, Sumdata,PendingData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getLWLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await LWModel.findAll({

            attributes: ['LotNo', 'origin', 'current_backlog', 'rcv_mayur', 'rcv_wholes', 'rcv_hamsa'],
            where: {
                Status: status
            }

        });
        if (scoopingLot) {
            res.status(200).json({ message: "Un LW Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding LW Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //LWInitial.tsx
export const getLWBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const origin = req.params.origin
        const scoopingLot = await LWModel.findAll({
            where: {
                LotNo: lotNO, origin: origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if (scoopingLot) {
            res.status(200).json({ message: "Un LW Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding LW Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //LWCreateForm.tsx
export const CreateEntireLW = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {



                if ((Number((parseFloat(data.rcv_mayurN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0)
                    + parseFloat(data.rcv_hamsaN)).toFixed(2))) < (Number((parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                        parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                        parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                        parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                        parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                        parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                        parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                        parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                        parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                        parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                        parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                        parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                        parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)).toFixed(2))

                    )) {
                    console.log(Number((parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                        parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                        parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                        parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                        parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                        parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                        parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                        parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                        parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                        parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                        parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                        parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                        parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)).toFixed(2))
                    )
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }
                const LWUpdate = await LWModel.update(
                    {
                        date: data.Date,
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,

                        issue_kw: data.issue_kw,
                        issue_kw_1: data.issue_kw_1,
                        issue_kw_2: data.issue_kw_2,
                        issue_kn: data.issue_kn,
                        issue_dw: data.issue_dw,
                        issue_dw_1: data.issue_dw_1,
                        issue_dw_2: data.issue_dw_2,
                        issue_ow: data.issue_ow,
                        issue_ow_1: data.issue_ow_1,
                        issue_ow_2: data.issue_ow_2,
                        issue_jw: data.issue_jw,
                        issue_pw: data.issue_pw,
                        issue_row: data.issue_row,
                        issue_rej_1: data.issue_rej_1,
                        issue_lw3_180: data.issue_lw3_180,
                        issue_lw3_210: data.issue_lw3_210,
                        issue_lw3_240: data.issue_lw3_240,
                        issue_lw3_280: data.issue_lw3_280,
                        issue_lw3_360: data.issue_lw3_360,
                        issue_lw2: data.issue_lw2,
                        issue_lw4: data.issue_lw4,
                        issue_lw5: data.issue_lw5,
                        issue_lw6: data.issue_lw6,
                        issue_lw7: data.issue_lw7,
                        issue_rej_3: data.issue_rej_3,
                        issue_rej_4: data.issue_rej_4,
                        issue_jb2: data.issue_jb2,
                        issue_sjb: data.issue_sjb,
                        issue_k_240: data.issue_k_240,
                        issue_k_280: data.issue_k_280,
                        issue_k_360: data.issue_k_360,
                        issue_pkw: data.issue_pkw,
                        issue_bw: data.issue_bw,
                        issue_rw: data.issue_rw,
                        issue_rrw: data.issue_rrw,
                        issue_fw: data.issue_fw,
                        issue_lw: data.issue_lw,
                        issue_village: data.issue_village,
                        issue_hamsa: data.issue_hamsa,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_rejection: data.issue_rejection,
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
                        issue_add_7: data.rcv_mayurN,
                        issue_add_8: data.rcv_hamsaN,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                    
                        current_backlog: (parseFloat(data.rcv_mayurN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0)
                            + parseFloat(data.rcv_hamsaN))
                            - (parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                                parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                                parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                                parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                                parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                                parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                                parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                                parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                                parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                                parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                                parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                                parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                                parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                                parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)


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
                if (LWUpdate) {

                    // 1. Hamsa Out//

                    const hamsa_backlog = await hamsaModel.findOne({
                        attributes: ['current_backlog', 'rcv_lw'],
                        where: {
                            lotNo: LotNO,
                            origin: data.origin,
                            latest: 1

                        },
                        order: [['LotNo', 'ASC']]

                    });
                    console.log(hamsa_backlog)
                    if (hamsa_backlog && hamsa_backlog.dataValues.current_backlog >= 0) {
                        await sectionTransfer.create({
                            LotNo: LotNO,
                            origin: data.origin,
                            amount: data.issue_hamsa,
                            issueid: 1,
                            date: data.Date,
                            fromSection: 'LW',
                            toSection: 'Hamsa',
                            toSectionBeforeBacklog: hamsa_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(hamsa_backlog.dataValues.current_backlog) + parseFloat(data.issue_hamsa),
                            createdBy: feeledBy
                        }, { transaction });
                        if (hamsa_backlog.dataValues.rcv_lw) {
                            await hamsaModel.update(
                                {
                                    rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_hamsa}`),
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_hamsa}`)
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
                            await hamsaModel.update(
                                {
                                    rcv_lw: data.issue_hamsa,
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_hamsa}`)
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
                        res.status(500).json({ message: "Error In Creating Hamsa Transaction History" });
                        throw new Error('Transaction Aborted')
                    }

                    // 2. BigTaiho Out//

                    const bigT_backlog = await bigTaihoModel.findOne({
                        attributes: ['current_backlog', 'rcv_lw'],
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
                            fromSection: 'LW',
                            toSection: 'BigTaiho',
                            toSectionBeforeBacklog: bigT_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(bigT_backlog.dataValues.current_backlog) + parseFloat(data.issue_bigTaiho),
                            createdBy: feeledBy
                        }, { transaction });
                        if (bigT_backlog.dataValues.rcv_lw) {
                            await bigTaihoModel.update(
                                {
                                    rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_bigTaiho}`),
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
                                    rcv_lw: data.issue_bigTaiho,
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
                        res.status(500).json({ message: "Error In Creating BigTaiho Transaction History" });
                        throw new Error('Transaction Aborted')
                    }


                    //3. Rejection Out//

                    const rejection_backlog = await rejectionModel.findOne({
                        attributes: ['current_backlog', 'rcv_lw'],
                        where: {
                            lotNo: LotNO,
                            origin: data.origin,
                            latest: 1

                        },
                        order: [['LotNo', 'ASC']]

                    });
                    console.log(rejection_backlog)
                    if (rejection_backlog && rejection_backlog.dataValues.current_backlog >= 0) {
                        await sectionTransfer.create({
                            LotNo: LotNO,
                            origin: data.origin,
                            amount: data.issue_rejection,
                            issueid: 1,
                            date: data.Date,
                            fromSection: 'LW',
                            toSection: 'Rejection',
                            toSectionBeforeBacklog: rejection_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(rejection_backlog.dataValues.current_backlog) + parseFloat(data.issue_rejection),
                            createdBy: feeledBy
                        }, { transaction });
                        if (rejection_backlog.dataValues.rcv_lw) {
                            await rejectionModel.update(
                                {
                                    rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_rejection}`),
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                            await rejectionModel.update(
                                {
                                    rcv_lw: data.issue_rejection,
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                        res.status(500).json({ message: "Error In Creating Rejection Transaction History" });
                        throw new Error('Transaction Aborted')
                    }

                    //4. Village Out//

                    const vil_backlog = await villageProduction.findOne({
                        attributes: ['current_backlog', 'rcv_lw'],
                        where: {
                            lotNo: LotNO,
                            origin: data.origin,
                            latest: 1

                        },
                        order: [['LotNo', 'ASC']]

                    });
                    console.log(vil_backlog)
                    if (vil_backlog && vil_backlog.dataValues.current_backlog >= 0) {
                        await sectionTransfer.create({
                            LotNo: LotNO,
                            origin: data.origin,
                            amount: data.issue_village,
                            issueid: 1,
                            date: data.Date,
                            fromSection: 'LW',
                            toSection: 'Village',
                            toSectionBeforeBacklog: vil_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(vil_backlog.dataValues.current_backlog) + parseFloat(data.issue_village),
                            createdBy: feeledBy
                        }, { transaction });
                        if (vil_backlog.dataValues.rcv_lw) {
                            await villageProduction.update(
                                {
                                    rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_village}`),
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                            await villageProduction.update(
                                {
                                    rcv_lw: data.issue_village,
                                    current_backlog: sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                        res.status(500).json({ message: "Error In Creating Village Transaction History" });
                        throw new Error('Transaction Aborted')
                    }

                    await LotNo.update(
                        {
                            modifiedBy: 'Next Interconnected'
                        },
                        {
                            where: {
                                lotNo: LotNO
                            }, transaction
                        }
                    );
                    const lotupdate = await lotoriginmodel.update(
                        {
                            latest_section: 'LW',
                            lowergradeStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                    );
                    if (lotupdate) {
                        res.status(200).json({ message: "Lower Grade Entry Made Successfully" });
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
            return res.status(500).json({ message: "Error while creating LW Entry", error });
        }
    }
}

export const CreateReissueLW = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {
                if (Number(parseFloat(data.rcv_openingN).toFixed(2)) < (Number((parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                    parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                    parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                    parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                    parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                    parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                    parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                    parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                    parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                    parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                    parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                    parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                    parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                    parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                    parseFloat(data.issue_ext_grade_2) +
                    parseFloat(data.issue_ext_grade_3) +
                    parseFloat(data.issue_ext_grade_4) +
                    parseFloat(data.issue_ext_grade_5) +
                    parseFloat(data.issue_ext_grade_6) +
                    parseFloat(data.issue_ext_grade_7) +
                    parseFloat(data.issue_ext_grade_8) +
                    parseFloat(data.issue_ext_grade_9) +
                    parseFloat(data.issue_ext_grade_10)).toFixed(2))

                )) {
                    console.log(Number((parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                        parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                        parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                        parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                        parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                        parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                        parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                        parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                        parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                        parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                        parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                        parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                        parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)).toFixed(2))
                    )
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }

                const LWUpdate = await LWModel.update(
                    {
                        latest: 0

                    }, {
                    where: {
                        id: data.id
                    }, transaction
                });


                if (LWUpdate) {
                    const reissuecreate = await LWModel.create(
                        {
                            date: data.Date,
                            altid: parseInt(data.alt_id) + 1,
                            LotNo: data.LotNo,
                            origin: data.origin,
                            mixingLot: data.mixingLot,
                            noOfdayOperators: data.dayoperator,
                            noOfnightOperators: data.nightoperator,
                            rcv_mayur:data.rcv_mayur,
                            rcv_hamsa:data.rcv_hamsa,
                            rcv_wholes:data.rcv_wholesN,
                            issue_kw: data.issue_kw,
                            issue_kw_1: data.issue_kw_1,
                            issue_kw_2: data.issue_kw_2,
                            issue_kn: data.issue_kn,
                            issue_dw: data.issue_dw,
                            issue_dw_1: data.issue_dw_1,
                            issue_dw_2: data.issue_dw_2,
                            issue_ow: data.issue_ow,
                            issue_ow_1: data.issue_ow_1,
                            issue_ow_2: data.issue_ow_2,
                            issue_jw: data.issue_jw,
                            issue_pw: data.issue_pw,
                            issue_row: data.issue_row,
                            issue_rej_1: data.issue_rej_1,
                            issue_lw3_180: data.issue_lw3_180,
                            issue_lw3_210: data.issue_lw3_210,
                            issue_lw3_240: data.issue_lw3_240,
                            issue_lw3_280: data.issue_lw3_280,
                            issue_lw3_360: data.issue_lw3_360,
                            issue_lw2: data.issue_lw2,
                            issue_lw4: data.issue_lw4,
                            issue_lw5: data.issue_lw5,
                            issue_lw6: data.issue_lw6,
                            issue_lw7: data.issue_lw7,
                            issue_rej_3: data.issue_rej_3,
                            issue_rej_4: data.issue_rej_4,
                            issue_jb2: data.issue_jb2,
                            issue_sjb: data.issue_sjb,
                            issue_k_240: data.issue_k_240,
                            issue_k_280: data.issue_k_280,
                            issue_k_360: data.issue_k_360,
                            issue_pkw: data.issue_pkw,
                            issue_bw: data.issue_bw,
                            issue_rw: data.issue_rw,
                            issue_rrw: data.issue_rrw,
                            issue_fw: data.issue_fw,
                            issue_lw: data.issue_lw,
                            issue_village: data.issue_village,
                            issue_hamsa: data.issue_hamsa,
                            issue_bigTaiho: data.issue_bigTaiho,
                            issue_rejection: data.issue_rejection,
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

                            issue_add_1: data.rcv_mayurN,
                            issue_add_2: data.issue_add_2,
                            issue_add_3: data.issue_add_3,
                            issue_add_4: data.rcv_hamsaN,
                            issue_add_5: data.issue_add_5,
                            issue_add_6: data.issue_add_3,
                            issue_add_7: data.rcv_mayurN,
                            issue_add_8: data.rcv_hamsaN,
                            issue_add_9: data.issue_add_9,
                            issue_add_10: data.issue_add_10,
                         
                            current_backlog: parseFloat(data.rcv_openingN)
                                - (parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                                    parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                                    parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                                    parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                                    parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                                    parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                                    parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                                    parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                                    parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                                    parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                                    parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                                    parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                                    parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                                    parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                                    parseFloat(data.issue_ext_grade_2) +
                                    parseFloat(data.issue_ext_grade_3) +
                                    parseFloat(data.issue_ext_grade_4) +
                                    parseFloat(data.issue_ext_grade_5) +
                                    parseFloat(data.issue_ext_grade_6) +
                                    parseFloat(data.issue_ext_grade_7) +
                                    parseFloat(data.issue_ext_grade_8) +
                                    parseFloat(data.issue_ext_grade_9) +
                                    parseFloat(data.issue_ext_grade_10)


                                ),
                            Status: 1,
                            CreatedBy: feeledBy
                        },
                        {
                            transaction
                        }
                    );

                    if(reissuecreate){
                        //1 BigTaiho out/////////
                        const bigT_backlog = await bigTaihoModel.findOne({
                            attributes: ['current_backlog', 'rcv_lw'],
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
                                issueid: parseInt(data.alt_id) + 1,
                                date: data.Date,
                                fromSection: 'LW',
                                toSection: 'BigTaiho',
                                toSectionBeforeBacklog: bigT_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(bigT_backlog.dataValues.current_backlog) + parseFloat(data.issue_bigTaiho),
                                createdBy: feeledBy
                            }, { transaction });
                            if (bigT_backlog.dataValues.rcv_lw) {
                                await bigTaihoModel.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_bigTaiho}`),
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
                                        rcv_lw: data.issue_bigTaiho,
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


                         //2 Rejection Out//
                        
                        const rejection_backlog = await rejectionModel.findOne({
                            attributes: ['current_backlog', 'rcv_lw'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(rejection_backlog)
                        if (rejection_backlog && rejection_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_rejection,
                                issueid: parseInt(data.alt_id) + 1,
                                date: data.Date,
                                fromSection: 'LW',
                                toSection: 'Rejection',
                                toSectionBeforeBacklog: rejection_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(rejection_backlog.dataValues.current_backlog) + parseFloat(data.issue_rejection),
                                createdBy: feeledBy
                            }, { transaction });
                            if (rejection_backlog.dataValues.rcv_lw) {
                                await rejectionModel.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_rejection}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                                await rejectionModel.update(
                                    {
                                        rcv_lw: data.issue_rejection,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_rejection}`)
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
                            res.status(500).json({ message: "Error In Creating Reissue Rejection Transaction History" });
                            throw new Error('Transaction Aborted')
                        }

                        //3. Village Out//
                        
                        const vil_backlog = await villageProduction.findOne({
                            attributes: ['current_backlog', 'rcv_lw'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(vil_backlog)
                        if (vil_backlog && vil_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_village,
                                issueid: parseInt(data.alt_id) + 1,
                                date: data.Date,
                                fromSection: 'LW',
                                toSection: 'Village',
                                toSectionBeforeBacklog: vil_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(vil_backlog.dataValues.current_backlog) + parseFloat(data.issue_village),
                                createdBy: feeledBy
                            }, { transaction });
                            if (vil_backlog.dataValues.rcv_lw) {
                                await villageProduction.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_village}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                                await villageProduction.update(
                                    {
                                        rcv_lw: data.issue_village,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_village}`)
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
                            res.status(500).json({ message: "Error In Creating Village Reissue Transaction History" });
                            throw new Error('Transaction Aborted')
                        }

                        4.// Hamsa Out//

                        const hamsa_backlog = await hamsaModel.findOne({
                            attributes: ['current_backlog', 'rcv_lw'],
                            where: {
                                lotNo: LotNO,
                                origin: data.origin,
                                latest: 1

                            },
                            order: [['LotNo', 'ASC']]

                        });
                        console.log(hamsa_backlog)
                        if (hamsa_backlog && hamsa_backlog.dataValues.current_backlog >= 0) {
                            await sectionTransfer.create({
                                LotNo: LotNO,
                                origin: data.origin,
                                amount: data.issue_hamsa,
                                issueid: 1,
                                date: data.Date,
                                fromSection: 'LW',
                                toSection: 'Hamsa',
                                toSectionBeforeBacklog: hamsa_backlog.dataValues.current_backlog,
                                toSectionAfterBacklog: parseFloat(hamsa_backlog.dataValues.current_backlog) + parseFloat(data.issue_hamsa),
                                createdBy: feeledBy
                            }, { transaction });
                            if (hamsa_backlog.dataValues.rcv_lw) {
                                await hamsaModel.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${data.issue_hamsa}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_hamsa}`)
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
                                await hamsaModel.update(
                                    {
                                        rcv_lw: data.issue_hamsa,
                                        current_backlog: sequelize.literal(`current_backlog+ ${data.issue_hamsa}`)
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
                            res.status(500).json({ message: "Error In Creating Hamsa Re-Issue Transaction History" });
                            throw new Error('Transaction Aborted')
                        } 

                        const lotoriginupdate = await lotoriginmodel.update(
                            {
                                latest_section: 'LW',
                                lowergradeStatus: 1
                            },
                            {
                                where: {
                                    lotNo: LotNO,
                                    origin: data.origin
                                }, transaction
                            }
                        );

                        if (lotoriginupdate) {
                            res.status(200).json({ message: "LW Reissue Entry Made Successfully" });
                        }
                        else {
                            console.log('No Need For Update')
                        }

                    }
                     else {
                        return res.status(500).json({ message: "Error while creating LW Re Issue Entry" });
                    }
                }




            }

        })
    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating LW Entry", error });
        }
    }
}

// //LWTable.tsx
export const SearchRCNLW = async (req: Request, res: Response) => {
    try {
        const { searchitem, fromDate, toDate, origin,type } = req.body;
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
        if (type === "LOT") {
         whereClause.push({
           [Op.and]: [
             { LotNo: { [Op.notLike]: "%V%" } },
             { LotNo: { [Op.notLike]: "%R%" } },
           ],
         });
       } else if (type === "RLOT") {
         whereClause.push({
           LotNo: {
             [Op.like]: "%R%",
           },
         });
       } else {
         whereClause.push({
           LotNo: {
             [Op.like]: "%V%",
           },
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
            rcnEntries = await LWModel.findAll({
                where,
                order: [['LotNo', 'DESC'], ['origin', 'ASC'], ['altid', 'ASC']], // Order by date descending

            });
        }
        else {
            rcnEntries = await LWModel.findAll({
                where,
                order: [['LotNo', 'DESC'], ['origin', 'ASC'], ['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }

        return res.status(200).json({ message: 'LW Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }

}

export const updateEntireLW = async (req: Request, res: Response) => {
    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {

                if ((Number((parseFloat(data.rcv_mayurN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0)
                    + parseFloat(data.rcv_hamsaN)).toFixed(2))) < (Number((parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                        parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                        parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                        parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                        parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                        parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                        parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                        parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                        parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                        parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                        parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                        parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                        parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)).toFixed(2))

                    )) {
                    console.log(Number((parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                        parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                        parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                        parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                        parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                        parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                        parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                        parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                        parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                        parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                        parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                        parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                        parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                        parseFloat(data.issue_ext_grade_2) +
                        parseFloat(data.issue_ext_grade_3) +
                        parseFloat(data.issue_ext_grade_4) +
                        parseFloat(data.issue_ext_grade_5) +
                        parseFloat(data.issue_ext_grade_6) +
                        parseFloat(data.issue_ext_grade_7) +
                        parseFloat(data.issue_ext_grade_8) +
                        parseFloat(data.issue_ext_grade_9) +
                        parseFloat(data.issue_ext_grade_10)).toFixed(2))
                    )
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }

                await LWEditModel.create(
                    {
                        id: data.id,
                        date: data.Date,
                        LotNo: LotNO,
                        origin: data.origin,
                        altid: data.alt_id,
                        mixingLot: data.mixingLot,

                        rcv_hamsa: data.rcv_hamsa,
                        rcv_mayur: data.rcv_mayur,
                        rcv_wholes: data.rcv_wholes,


                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,

                        issue_kw: data.issue_kw,
                        issue_kw_1: data.issue_kw_1,
                        issue_kw_2: data.issue_kw_2,
                        issue_kn: data.issue_kn,
                        issue_dw: data.issue_dw,
                        issue_dw_1: data.issue_dw_1,
                        issue_dw_2: data.issue_dw_2,
                        issue_ow: data.issue_ow,
                        issue_ow_1: data.issue_ow_1,
                        issue_ow_2: data.issue_ow_2,
                        issue_jw: data.issue_jw,
                        issue_pw: data.issue_pw,
                        issue_row: data.issue_row,
                        issue_rej_1: data.issue_rej_1,
                        issue_lw3_180: data.issue_lw3_180,
                        issue_lw3_210: data.issue_lw3_210,
                        issue_lw3_240: data.issue_lw3_240,
                        issue_lw3_280: data.issue_lw3_280,
                        issue_lw3_360: data.issue_lw3_360,
                        issue_lw2: data.issue_lw2,
                        issue_lw4: data.issue_lw4,
                        issue_lw5: data.issue_lw5,
                        issue_lw6: data.issue_lw6,
                        issue_lw7: data.issue_lw7,
                        issue_rej_3: data.issue_rej_3,
                        issue_rej_4: data.issue_rej_4,
                        issue_jb2: data.issue_jb2,
                        issue_sjb: data.issue_sjb,
                        issue_k_240: data.issue_k_240,
                        issue_k_280: data.issue_k_280,
                        issue_k_360: data.issue_k_360,
                        issue_pkw: data.issue_pkw,
                        issue_bw: data.issue_bw,
                        issue_rw: data.issue_rw,
                        issue_rrw: data.issue_rrw,
                        issue_fw: data.issue_fw,
                        issue_lw: data.issue_lw,
                        issue_village: data.issue_village,
                        issue_hamsa: data.issue_hamsa,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_rejection: data.issue_rejection,

                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3: data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.rcv_mayurN,
                        issue_add_8: data.rcv_hamsaN,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
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
                       
                        current_backlog: (parseFloat(data.rcv_mayurN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0)
                            + parseFloat(data.rcv_hamsaN))
                            - (parseFloat(data.issue_kw) + parseFloat(data.issue_kw_1) + parseFloat(data.issue_kw_2) +
                                parseFloat(data.issue_kn) + parseFloat(data.issue_dw) + parseFloat(data.issue_dw_1) +
                                parseFloat(data.issue_dw_2) + parseFloat(data.issue_ow) + parseFloat(data.issue_ow_1) +
                                parseFloat(data.issue_ow_2) + parseFloat(data.issue_jw) + parseFloat(data.issue_pw) +
                                parseFloat(data.issue_row) + parseFloat(data.issue_rej_1) + parseFloat(data.issue_lw3_180) +
                                parseFloat(data.issue_lw3_210) + parseFloat(data.issue_lw3_240) + parseFloat(data.issue_lw3_280) +
                                parseFloat(data.issue_lw3_360) + parseFloat(data.issue_lw2) + parseFloat(data.issue_lw4) +
                                parseFloat(data.issue_lw5) + parseFloat(data.issue_lw6) + parseFloat(data.issue_lw7) +
                                parseFloat(data.issue_rej_3) + parseFloat(data.issue_rej_4) + parseFloat(data.issue_jb2) +
                                parseFloat(data.issue_sjb) + parseFloat(data.issue_k_240) + parseFloat(data.issue_k_280) +
                                parseFloat(data.issue_k_360) + parseFloat(data.issue_pkw) + parseFloat(data.issue_bw) +
                                parseFloat(data.issue_rw) + parseFloat(data.issue_rrw) + parseFloat(data.issue_fw) +
                                parseFloat(data.issue_lw) + parseFloat(data.issue_village) + parseFloat(data.issue_hamsa) +
                                parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_ext_grade_1) +
                                parseFloat(data.issue_ext_grade_2) +
                                parseFloat(data.issue_ext_grade_3) +
                                parseFloat(data.issue_ext_grade_4) +
                                parseFloat(data.issue_ext_grade_5) +
                                parseFloat(data.issue_ext_grade_6) +
                                parseFloat(data.issue_ext_grade_7) +
                                parseFloat(data.issue_ext_grade_8) +
                                parseFloat(data.issue_ext_grade_9) +
                                parseFloat(data.issue_ext_grade_10)


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
                const lotupdate = await LWModel.update({
                    editStatus: 'Pending'
                },
                    {
                        where: {
                            id: data.id
                        }, transaction
                    });


                if (lotupdate) {

                    //const data = await WhatsappMsg("Lower Grade", feeledBy, "modify_request", "Production")
                    //console.log(data)
                    return res.status(201).json({ message: "Edit Request of LW Entry Raised successfully" });

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
            return res.status(500).json({ message: "Error while Editing LW Entry", error });
        }
    }



}

export const approveLW = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await LWEditModel.findOne({
            where: {
                id
            }
        }) as any;

        if (!data) {
            return res.status(400).json({ message: "LW Edit Entry not found" });
        }
        else {


            const transferVildata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'LW',
                    toSection: 'Village'
                }
            }) as any

            const transferRejectiondata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'LW',
                    toSection: 'Rejection'
                }
            }) as any

            const transferBigTdata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'LW',
                    toSection: 'BigTaiho'
                }
            }) as any

            const transferHamsadata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'LW',
                    toSection: 'Hamsa'
                }
            }) as any



            if (transferVildata && transferRejectiondata && transferBigTdata && transferHamsadata) {
                await sequelize.transaction(async (transaction: any) => {

                    const BigTEdit = await LWModel.update({
                       date: data.date,
                        noOfdayOperators: data.noOfdayOperators,
                        noOfnightOperators: data.noOfnightOperators,
                        issue_kw: data.issue_kw,
                        issue_kw_1: data.issue_kw_1,
                        issue_kw_2: data.issue_kw_2,
                        issue_kn: data.issue_kn,
                        issue_dw: data.issue_dw,
                        issue_dw_1: data.issue_dw_1,
                        issue_dw_2: data.issue_dw_2,
                        issue_ow: data.issue_ow,
                        issue_ow_1: data.issue_ow_1,
                        issue_ow_2: data.issue_ow_2,
                        issue_jw: data.issue_jw,
                        issue_pw: data.issue_pw,
                        issue_row: data.issue_row,
                        issue_rej_1: data.issue_rej_1,
                        issue_lw3_180: data.issue_lw3_180,
                        issue_lw3_210: data.issue_lw3_210,
                        issue_lw3_240: data.issue_lw3_240,
                        issue_lw3_280: data.issue_lw3_280,
                        issue_lw3_360: data.issue_lw3_360,
                        issue_lw2: data.issue_lw2,
                        issue_lw4: data.issue_lw4,
                        issue_lw5: data.issue_lw5,
                        issue_lw6: data.issue_lw6,
                        issue_lw7: data.issue_lw7,
                        issue_rej_3: data.issue_rej_3,
                        issue_rej_4: data.issue_rej_4,
                        issue_jb2: data.issue_jb2,
                        issue_sjb: data.issue_sjb,
                        issue_k_240: data.issue_k_240,
                        issue_k_280: data.issue_k_280,
                        issue_k_360: data.issue_k_360,
                        issue_pkw: data.issue_pkw,
                        issue_bw: data.issue_bw,
                        issue_rw: data.issue_rw,
                        issue_rrw: data.issue_rrw,
                        issue_fw: data.issue_fw,
                        issue_lw: data.issue_lw,
                        issue_village: data.issue_village,
                        issue_hamsa: data.issue_hamsa,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_rejection: data.issue_rejection,
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
                      
                        current_backlog: data.current_backlog,
                        CreatedBy: data.CreatedBy,
                        editStatus: "Approved",
                        modifiedBy: approvedBy,
                    }, {
                        where: {
                            id
                        }, transaction
                    });
                    if (BigTEdit) {
                        //console.log(transferDPDSdata)

                        if (parseFloat(transferVildata.amount) !== parseFloat(data.issue_village)) {
                            console.log('Needs Update In Village')
                            const difference_vil = parseFloat(data.issue_village) - parseFloat(transferVildata.amount)
                            console.log(difference_vil)
                            const backlog = await villageProduction.findOne({
                                attributes: ['current_backlog', 'rcv_lw'],
                                where: {
                                    lotNo: LotNo,
                                    origin: origin,
                                    latest: 1

                                },
                                order: [['LotNo', 'ASC']]

                            });
                            if (backlog && backlog.dataValues.current_backlog >= 0) {
                                await villageProduction.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${difference_vil}`),
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
                                    amount: data.issue_village,
                                    toSectionBeforeBacklog: transferVildata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog: parseFloat(transferVildata.toSectionBeforeBacklog) + parseFloat(data.issue_village)

                                }, {
                                    where: {
                                        id: transferVildata.id
                                    }, transaction
                                });
                            }
                            else {
                                res.status(500).json({ message: "Associated Village Entry Not Found" });
                                throw new Error('Transaction Aborted due to Improper Value')
                            }
                        }

                        if (parseFloat(transferRejectiondata.amount) !== parseFloat(data.issue_rejection)) {
                            console.log('Needs Update In Rejection')
                            const difference_rejection = parseFloat(data.issue_rejection) - parseFloat(transferRejectiondata.amount)
                            console.log(difference_rejection)
                            const backlog = await rejectionModel.findOne({
                                attributes: ['current_backlog', 'rcv_lw'],
                                where: {
                                    lotNo: LotNo,
                                    origin: origin,
                                    latest: 1

                                },
                                order: [['LotNo', 'ASC']]

                            });
                            if (backlog && backlog.dataValues.current_backlog >= 0) {
                                await rejectionModel.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${difference_rejection}`),
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
                                    amount: data.issue_rejection,
                                    toSectionBeforeBacklog: transferRejectiondata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog: parseFloat(transferRejectiondata.toSectionBeforeBacklog) + parseFloat(data.issue_rejection)

                                }, {
                                    where: {
                                        id: transferRejectiondata.id
                                    }, transaction
                                });
                            }
                            else {
                                res.status(500).json({ message: "Associated Rejection Entry Not Found" });
                                throw new Error('Transaction Aborted due to Improper Value')
                            }
                        }

                        if (parseFloat(transferBigTdata.amount) !== parseFloat(data.issue_bigTaiho)) {
                            console.log('Needs Update In BigTaiho')
                            const difference_bigT = parseFloat(data.issue_bigTaiho) - parseFloat(transferBigTdata.amount)
                            console.log(difference_bigT)
                            const backlog = await bigTaihoModel.findOne({
                                attributes: ['current_backlog', 'rcv_lw'],
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
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${difference_bigT}`),
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
                                    toSectionBeforeBacklog: transferBigTdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog: parseFloat(transferBigTdata.toSectionBeforeBacklog) + parseFloat(data.issue_bigTaiho)

                                }, {
                                    where: {
                                        id: transferBigTdata.id
                                    }, transaction
                                });
                            }
                            else {
                                res.status(500).json({ message: "Associated BigTaiho Entry Not Found" });
                                throw new Error('Transaction Aborted due to Improper Value')
                            }
                        }

                        if (parseFloat(transferHamsadata.amount) !== parseFloat(data.issue_hamsa)) {
                            console.log('Needs Update In Hamsa')
                            const difference_hamsa = parseFloat(data.issue_hamsa) - parseFloat(transferHamsadata.amount)
                            console.log(difference_hamsa)
                            const backlog = await hamsaModel.findOne({
                                attributes: ['current_backlog', 'rcv_lw'],
                                where: {
                                    lotNo: LotNo,
                                    origin: origin,
                                    latest: 1

                                },
                                order: [['LotNo', 'ASC']]

                            });
                            if (backlog && backlog.dataValues.current_backlog >= 0) {
                                await hamsaModel.update(
                                    {
                                        rcv_lw: sequelize.literal(`rcv_lw+ ${difference_hamsa}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_hamsa}`)
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
                                    amount: data.issue_hamsa,
                                    toSectionBeforeBacklog: transferHamsadata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog: parseFloat(transferHamsadata.toSectionBeforeBacklog) + parseFloat(data.issue_hamsa)

                                }, {
                                    where: {
                                        id: transferHamsadata.id
                                    }, transaction
                                });
                            }
                            else {
                                res.status(500).json({ message: "Associated Hamsa Entry Not Found" });
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
                        await LWEditModel.destroy({
                            where: {
                                id
                            }, transaction
                        });
                        return res.status(200).json({ message: "Edit Request of LW Entry is Approved Successfully" });
                    }

                })
            }
            else {
                return res.status(400).json({ message: "LW Transfer Entry is not found" });
            }

        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectLW = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const rejectedBy = req.cookies.user;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await LWModel.update({
            editStatus: "NA",
            modifiedBy: rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "LW Entry not found" });
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
        const rcnEdit = await LWEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "LW Entry not found" });
        }
        return res.status(200).json({ message: "LW Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const SearchRCNLWMix = async (req: Request, res: Response) => {
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

        rcnEntries = await LWModel.findOne({
            attributes: ['id', 'current_backlog',
                'rcv_mayur', 'rcv_hamsa', 'rcv_wholes', 'editStatus', 'Status', 'issue_add_7', 'issue_add_8'],
            where


        });



        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }

}

export const CreateMixLW = async (req: Request, res: Response) => {

    try {
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid = req.body.fsourceid;
        const sourcelot = req.body.fsourcelot;
        const sourceorigin = req.body.fsourceorigin;

        const source_rcv_mayur = req.body.fsourcercv_mayur;
        const source_rcv_hamsa = req.body.fsourcercv_hamsa;

        const source_rcv_wholes = req.body.fsourcercv_wholes;
        const destrcv_status = req.body.destrcv_status;

        const source_backlog = req.body.fsourcebacklog;

        const transfer_amount = req.body.amount

        const destid = req.body.destid;
        const destlot = req.body.destlot;
        const destorigin = req.body.destorigin;

        const dest_rcv_mayur = req.body.destrcv_mayur;
        const dest_rcv_hamsa = req.body.destrcv_hamsa;

        const dest_rcv_wholes = req.body.destrcv_wholes;

        const dest_backlog = req.body.destbacklog;

        const b_soucre_backlog = req.body.bsourcebacklog;
        const b_dest_backlog = req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourcedata = await LWModel.findOne({
                attributes: ['rcv_mayur', 'issue_add_7', 'rcv_hamsa', 'issue_add_8'],
                where: {
                    id: sourceid
                },
            });

            let sourceupdate
            if (sourcedata) {
                const mayurdiff = parseFloat(sourcedata.dataValues.issue_add_7) - parseFloat(source_rcv_mayur)
                const totbeforebormamayur = parseFloat(sourcedata.dataValues.rcv_mayur) - mayurdiff
                const totafterbormamayur = parseFloat(source_rcv_mayur)

                const hamsadiff = parseFloat(sourcedata.dataValues.issue_add_8) - parseFloat(source_rcv_hamsa)
                const totbeforebormahamsa = parseFloat(sourcedata.dataValues.rcv_hamsa) - hamsadiff
                const totafterbormahamsa = parseFloat(source_rcv_hamsa)

                sourceupdate = await LWModel.update(
                    {
                        rcv_mayur: sequelize.literal(`rcv_mayur- ${mayurdiff}`),
                        issue_add_3: ((totbeforebormamayur - totafterbormamayur) / totbeforebormamayur) * 100,
                        issue_add_7: source_rcv_mayur,

                        rcv_hamsa: sequelize.literal(`rcv_hamsa- ${hamsadiff}`),
                        issue_add_6: ((totbeforebormahamsa - totafterbormahamsa) / totbeforebormahamsa) * 100,
                        issue_add_8: source_rcv_hamsa,


                        rcv_wholes: source_rcv_wholes,
                        current_backlog: source_backlog,
                    },
                    {
                        where: {
                            id: sourceid
                        }, transaction
                    }
                );
            }
            const destdata = await LWModel.findOne({
                attributes: ['mixingLot', 'rcv_mayur', 'issue_add_7', 'rcv_hamsa', 'issue_add_8'],
                where: {
                    id: destid

                },

            });

            if (destdata) {
                let destupdate
                if (Number(destrcv_status) === 0) {
                    destupdate = await LWModel.update(
                        {

                            rcv_mayur: dest_rcv_mayur,
                            rcv_hamsa: dest_rcv_hamsa,
                            rcv_wholes: dest_rcv_wholes,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                                sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`) : `${sourcelot}(${sourceorigin})`,
                        },
                        {
                            where: {
                                id: destid
                            }, transaction
                        }
                    );
                }
                else {
                    const mayurdiffD = parseFloat(dest_rcv_mayur) - parseFloat(destdata.dataValues.issue_add_7)
                    const totbeforebormaDmayur = parseFloat(destdata.dataValues.rcv_mayur) + mayurdiffD
                    const totafterbormaDmayur = parseFloat(dest_rcv_mayur)

                    const hamsadiffD = parseFloat(dest_rcv_hamsa) - parseFloat(destdata.dataValues.issue_add_8)
                    const totbeforebormaDhamsa = parseFloat(destdata.dataValues.rcv_hamsa) + hamsadiffD
                    const totafterbormaDhamsa = parseFloat(dest_rcv_hamsa)


                    destupdate = await LWModel.update(
                        {
                            rcv_mayur: sequelize.literal(`rcv_mayur+ ${mayurdiffD}`),
                            issue_add_3: ((totbeforebormaDmayur - totafterbormaDmayur) / totbeforebormaDmayur) * 100,
                            issue_add_7: dest_rcv_mayur,

                            rcv_hamsa: sequelize.literal(`rcv_hamsa+ ${hamsadiffD}`),
                            issue_add_6: ((totbeforebormaDhamsa - totafterbormaDhamsa) / totbeforebormaDhamsa) * 100,
                            issue_add_8: dest_rcv_hamsa,

                            rcv_wholes: dest_rcv_wholes,
                            current_backlog: dest_backlog,
                            mixingLot: destdata.dataValues.mixingLot ?
                                sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`) : `${sourcelot}(${sourceorigin})`,
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
                            Section: 'LW',
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