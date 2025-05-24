import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import rejectionEditModel from "../../model/rejectionEditModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import lotoriginmodel from "../../model/lotoriginModel";
import WhatsappMsg from "../../helper/WhatsappMsg";
import mixingModel from "../../model/mixingModel";

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
             const Sumdata = await rejectionModel.findAll({
                                            attributes: [
                                       
                                                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
                                              
                                               
                                            ],
                                            where: {
                                                [Op.or]: [
                                                    { editStatus: "Approved" },
                                                    { editStatus: "NA" }
                                                ], date: {
                                                    [Op.between]: [targetDate, today]
                                                },latest:1
                                            }
                                        });
        const EditData = await rejectionEditModel.count()
        if (data && Sumdata) {
            return res.status(200).json({ data, EditData,Sumdata });
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

// //LWTable.tsx
export const SearchRCNRejection = async (req: Request, res: Response) => {
    try {
        const { searchitem,fromDate, toDate, origin} = req.body;
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
        if(limit===0 && offset===0){
             rcnEntries = await rejectionModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await rejectionModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Rejection Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const updateEntireRejection= async (req: Request, res: Response) => {
    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
         
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
            
            await rejectionEditModel.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                    altid:data.alt_id,
                    mixingLot:data.mixingLot,

                    rcv_peeling: data.rcv_peeling,
                    rcv_village: data.rcv_village,
                    rcv_dpds: data.rcv_dpds,
                    rcv_lw: data.rcv_lw,
                    rcv_sorting: data.rcv_sorting,
                    rcv_mayur: data.rcv_mayur,
                    rcv_bigTaiho:data.rcv_bigTaiho,
                    rcv_wholes: data.rcv_wholes,

         
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
                    CreatedBy: feeledBy,
                    editStatus:'Pending'
                },
                {
                    transaction
                }
            );
            
            await lotoriginmodel.update(
                { 
                    editStatus:'Pending',
                 
                },
                {
                    where: {
                        lotNo:LotNO,
                        origin:data.origin
                    },transaction
                }
            );
            const lotupdate= await rejectionModel.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    const data = await WhatsappMsg("Rejection", feeledBy,"modify_request","Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of Rejection Entry Raised successfully" });
               
                }
                else{
                    console.log('No Need For Update')
                }

        }
       
    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while Editing Rejection Entry" ,error});
        }
    }
    


}

export const approveRejection = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await rejectionEditModel.findOne({
            where: {
                id
            }
        }) as any;
        
        if (!data) {
            return res.status(400).json({ message: "Rejection Edit Entry not found" });
        }
        else{
            

            const transferVildata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Rejection',
                    toSection:'Village'
                }
            }) as any


            if(transferVildata){
                await sequelize.transaction(async (transaction: any) => {

                    const BigTEdit = await rejectionModel.update({
                      date: data.date,
                        noOfdayOperators: data.noOfdayOperators,
                        noOfnightOperators: data.noOfnightOperators,
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
                    issue_add_7: data.issue_add_7,
                    issue_add_8: data.issue_add_8,
                    issue_add_9: data.issue_add_9,
                    issue_add_10: data.issue_add_10, 
                    entry_backlog:data.entry_backlog,
                    current_backlog:data.current_backlog,
                    CreatedBy: data.CreatedBy,
                    editStatus: "Approved",
                    modifiedBy:approvedBy,
                    }, {
                        where: {
                            id
                        }, transaction
                    });
                    if(BigTEdit){
                        //console.log(transferDPDSdata)

                        if(parseFloat(transferVildata.amount)!==parseFloat(data.issue_village)){
                            console.log('Needs Update In Village')
                            const difference_vil=parseFloat(data.issue_village)-parseFloat(transferVildata.amount)
                            console.log(difference_vil)
                            const backlog = await villageProduction.findOne({
                                attributes: ['current_backlog','rcv_rejection','issue_add_12'],
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
                                        rcv_rejection: sequelize.literal(`rcv_rejection+ ${difference_vil}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_vil}`),
                                        issue_add_12: backlog.dataValues.issue_add_12 ?
                                        sequelize.literal(`issue_add_12+ ${difference_vil}`):backlog.dataValues.issue_add_12
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
                                editStatus:'NA',
                             
                            },
                            {
                                where: {
                                    lotNo:LotNo,
                                    origin:origin
                                },transaction
                            }
                        );
                        await rejectionEditModel.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of Rejection Entry is Approved Successfully" });
                    }
                    
                })
            }
            else{
                return res.status(400).json({ message: "Rejection Transfer Entry is not found" });
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectRejection = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await rejectionModel.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Rejection Entry not found" });
        }
        await lotoriginmodel.update(
            { 
                editStatus:'NA',
             
            },
            {
                where: {
                    lotNo:LotNo,
                    origin:origin
                }
            }
        );
        const rcnEdit = await rejectionEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Rejection Entry not found" });
        }
        return res.status(200).json({ message: "Rejection Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}

export const SearchRCNRejectionMix = async (req: Request, res: Response) => {
    try {
        const { lotNo, origin} = req.body;
       
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
        
             rcnEntries = await rejectionModel.findOne({
                attributes: ['id','current_backlog','rcv_dpds','rcv_sorting','rcv_bigTaiho','rcv_village','rcv_peeling',
                    'rcv_mayur','rcv_lw','rcv_wholes','editStatus','Status','issue_add_7','issue_add_8'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const CreateMixRejection = async (req: Request, res: Response) => {

    try {
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid = req.body.fsourceid;
        const sourcelot = req.body.fsourcelot;
        const sourceorigin = req.body.fsourceorigin;
        const source_rcv_peeling = req.body.fsourcercv_peeling;
        const source_rcv_sorting = req.body.fsourcercv_sorting;
        const source_rcv_dpds = req.body.fsourcercv_dpds;
        const source_rcv_village = req.body.fsourcercv_village;
        const source_rcv_mayur = req.body.fsourcercv_mayur;
        const source_rcv_bigTaiho = req.body.fsourcercv_bigTaiho;
        const source_rcv_lw = req.body.fsourcercv_lw;
        const source_rcv_wholes = req.body.fsourcercv_wholes;
        const destrcv_status = req.body.destrcv_status;

        const source_backlog = req.body.fsourcebacklog;

        const transfer_amount = req.body.amount

        const destid = req.body.destid;
        const destlot = req.body.destlot;
        const destorigin = req.body.destorigin;
        const dest_rcv_peeling = req.body.destrcv_peeling;
        const dest_rcv_sorting = req.body.destrcv_sorting;
        const dest_rcv_dpds = req.body.destrcv_dpds;
        const dest_rcv_village = req.body.destrcv_village;
        const dest_rcv_mayur = req.body.destrcv_mayur;
        const dest_rcv_bigTaiho = req.body.destrcv_bigTaiho;
        const dest_rcv_lw = req.body.destrcv_lw;
        const dest_rcv_wholes = req.body.destrcv_wholes;

        const dest_backlog = req.body.destbacklog;

        const b_soucre_backlog = req.body.bsourcebacklog;
        const b_dest_backlog = req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourcedata = await rejectionModel.findOne({
                attributes: ['rcv_mayur', 'issue_add_7','rcv_peeling', 'issue_add_8'],
                where: {
                    id: sourceid
                },
            });

            let sourceupdate
            if (sourcedata) {
                const peeldiff = parseFloat(sourcedata.dataValues.issue_add_7) - parseFloat(source_rcv_peeling)
                const totbeforeborma = parseFloat(sourcedata.dataValues.rcv_peeling) - peeldiff
                const totafterborma = parseFloat(source_rcv_peeling)

                const mayurdiff = parseFloat(sourcedata.dataValues.issue_add_8) - parseFloat(source_rcv_mayur)
                const totbeforebormamayur = parseFloat(sourcedata.dataValues.rcv_mayur) - mayurdiff
                const totafterbormamayur = parseFloat(source_rcv_mayur)

                sourceupdate = await rejectionModel.update(
                    {
                        rcv_peeling: sequelize.literal(`rcv_peeling- ${peeldiff}`),
                        issue_add_3: ((totbeforeborma - totafterborma) / totbeforeborma) * 100,
                        rcv_mayur: sequelize.literal(`rcv_mayur- ${mayurdiff}`),
                        issue_add_6: ((totbeforebormamayur - totafterbormamayur) / totbeforebormamayur) * 100,

                        issue_add_7: source_rcv_peeling,
                        issue_add_8: source_rcv_mayur,
                        rcv_sorting: source_rcv_sorting,
                        rcv_dpds: source_rcv_dpds,
                        rcv_village: source_rcv_village,
                        rcv_bigTaiho: source_rcv_bigTaiho,
                   
                        rcv_lw: source_rcv_lw,
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
            const destdata = await rejectionModel.findOne({
                attributes: ['mixingLot', 'rcv_mayur', 'issue_add_7','rcv_peeling', 'issue_add_8'],
                where: {
                    id: destid

                },

            });

            if (destdata) 
            {
                let destupdate
                if (Number(destrcv_status) === 0) {
                    destupdate = await rejectionModel.update(
                        {
                            rcv_peeling: dest_rcv_peeling,
                            rcv_sorting: dest_rcv_sorting,
                            rcv_dpds: dest_rcv_dpds,
                            rcv_village: dest_rcv_village,
                            rcv_mayur: dest_rcv_mayur,
                            rcv_bigTaiho: dest_rcv_bigTaiho,
                            rcv_lw: dest_rcv_lw,
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
                    const peeldiffD = parseFloat(dest_rcv_peeling) - parseFloat(destdata.dataValues.issue_add_7)
                    const totbeforebormaD = parseFloat(destdata.dataValues.rcv_peeling) + peeldiffD
                    const totafterbormaD = parseFloat(dest_rcv_peeling)

                    const mayurdiffD =  parseFloat(dest_rcv_mayur)-parseFloat(destdata.dataValues.issue_add_8)
                const totbeforebormamayurD = parseFloat(destdata.dataValues.rcv_mayur) + mayurdiffD
                const totafterbormamayurD = parseFloat(dest_rcv_mayur)


                    destupdate = await rejectionModel.update(
                        {
                            rcv_peeling: sequelize.literal(`rcv_peeling+ ${peeldiffD}`),
                            issue_add_3: ((totbeforebormaD - totafterbormaD) / totbeforebormaD) * 100,

                            rcv_mayur: sequelize.literal(`rcv_mayur+ ${mayurdiffD}`),
                            issue_add_6: ((totbeforebormamayurD - totafterbormamayurD) / totbeforebormamayurD) * 100,

                            issue_add_7: dest_rcv_peeling,
                            issue_add_8:dest_rcv_mayur,
                            rcv_sorting: dest_rcv_sorting,
                            rcv_dpds: dest_rcv_dpds,
                            rcv_village: dest_rcv_village,
                            rcv_bigTaiho: dest_rcv_bigTaiho,
                            rcv_lw: dest_rcv_lw,
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
                            Section: 'Rejection',
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