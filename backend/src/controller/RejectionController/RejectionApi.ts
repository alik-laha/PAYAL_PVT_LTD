import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import LWEditModel from "../../model/lowerGradeEditModel";
import LWModel from "../../model/lowerGradeModel";
import rejectionEditModel from "../../model/rejectionEditModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import lotoriginmodel from "../../model/lotoriginModel";

// //Rejection.tsx
export const findEditRejectionAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await rejectionEditModel.findAll({ order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditRejectionAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const sumOfallRejection = async (req: Request, res: Response) => {


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

        const data = await rejectionModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_packing')), 'issue_packing'],
                [sequelize.fn('sum', sequelize.col('issue_village')), 'issue_village'],
                [sequelize.fn('sum', sequelize.col('issue_uncut_unscoop')), 'issue_uncut_unscoop'],
                [sequelize.fn('sum', sequelize.col('issue_shell')), 'issue_shell'],
                [sequelize.fn('sum', sequelize.col('issue_catelfeed')), 'issue_catelfeed'],
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

                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
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
        const EditData = await rejectionEditModel.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getRejectionLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await rejectionModel.findAll({

            attributes: ['LotNo', 'origin', 'current_backlog',
                'rcv_peeling', 'rcv_mayur', 'rcv_wholes', 'rcv_dpds', 'rcv_bigTaiho', 'rcv_sorting', 'rcv_village', 'rcv_lw'],
            where: {
                Status: status
            }

        });
        if (scoopingLot) {
            res.status(200).json({ message: "Un Rejection Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding Rejection Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //RejectionInitial.tsx
export const getRejectionBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const origin = req.params.origin
        const scoopingLot = await rejectionModel.findAll({
            where: {
                LotNo: lotNO, origin: origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if (scoopingLot) {
            res.status(200).json({ message: "Un Rejection Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding Rejection Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //RejectionCreateForm.tsx
export const CreateEntireRejection = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {



                if ((parseFloat(data.rcv_peelingN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                    + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                    + (data.rcv_village ? parseFloat(data.rcv_village) : 0) + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                    + parseFloat(data.rcv_mayurN)) < (parseFloat(data.issue_packing) + parseFloat(data.issue_village) + parseFloat(data.issue_uncut_unscoop) +
                        parseFloat(data.issue_shell) + parseFloat(data.issue_catelfeed)
                    )) {
                    console.log(parseFloat(data.issue_packing) + parseFloat(data.issue_village) + parseFloat(data.issue_uncut_unscoop) +
                        parseFloat(data.issue_shell) + parseFloat(data.issue_catelfeed))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }
                const RejUpdate = await rejectionModel.update(
                    {
                        date: data.Date,
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                        issue_packing: data.issue_packing,
                        issue_village: data.issue_village,
                        issue_uncut_unscoop: data.issue_uncut_unscoop,
                        issue_shell: data.issue_shell,
                        issue_catelfeed: data.issue_catelfeed,
                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3: data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.rcv_peelingN,
                        issue_add_8: data.rcv_mayurN,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        entry_backlog: (parseFloat(data.rcv_peelingN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                            + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                            + (data.rcv_village ? parseFloat(data.rcv_village) : 0) + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                            + parseFloat(data.rcv_mayurN))
                            - (parseFloat(data.issue_packing) + parseFloat(data.issue_village) + parseFloat(data.issue_uncut_unscoop) +
                                parseFloat(data.issue_shell) + parseFloat(data.issue_catelfeed)
                            ),
                        current_backlog: (parseFloat(data.rcv_peelingN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                            + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                            + (data.rcv_village ? parseFloat(data.rcv_village) : 0) + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                            + parseFloat(data.rcv_mayurN))
                            - (parseFloat(data.issue_packing) + parseFloat(data.issue_village) + parseFloat(data.issue_uncut_unscoop) +
                                parseFloat(data.issue_shell) + parseFloat(data.issue_catelfeed)
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
                if (RejUpdate) {


                    //1. Village Out//

                    const vil_backlog = await villageProduction.findOne({
                        attributes: ['current_backlog', 'rcv_rejection'],
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
                            fromSection: 'Rejection',
                            toSection: 'Village',
                            toSectionBeforeBacklog: vil_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(vil_backlog.dataValues.current_backlog) + parseFloat(data.issue_village),
                            createdBy: feeledBy
                        }, { transaction });
                        if (vil_backlog.dataValues.rcv_rejection) {
                            await villageProduction.update(
                                {
                                    rcv_rejection: sequelize.literal(`rcv_rejection+ ${data.issue_village}`),
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
                                    rcv_rejection: data.issue_village,
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
                            latest_section: 'Rejection',
                            rejectionStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                    );
                    if (lotupdate) {
                        res.status(200).json({ message: "Rejection Entry Made Successfully" });
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
            return res.status(500).json({ message: "Error while creating Rejection Entry", error });
        }
    }
}