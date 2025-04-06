import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import { Op, Sequelize } from "sequelize";
import rejectionEditModel from "../../model/rejectionEditModel";
import rejectionModel from "../../model/rejectionModel";
import villageProduction from "../../model/villageProductionModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import lotoriginmodel from "../../model/lotoriginModel";
import WhatsappMsg from "../../helper/WhatsappMsg";
import villageProductionEdit from "../../model/villageProductionEditModel";
import Mayur from "../../model/mayurModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import hamsaModel from "../../model/hamsamodel";
import RcvVillageModel from "../../model/RcvVillageModel";

// //Village.tsx
export const findEditVillageAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await villageProductionEdit.findAll({ order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditVillageAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const sumOfallVillage = async (req: Request, res: Response) => {


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

        const data = await villageProduction.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_mayur')), 'issue_mayur'],
                [sequelize.fn('sum', sequelize.col('issue_hamsa')), 'issue_hamsa'],
                [sequelize.fn('sum', sequelize.col('issue_bigTaiho')), 'issue_bigTaiho'],
                [sequelize.fn('sum', sequelize.col('issue_rejection')), 'issue_rejection'],
                [sequelize.fn('sum', sequelize.col('issue_outside')), 'issue_outside'],
                [sequelize.fn('sum', sequelize.col('issue_packing')), 'issue_packing'],
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
        const EditData = await villageProductionEdit.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getVillageLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await villageProduction.findAll({

            attributes: ['LotNo', 'origin', 'current_backlog',
                'rcv_peeling', 'rcv_mayur', 'rcv_wholes', 'rcv_lw', 'rcv_bigTaiho', 'rcv_sorting', 'rcv_rejection', 'rcv_dpds'],
            where: {
                Status: status
            }

        });
        if (scoopingLot) {
            res.status(200).json({ message: "Un Village Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding Village Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //VIllageInitial.tsx
export const getVillageBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const origin = req.params.origin
        const scoopingLot = await villageProduction.findAll({
            where: {
                LotNo: lotNO, origin: origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if (scoopingLot) {
            res.status(200).json({ message: "Un Village Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding Village Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //VillageCreateForm.tsx
export const CreateEntireVillage = async (req: Request, res: Response) => {


    try {
        const feeledBy = req.cookies.user;
        const linehumid = req.body.linehumid
        const LotNO = req.body.LotNo

        await sequelize.transaction(async (transaction: any) => {

            for (let data of linehumid) {

                if ((parseFloat(data.rcv_peelingN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                    + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                    + (data.rcv_rejectionN ? parseFloat(data.rcv_rejectionN) : 0) + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                    + parseFloat(data.rcv_mayurN)) < (parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside)
                    )) {
                    console.log(parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                    parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

                }
                const VilUpdate = await villageProduction.update(
                    {
                        date: data.Date,
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                        issue_packing: data.issue_packing,
                        issue_outside: data.issue_outside,
                        issue_mayur: data.issue_mayur,
                        issue_hamsa: data.issue_hamsa,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_rejection: data.issue_rejection,
                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3: data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.rcv_peelingN,
                        issue_add_11: data.rcv_mayurN,
                        issue_add_12: data.rcv_rejectionN,
                        Remarks2: data.out_Type,
                        entry_backlog: (parseFloat(data.rcv_peelingN) + parseFloat(data.rcv_rejectionN)+(data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                            + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                             + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                            + parseFloat(data.rcv_mayurN))
                            - (parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                            parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside)
                            ),
                        current_backlog: (parseFloat(data.rcv_peelingN) + parseFloat(data.rcv_rejectionN)+(data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                        + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                         + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                        + parseFloat(data.rcv_mayurN))
                        - (parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside)
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
                if (VilUpdate) {

                1.// Mayur Out//
                const mayur_backlog = await Mayur.findOne({
                        attributes: ['current_backlog', 'rcv_village'],
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
                            fromSection: 'Village',
                            toSection: 'Mayur',
                            toSectionBeforeBacklog: mayur_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(mayur_backlog.dataValues.current_backlog) + parseFloat(data.issue_mayur),
                            createdBy: feeledBy
                        }, { transaction });
                        if (mayur_backlog.dataValues.rcv_village) {
                            await Mayur.update(
                                {
                                    rcv_village: sequelize.literal(`rcv_village+ ${data.issue_mayur}`),
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
                                    rcv_village: data.issue_mayur,
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

                2.// Rejection Out//

                const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_village'],
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
                        fromSection:'Village',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_village){
                        await rejectionModel.update(
                            { 
                                rcv_village:sequelize.literal(`rcv_village+ ${data.issue_rejection}`),
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
                                rcv_village:data.issue_rejection,
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


                3. // BigTaiho Out//

                const bigT_backlog = await bigTaihoModel.findOne({
                        attributes: ['current_backlog', 'rcv_village'],
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
                            fromSection: 'Village',
                            toSection: 'BigTaiho',
                            toSectionBeforeBacklog: bigT_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog: parseFloat(bigT_backlog.dataValues.current_backlog) + parseFloat(data.issue_bigTaiho),
                            createdBy: feeledBy
                        }, { transaction });
                        if (bigT_backlog.dataValues.rcv_village) {
                            await bigTaihoModel.update(
                                {
                                    rcv_village: sequelize.literal(`rcv_village+ ${data.issue_bigTaiho}`),
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
                                    rcv_village: data.issue_bigTaiho,
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


                4.// Hamsa Out//

                    const hamsa_backlog = await hamsaModel.findOne({
                    attributes: ['current_backlog','rcv_village'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(hamsa_backlog)
                if (hamsa_backlog && hamsa_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_hamsa,
                        issueid:1,
                        date:data.Date,
                        fromSection:'Village',
                        toSection:'Hamsa',
                        toSectionBeforeBacklog:hamsa_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(hamsa_backlog.dataValues.current_backlog)+parseFloat(data.issue_hamsa),
                        createdBy: feeledBy
                     },{transaction});
                     if(hamsa_backlog.dataValues.rcv_village){
                        await hamsaModel.update(
                            { 
                                rcv_village:sequelize.literal(`rcv_village+ ${data.issue_hamsa}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_hamsa}`)
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
                        await hamsaModel.update(
                            { 
                                rcv_village:data.issue_hamsa,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_hamsa}`)
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
                    res.status(500).json({ message: "Error In Creating Hamsa Transaction History" });
                    throw new Error('Transaction Aborted')
                } 

                
                    const lotupdate = await lotoriginmodel.update(
                        {
                            latest_section: 'Village',
                            villageStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                    );
                    if (lotupdate) {
                        res.status(200).json({ message: "Village Entry Made Successfully" });
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
            return res.status(500).json({ message: "Error while creating Village Entry", error });
        }
    }
}

// //VillageTable.tsx
export const SearchRCNVillage = async (req: Request, res: Response) => {
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
             rcnEntries = await villageProduction.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await villageProduction.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Village Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const GatedataFind = async (req: Request, res: Response) => {
    try {
        const { GateID } = req.body;
        

        let where
    
            where = {
                [Op.and]: [
                    { gatePassNo: { [Op.like]: `%${GateID}%` } },
                  
                   
                    { editStatus: { [Op.notLike]: 'Pending' } },
                ]
            }

        
      
        const skuData = await RcvVillageModel.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('gatePassNo')), 'gatePassNo']],
            where
          });
        if (!skuData) return res.status(404).json({ message: "GatePass Not found" });
        return res.status(200).json({ skuData });
    } catch (error) {
        return res.status(500).json({ message: "internal error while finding GatePass data" });
    }
}


export const linkGatePass = async (req: Request, res: Response) => {
    try {
        const { id,gatepassId } = req.body;
        let skuData = await RcvVillageModel.findOne({ where: { gatePassNo:gatepassId } });
        if(!skuData ){
            return res.status(500).json({ message: "GatePass No Does Not Exist" });
        }
        else{
            const updateVillageGate = await villageProduction.update(
                {     
                    Remarks:gatepassId,
                    GatePassStatus:1
                  
                },
                {
                    where: {
                        id
                    }
                }
            );
            if(updateVillageGate){
                return res.status(201).json({ message: `GatePass ${gatepassId} has been linked successfully` });
            }
            else{
                return res.status(500).json({ message: "internal error while linking GatePass with Lot" });
            }
        }

       
    } catch (error) {
        return res.status(500).json({ message: "internal error while linking GatePass data" });
    }
}


export const updateEntireVIllage= async (req: Request, res: Response) => {
    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
         
            if ((parseFloat(data.rcv_peelingN) + (data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
            + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
            + (data.rcv_rejectionN ? parseFloat(data.rcv_rejectionN) : 0) + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
            + parseFloat(data.rcv_mayurN)) < (parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside)
            )) {
            console.log(parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
            parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside))
            res.status(500).json({ message: "Backlog can't be Greater Than Input" });
            throw new Error('Transaction Aborted due to negative value')

        }
            
            await villageProductionEdit.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                    altid:data.alt_id,
                    mixingLot:data.mixingLot,

                    rcv_peeling: data.rcv_peeling,
                    rcv_rejection: data.rcv_rejection,
                    rcv_dpds: data.rcv_dpds,
                    rcv_lw: data.rcv_lw,
                    rcv_sorting: data.rcv_sorting,
                    rcv_mayur: data.rcv_mayur,
                    rcv_bigTaiho:data.rcv_bigTaiho,
                    rcv_wholes: data.rcv_wholes,

         
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    issue_packing: data.issue_packing,
                    issue_outside: data.issue_outside,
                    issue_mayur: data.issue_mayur,
                    issue_hamsa: data.issue_hamsa,
                    issue_bigTaiho: data.issue_bigTaiho,
                    issue_rejection: data.issue_rejection,
                    issue_add_1: data.issue_add_1,
                    issue_add_2: data.issue_add_2,
                    issue_add_3: data.issue_add_3,
                    issue_add_4: data.issue_add_4,
                    issue_add_5: data.issue_add_5,
                    issue_add_6: data.issue_add_6,
                    issue_add_7: data.issue_add_7,
                    issue_add_8: data.issue_add_8,
                    issue_add_9: data.issue_add_9,
                    issue_add_10: data.rcv_peelingN,
                    issue_add_11: data.rcv_mayurN,
                    issue_add_12: data.rcv_rejectionN,
                    Remarks2: data.out_Type,
                    entry_backlog: (parseFloat(data.rcv_peelingN) + parseFloat(data.rcv_rejectionN)+(data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                        + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                         + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                        + parseFloat(data.rcv_mayurN))
                        - (parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                        parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside)
                        ),
                    current_backlog: (parseFloat(data.rcv_peelingN) + parseFloat(data.rcv_rejectionN)+(data.rcv_wholes ? parseFloat(data.rcv_wholes) : 0) + (data.rcv_dpds ? parseFloat(data.rcv_dpds) : 0)
                    + (data.rcv_lw ? parseFloat(data.rcv_lw) : 0) + (data.rcv_sorting ? parseFloat(data.rcv_sorting) : 0)
                     + (data.rcv_bigTaiho ? parseFloat(data.rcv_bigTaiho) : 0)
                    + parseFloat(data.rcv_mayurN))
                    - (parseFloat(data.issue_packing) + parseFloat(data.issue_mayur) + parseFloat(data.issue_hamsa) +
                    parseFloat(data.issue_bigTaiho) + parseFloat(data.issue_rejection) + parseFloat(data.issue_outside)
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
            const lotupdate= await villageProduction.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    const data = await WhatsappMsg("Village Production", feeledBy,"modify_request","Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of Village Entry Raised successfully" });
               
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

export const approveVillage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await villageProductionEdit.findOne({
            where: {
                id
            }
        }) as any;
        
        if (!data) {
            return res.status(400).json({ message: "Village Edit Entry not found" });
        }
        else{
            

            const transferMayurdata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'Village',
                    toSection: 'Mayur'
                }
            }) as any

            const transferBigTaihodata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'Village',
                    toSection: 'BigTaiho'
                }
            }) as any

            const transferRejectiondata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'Village',
                    toSection: 'Rejection'
                }
            }) as any

            const transferHamsadata = await sectionTransfer.findOne({
                where: {
                    issueid: data.altid,
                    LotNo: data.LotNo,
                    origin: data.origin,
                    fromSection: 'Village',
                    toSection: 'Hamsa'
                }
            }) as any


            if(transferMayurdata && transferBigTaihodata && transferRejectiondata && transferHamsadata){
                await sequelize.transaction(async (transaction: any) => {

                    const vilEdit = await villageProduction.update({
                        date: data.Date,
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                        issue_packing: data.issue_packing,
                        issue_outside: data.issue_outside,
                        issue_mayur: data.issue_mayur,
                        issue_hamsa: data.issue_hamsa,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_rejection: data.issue_rejection,
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
                        issue_add_11: data.issue_add_11,
                        issue_add_12: data.issue_add_12,
                        Remarks2: data.Remarks2,
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
                    if(vilEdit){
                        //console.log(transferDPDSdata)
                        if (parseFloat(transferMayurdata.amount) !== parseFloat(data.issue_mayur)) {
                            console.log('Needs Update In Mayur')
                            const difference_mayur = parseFloat(data.issue_mayur) - parseFloat(transferMayurdata.amount)
                            console.log(difference_mayur)
                            const backlog = await Mayur.findOne({
                                attributes: ['current_backlog', 'rcv_village'],
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
                                        rcv_village: sequelize.literal(`rcv_village+ ${difference_mayur}`),
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
                                attributes: ['current_backlog', 'rcv_village'],
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
                                        rcv_village: sequelize.literal(`rcv_village+ ${difference_bigT}`),
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
                                attributes: ['current_backlog','rcv_village'],
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
                                        rcv_village: sequelize.literal(`rcv_village+ ${difference_rejection}`),
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

                        if(parseFloat(transferHamsadata.amount)!==parseFloat(data.issue_hamsa)){
                            console.log('Needs Update In Hamsa')
                            const difference_hamsa=parseFloat(data.issue_hamsa)-parseFloat(transferHamsadata.amount)
                            console.log(difference_hamsa)
                            const backlog = await hamsaModel.findOne({
                                attributes: ['current_backlog','rcv_village'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await hamsaModel.update(
                                    {
                                        rcv_village: sequelize.literal(`rcv_village+ ${difference_hamsa}`),
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
                                    amount:data.issue_hamsa,
                                    toSectionBeforeBacklog:transferHamsadata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferHamsadata.toSectionBeforeBacklog)+parseFloat(data.issue_hamsa)
                        
                                }, {
                                    where: {
                                        id:transferHamsadata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated Hamsa Entry Not Found" });
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
                        await villageProductionEdit.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of Village Entry is Approved Successfully" });
                    }
                    
                })
            }
            else{
                return res.status(400).json({ message: "Village Transfer Entry is not found" });
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectVillage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await villageProduction.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Village Entry not found" });
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
        const rcnEdit = await villageProductionEdit.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Village Entry not found" });
        }
        return res.status(200).json({ message: "Village Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}