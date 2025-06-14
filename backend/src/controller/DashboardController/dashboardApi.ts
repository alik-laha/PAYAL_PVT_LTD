
import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import Mayur from "../../model/mayurModel";
import { Op } from "sequelize";
import hamsaModel from "../../model/hamsamodel";
import WholesModel from "../../model/wholesModel";
import LWModel from "../../model/lowerGradeModel";
import DPDS from "../../model/dpdsmodel";
import SortingModel from "../../model/sortingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import villageProduction from "../../model/villageProductionModel";
import rejectionModel from "../../model/rejectionModel";
import RcnPeeling from "../../model/peelingModel";
import RcnBorma from "../../model/bormaModel";
import Humidifier from "../../model/humidfierModel";
import RcnScooping from "../../model/scoopingModel";
import RcnBoiling from "../../model/RcnBoilingModel";
import { dashboardBasic } from "../../Cronjobs/dashboardBasic";


export const infoOfallSection = async (req: Request, res: Response) => {

    
    try {

        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0,0,0,0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else{
            targetDate = new Date(`${Year}-04-01`);
        }
        
        targetDate.setHours(0,0,0,0)
        if(today.getHours()<5 || (today.getHours()===5 && today.getMinutes()<=30)){
            today.setHours(today.getHours()+5);
            today.setMinutes(today.getMinutes()+30);
        }

       

       const latestLotMayur: any = await Mayur.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestVLotMayur: any = await Mayur.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogMayurdata = await Mayur.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], latest:1
            }
        });




        const latestLothamsa: any = await hamsaModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestVLothamsa: any = await hamsaModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backloghamsadata = await hamsaModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });




        const latestLotwholes: any = await WholesModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotwholes: any = await WholesModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogwholesdata = await WholesModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });




        const latestLotlw: any = await LWModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotlw: any = await LWModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backloglwdata = await LWModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ], latest:1
            }
        });




        const latestLotdpds: any = await DPDS.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotdpds: any = await DPDS.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogdpdsdata = await DPDS.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });




        const latestLotsorting: any = await SortingModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotsorting: any = await SortingModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogsortingdata = await SortingModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });



        const latestLotbigT: any = await bigTaihoModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotbigT: any = await bigTaihoModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogbigTdata = await bigTaihoModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });


        const latestLotvil: any = await villageProduction.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotvil: any = await villageProduction.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogvildata = await villageProduction.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });



        const latestLotrej: any = await rejectionModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotrej: any = await rejectionModel.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogrejdata = await rejectionModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('current_backlog')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],latest:1
            }
        });


        const latestLotpeel: any = await RcnPeeling.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } }
                ]
                
            }
        }) as any;

        const latestvLotpeel: any = await RcnPeeling.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.like]: '%V%' } }
                ]
                
            }
        }) as any;

        const backlogpeeldata = await RcnPeeling.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('TotalInput')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],Status:0
            }
        });

        const latestLotborma: any = await RcnBorma.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                BormaStatus:1,
                
                LotNo: { [Op.notLike]: '2025-999' } ,
                   
                
                
            }
        }) as any;

        const backlogbormadata = await RcnBorma.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('InputWholes')), 'current_backlog1'],
                [sequelize.fn('sum', sequelize.col('InputPieces')), 'current_backlog2']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],BormaStatus:0
            }
        });

        const latestLothumid: any = await Humidifier.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                Status:1,
                
                LotNo: { [Op.notLike]: '2025-999' } ,
                   
                
                
            }
        }) as any;

        const backloghumiddata = await Humidifier.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('TotalInput')), 'current_backlog']
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],Status:0
            }
        });

        const latestLotscoop: any = await RcnScooping.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
                scoopStatus:1,
                
                LotNo: { [Op.notLike]: '2025-999' } ,
                   
                
                
            }
        }) as any;

        const backlogscoopdata = await RcnScooping.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('Opening_Qty')), 'current_backlog1'],
                [sequelize.fn('sum', sequelize.col('Receiving_Qty')), 'current_backlog2']
               
            ],
            where: {
                [Op.or]: [
                    { editStatus: "Approved" },
                    { editStatus: "NA" }
                ],scoopStatus:0
            }
        });

        const latestLotboil: any = await RcnBoiling.findOne({
            attributes: 
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where:{
              
                
                LotNo: { [Op.notLike]: '2025-999' } ,
                   
                
                
            }
        }) as any;
      



        if (backlogMayurdata) {
            return res.status(200).json({ backlogMayurdata,latestLotMayur,latestVLotMayur,
                latestLothamsa,latestVLothamsa,backloghamsadata,
                latestLotdpds,latestvLotdpds,backlogdpdsdata,
                latestLotsorting,latestvLotsorting,backlogsortingdata,
                latestLotwholes,latestvLotwholes,backlogwholesdata,
                latestLotlw,latestvLotlw,backloglwdata,
                latestLotbigT,latestvLotbigT,backlogbigTdata,
                latestLotvil,latestvLotvil,backlogvildata,
                latestLotrej,latestvLotrej,backlogrejdata,latestLotpeel,latestvLotpeel,backlogpeeldata,
                latestLotborma,backlogbormadata,
                latestLothumid,backloghumiddata,latestLotscoop,backlogscoopdata,latestLotboil
                
             });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}

export const manualdashboardbasicUpdate = async (req: Request, res: Response) => {
    try {
        await dashboardBasic();
        res.status(200).json({ message: 'Information Sent In whatsapp' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send Report in whatsappa' });
    }
};