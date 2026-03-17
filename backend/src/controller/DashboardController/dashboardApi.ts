
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
import RcnPrimary from "../../model/RcnEntryModel";
import RcnAllScooping from "../../model/scoopingAllmodel";
import orderPrimaryModel from "../../model/orderModel";
import orderMappingModel from "../../model/orderMappingModel";
import RcvVillageModel from "../../model/RcvVillageModel";
import RcvVillageInModel from "../../model/RcvVillageInModel";
import LotNo from "../../model/lotNomodel";
import lotoriginmodel from "../../model/lotoriginModel";
import {  fn, col } from "sequelize";
import User from "../../model/userModel";
import Employee from "../../model/employeeModel";
import gatePassMaster from "../../model/gatePassMasterModel";
import qcKOR from "../../model/qcKorModel";

const IST_OFFSET_MIN = 5 * 60 + 30;

const toIST = (date: Date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + IST_OFFSET_MIN);
  return d;
};

const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};


export const infoOfallSection = async (req: Request, res: Response) => {


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



        const latestLotMayur: any = await Mayur.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                    { LotNo: { [Op.notLike]: '%R%' } },

                ]

            }
        }) as any;

        const latestVLotMayur: any = await Mayur.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });




        const latestLothamsa: any = await hamsaModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestVLothamsa: any = await hamsaModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });




        const latestLotwholes: any = await WholesModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotwholes: any = await WholesModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });




        const latestLotlw: any = await LWModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotlw: any = await LWModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });




        const latestLotdpds: any = await DPDS.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotdpds: any = await DPDS.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });




        const latestLotsorting: any = await SortingModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotsorting: any = await SortingModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });



        const latestLotbigT: any = await bigTaihoModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotbigT: any = await bigTaihoModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });


        const latestLotvil: any = await villageProduction.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotvil: any = await villageProduction.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });



        const latestLotrej: any = await rejectionModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotrej: any = await rejectionModel.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], latest: 1
            }
        });


        const latestLotpeel: any = await RcnPeeling.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
                [Op.and]: [
                    { LotNo: { [Op.notLike]: '2025-999' } },
                    { LotNo: { [Op.notLike]: '%V%' } },
                     { LotNo: { [Op.notLike]: '%R%' } },
                ]

            }
        }) as any;

        const latestvLotpeel: any = await RcnPeeling.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,
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
                ], Status: 0
            }
        });

        const latestLotborma: any = await RcnBorma.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                BormaStatus: 1,

                LotNo: { [Op.notLike]: '2025-999' },



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
                ], BormaStatus: 0
            }
        });

        const latestLothumid: any = await Humidifier.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                Status: 1,

                LotNo: { [Op.notLike]: '2025-999' },



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
                ], Status: 0
            }
        });

        const latestLotscoop: any = await RcnScooping.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {
                scoopStatus: 1,

                LotNo: { [Op.notLike]: '2025-999' },



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
                ], scoopStatus: 0
            }
        });

        const latestLotboil: any = await RcnBoiling.findOne({
            attributes:
                ['LotNo']
            ,
            order: [['LotNo', 'DESC']],
            where: {


                LotNo: { [Op.notLike]: '2025-999' },



            }
        }) as any;




        if (backlogMayurdata) {
            return res.status(200).json({
                backlogMayurdata, latestLotMayur, latestVLotMayur,
                latestLothamsa, latestVLothamsa, backloghamsadata,
                latestLotdpds, latestvLotdpds, backlogdpdsdata,
                latestLotsorting, latestvLotsorting, backlogsortingdata,
                latestLotwholes, latestvLotwholes, backlogwholesdata,
                latestLotlw, latestvLotlw, backloglwdata,
                latestLotbigT, latestvLotbigT, backlogbigTdata,
                latestLotvil, latestvLotvil, backlogvildata,
                latestLotrej, latestvLotrej, backlogrejdata, latestLotpeel, latestvLotpeel, backlogpeeldata,
                latestLotborma, backlogbormadata,
                latestLothumid, backloghumiddata, latestLotscoop, backlogscoopdata, latestLotboil

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


export const factorymanagerDashboard = async (req: Request, res: Response) => {
    try {

        const {LotNo,fromDate,toDate,fy,type,origin}=req.body
        
        let today;
        let targetDate;
        if(type==='search'){
            if(fromDate && toDate && fy === '2025-26')
            {
                targetDate=new Date(fromDate)
                targetDate.setHours(0, 0, 0, 0)
                today=new Date(toDate)
                today.setHours(today.getHours() + 5);
                today.setMinutes(today.getMinutes() + 30);
            }
            if (fy === '2025-26' && !fromDate && !toDate) {
                
                targetDate = new Date(`2025-04-01`);
                today = new Date(`2026-03-31`);
                targetDate.setHours(0, 0, 0, 0)
                today.setHours(today.getHours() + 5);
                today.setMinutes(today.getMinutes() + 30);
                
            }
            if (fy === '2024-25' && !fromDate && !toDate) {
                
                targetDate = new Date(`2024-04-01`);
                today = new Date(`2025-03-31`);
                targetDate.setHours(0, 0, 0, 0)
                today.setHours(today.getHours() + 5);
                today.setMinutes(today.getMinutes() + 30);
                
            }
        }
        else {
            today = new Date();
            let Year = today.getFullYear()
            const compareDate = new Date(`${Year}-04-01`);
            compareDate.setHours(0, 0, 0, 0)
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
        }
        
        //1.Origin Wise Stock///////////////////////////////////////////////////////////////////////////
        const AllOriginRcnPrimary = await RcnPrimary.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.literal('noOfBags * 80')), 'totalBags']
            ],
            where: {
                rcnStatus: 'QC Approved',
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'NA' }
                ],
                date: {
                    [Op.between]: [targetDate, today]
                }
            },
            group: ['origin']
        });
        // Convert to plain array
        // Convert Sequelize result to plain objects
        const originData = AllOriginRcnPrimary.map(item => item.toJSON());

        // Convert array to key-value object
        const Stock = originData.reduce((acc, item) => {
            acc[item.origin] = Number(item.totalBags);
            return acc;
        }, {});

        const stockString = Object.entries(Stock)
            .map(([k, v]) => `${k}:${v}`)
            .join(',\n');

        //2.Total Stock/////////////////////////////////////////////////////////////////////////////
        const ReceivingTotal = await RcnPrimary.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('noOfBags * 80')), 'Total_Receiving']
            ],
            where: {
                rcnStatus: 'QC Approved',
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                date: { [Op.between]: [targetDate, today] }
            }
        });
        //3.Origin Wise Boiling////////////////////////////////////////////////////////////////////
        const AllOriginBoiling = await RcnBoiling.findAll({
            attributes: [
                'origin',
                [sequelize.fn('sum', sequelize.col('Size')), 'totalKg']
            ],
            where: {
                
                [Op.or]: [
                    { editStatus: 'Approved' },
                    { editStatus: 'NA' }
                ],
                date: {
                    [Op.between]: [targetDate, today]
                }
            },
            group: ['origin']
        });

        // Convert to plain array
        // Convert Sequelize result to plain objects
        const BoilingData = AllOriginBoiling.map(item => item.toJSON());

        // Convert array to key-value object
        const BoilingStock = BoilingData.reduce((acc, item) => {
            acc[item.origin] = Number(item.totalKg);
            return acc;
        }, {});

        const BoilingstockString = Object.entries(BoilingStock)
            .map(([k, v]) => `${k}:${v}`)
            .join(',\n');

        //4.Total Boiling ///////////////////////////////////////////////////////////////////////////////////   
        const BoilingTotal = await RcnBoiling.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Size')), 'Total_Boiling']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                date: { [Op.between]: [targetDate, today] }
            }
        });
        //4.Total Village Outside ///////////////////////////////////////////////////////////////////////////////////   
        const Ville_Outside_Gatepass = await RcvVillageModel.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('totalWt')), 'Final_Village_Out']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'N/A' }],
                recevingDate: { [Op.between]: [targetDate, today] }
            }
        });
        //4.Total Village Outside ///////////////////////////////////////////////////////////////////////////////////   
        const Ville_Outside_Production = await villageProduction.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('issue_outside')), 'Production_Village_Out']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                date: { [Op.between]: [targetDate, today] }
            }
        });

        //4.Total Village Outside ///////////////////////////////////////////////////////////////////////////////////   
        const Ville_Inside_gatepass = await RcvVillageInModel.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('totalWt')), 'Village_In']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'N/A' }],
                recevingDate: { [Op.between]: [targetDate, today] }
            }
        });

        const village_out_prod = Number(Ville_Outside_Production?.dataValues.Production_Village_Out) || 0;
        const village_out_gate = Number(Ville_Outside_Gatepass?.dataValues.Final_Village_Out) || 0;
        const village_pending = village_out_prod - village_out_gate;
        //5.Total Uncut /////////////////////////////////////////////////////////////////////////////////// 
        const scoopingUncut = await RcnAllScooping.findOne({
            attributes: [
                ['Uncut', 'Scooping_Uncut'] // Alias Uncut as scooping_uncut
            ],
            where: {
                LotNo, origin,
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
            }
        });

        //6.Total Broken ///////////////////////////////////////////////////////////////////////////////////  
        const scoopingBroken = await RcnScooping.findOne({
            attributes: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('Trolley_Broken')), 2), 'Scooping_Broken']
            ],
            where: {
                LotNo,
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                
            }
        });

        const scoopingUncutData = scoopingUncut?.dataValues || { Scooping_Uncut: 0 };
        const scoopingBrokenData = scoopingBroken?.dataValues || { Scooping_Broken: 0 };

        //6.Peeling  ///////////////////////////////////////////////////////////////////////////////////  
        const PeelingDetails = await RcnPeeling.findOne({
            
            where: {
                LotNo,
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                
            }
        });
        const totalInput = Number(PeelingDetails?.dataValues.TotalInput) || 0;
        const husk = Number(PeelingDetails?.dataValues.Husk) || 0;
        const denominator = totalInput - husk;

        let Peeling_Unpeel = 0;
        let Peeling_Chura = 0;
        let Peeling_Broken = 0;

        if (denominator > 0) {
            Peeling_Unpeel = ((Number(PeelingDetails?.dataValues.UnpeelPiece) || 0) +(Number(PeelingDetails?.dataValues.WholesUnpeel) || 0))/ denominator;
            Peeling_Chura = (Number(PeelingDetails?.dataValues.Big_Taiho) || 0) / denominator;
            Peeling_Broken = ((Number(PeelingDetails?.dataValues.UnpeelPiece) || 0) 
            +(Number(PeelingDetails?.dataValues.DP) || 0)+(Number(PeelingDetails?.dataValues.DS) || 0)
            +(Number(PeelingDetails?.dataValues.DP1) || 0)+(Number(PeelingDetails?.dataValues.JJH) || 0)
            +(Number(PeelingDetails?.dataValues.SJH) || 0)+(Number(PeelingDetails?.dataValues.SJH1) || 0)
            +(Number(PeelingDetails?.dataValues.JH1) || 0)+(Number(PeelingDetails?.dataValues.JK_K) || 0)
            +(Number(PeelingDetails?.dataValues.SP1) || 0))/ denominator;

        }

         //7.Order  ///////////////////////////////////////////////////////////////////////////////////
        const PendingApproval = await orderPrimaryModel.count({ col:'orderID',
                where: { ordApproveStatus: { [Op.like]: 'Pending' }} });
        const PendingMapping = await orderMappingModel.count({ col:'orderID',
                where: { mappingStatus: 0 } });
        const PendingPacking = await orderPrimaryModel.count({ col:'orderID',
                    where: { actualquantity: { [Op.eq]: 0 } } });



        const extraData = {
            Origin_Wise_Receiving:stockString,
            Origin_Wise_Boiling:BoilingstockString,
        };
        const extraData2 = {
            Peeling_Unpeel: Peeling_Unpeel.toFixed(2),
            Peeling_Chura: Peeling_Chura.toFixed(2),
            Peeling_Broken:Peeling_Broken.toFixed(2)
        };

        const extraData3 = {
            Village_Out_Pending:village_pending || 0,
            Order_Pending_Approval:PendingApproval || 0,
            Order_Pending_Mapping:PendingMapping || 0,
            Order_Pending_Packing:PendingPacking||0
        };


        const mergedData = { ...ReceivingTotal?.dataValues,...BoilingTotal?.dataValues, ...extraData,
            ...Ville_Outside_Gatepass?.dataValues,...Ville_Inside_gatepass?.dataValues,...Ville_Outside_Production?.dataValues,
            ...extraData3 ,
            ...scoopingUncutData,...scoopingBrokenData,
            ...extraData2};
        return res.status(200).json({ mergedData });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const Lottracker = async (req: Request, res: Response) => {
  try {
    const lotNos = await LotNo.findAll({
      order: [["lotNo", "DESC"]],
      raw: true,
    });

    // normalize lotNos
    const lotNoList = lotNos.map((lot: any) =>
      String(lot.lotNo).trim().toUpperCase()
    );

    const originTracks = await lotoriginmodel.findAll({
      where: {
        lotNo: {
          [Op.in]: lotNoList,
        },
      },
    });

    // build map with normalized key
    const originTrackMap: Record<string, any> = {};
    originTracks.forEach((track: any) => {
      const key = String(track.dataValues.lotNo)
        .trim()
        .toUpperCase();

      originTrackMap[key] = track.dataValues;
    });

    console.log(originTrackMap)

    // merge
    const result = lotNos.map((lot: any) => {
      const key = String(lot.lotNo)
        .trim()
        .toUpperCase();

      return {
        lotNo: lot.lotNo,
        modifiedBy: lot.modifiedBy,
        originTrack: originTrackMap[key] || null,
      };
    });

    return res.status(200).json({
      msg: "data fetched",
      result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};


export const directorDashboard = async (req: Request, res: Response) => {
    try {
      console.log("starting director");
      const { fromDate, toDate, type } = req.body;

      /* ===============================
       IST TIME
    =============================== */
      const nowIST = new Date();
      const searchnowIST = new Date();
      //nowIST.setHours(nowIST.getHours() + 5);
      //nowIST.setMinutes(nowIST.getMinutes() + 30);
      if (
        nowIST.getHours() < 5 ||
        (nowIST.getHours() === 5 && nowIST.getMinutes() <= 30)
      ) {
        nowIST.setHours(nowIST.getHours() + 5);
        nowIST.setMinutes(nowIST.getMinutes() + 30);
      }
      searchnowIST.setHours(0, 0, 0, 0);

      /* ===============================
       COMMON WHERE
    =============================== */
      const commonWhere = {
        [Op.or]: [{ editStatus: "Approved" }, { editStatus: "NA" }],
      };



      const usercount = await User.count();

      const employeecount = await Employee.count({ where: { status: true } });

      const Issued = await gatePassMaster.count({ col:'gatePassNo'
        ,where: { status: { [Op.notLike]: 'Cancelled' } }} );
      const completed  = await gatePassMaster.count({ col:'gatePassNo',
                where: { status: 'Closed' } });
      const pendingGatepass:number=Issued>0 && completed>0 ? Issued-completed:0 


      /* ===============================
       1️⃣ GET LAST DATE FROM DB
       (Previous boiling date)
    =============================== */

    const lastEntrygatepass = await gatePassMaster.findOne({
        attributes: [[fn("MAX", col("date")), "lastDate"]],
        where: {
          date: { [Op.lt]: searchnowIST },
        },
        //raw: true,
      });
      const lastEntryboil = await RcnBoiling.findOne({
        attributes: [[fn("MAX", col("date")), "lastDate"]],
        where: {
          ...commonWhere,
          date: { [Op.lt]: searchnowIST },
        },
        //raw: true,
      });

      const lastEntryborma = await RcnBorma.findOne({
        attributes: [[fn("MAX", col("date")), "lastDate"]],
        where: {
          ...commonWhere,
          date: { [Op.lt]: searchnowIST },
        },
        //raw: true,
      });

      const lastEntryhumid = await Humidifier.findOne({
        attributes: [[fn("MAX", col("date")), "lastDate"]],
        where: {
          ...commonWhere,
          date: { [Op.lt]: searchnowIST },
        },
        //raw: true,
      });

      const lastEntrypeel = await RcnPeeling.findOne({
        attributes: [[fn("MAX", col("date")), "lastDate"]],
        where: {
          ...commonWhere,
          date: { [Op.lt]: searchnowIST },
        },
        //raw: true,
      });

       const lastEntryscoop = await RcnAllScooping.findOne({
        attributes: [[fn("MAX", col("date")), "lastDate"]],
        where: {
          ...commonWhere,
          date: { [Op.lt]: searchnowIST },
        },
        //raw: true,
      });

      const lastDategate = lastEntrygatepass?.dataValues.lastDate;
      const lastDateboil = lastEntryboil?.dataValues.lastDate;
      const lastDateborma = lastEntryborma?.dataValues.lastDate;
      const lastDatehumid = lastEntryhumid?.dataValues.lastDate;
      const lastDatepeel = lastEntrypeel?.dataValues.lastDate;


      const lastDatescoop = lastEntryscoop?.dataValues.lastDate;

      let previousGate = 0;
      let previousGateDate = null;
      let previousBoiling = 0;
      let previousBoilingDate = null;
      let previousBorma = 0;
      let previousBormalab = 0;
      let previousBormaDate = null;
      let previousHumid = 0;
      let previousHumidDate = null;
      let previousUnpeel = 0;
      let previousBroken = 0;
      let previousChura = 0;
      let previousPeelDate = null;


      let previousopen = 0;
      let previousrcv = 0;
      let previouswholes = 0;
      let previousbroken = 0;
      let previousuncut = 0;
      let previousnoncut = 0;
       let previousunscoop = 0;
      let previousdust = 0;
      let previousrejection = 0;
      let previouskor = 0;
      let previouskorlab = 0;

      let previouswholesprcntg = 0;
      let previousbrokenprcntg = 0;
      let previousuncutprcntg = 0;
      let previousnoncutprcntg = 0;
       let previousunscoopprcntg = 0;
      let previousdustprcntg = 0;
      let previousrejectionprcntg = 0;

      let previousscoopDate = null;

      if (lastDategate) {
        const start = new Date(lastDategate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(lastDategate);
        end.setHours(23, 59, 59, 999);

        const prevResult = await gatePassMaster.count(
            { col:'gatePassNo',  where: {
                [Op.and]: [{ Status: { [Op.notLike]: 'Closed' } }, { Status: { [Op.notLike]: 'Cancelled' }}],
                date: { [Op.between]: [start, end] }

            }})
              
        previousGate = prevResult || 0;
        previousGateDate = lastDategate;
      }

      if (lastDateboil) {
        const start = new Date(lastDateboil);
        start.setHours(0, 0, 0, 0);

        const end = new Date(lastDateboil);
        end.setHours(23, 59, 59, 999);

        const prevResult = await RcnBoiling.findOne({
          attributes: [[fn("SUM", col("Size")), "total"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [start, end] },
          },
          //raw: true,
        });

        previousBoiling = Number(prevResult?.dataValues.total || 0);
        previousBoilingDate = lastDateboil;
      }
      if (lastDateborma) {
        const start = new Date(lastDateborma);
        start.setHours(0, 0, 0, 0);

        const end = new Date(lastDateborma);
        end.setHours(23, 59, 59, 999);

        const prevResult = await RcnBorma.findOne({
          attributes: [[fn("AVG", col("BormaLoss")), "total"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [start, end] },
          },
          //raw: true,
        });
        const prevResultlab = await qcKOR.findOne({
          attributes: [[fn("AVG", col("qcBormaLoss")), "total"]],
          where: {
            ...commonWhere,
            prodbormadate: { [Op.between]: [start, end] },
          },
          //raw: true,
        });

        previousBorma = Number(prevResult?.dataValues.total || 0);
        previousBormalab = Number(prevResultlab?.dataValues.total || 0);
        previousBormaDate = lastDateborma;
      }
       if (lastDatehumid) {
        const start = new Date(lastDatehumid);
        start.setHours(0, 0, 0, 0);

        const end = new Date(lastDatehumid);
        end.setHours(23, 59, 59, 999);

        const prevResult = await Humidifier.findOne({
          attributes: [[fn("AVG", col("MoistGain")), "total"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [start, end] },
          },
          //raw: true,
        });

        previousHumid = Number(prevResult?.dataValues.total || 0);
        previousHumidDate = lastDatehumid;
      }
        if (lastDatepeel) {
        const start = new Date(lastDatepeel);
        start.setHours(0, 0, 0, 0);

        const end = new Date(lastDatepeel);
        end.setHours(23, 59, 59, 999);

        const prevResult = await RcnPeeling.findOne({
          attributes: [[fn("AVG", col("unpeelp")), "totalunpeel"],
        [fn("AVG", col("brokenp")), "totalbroken"],
    [fn("AVG", col("churap")), "totalchura"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [start, end] },
          },
          //raw: true,
        });

        previousUnpeel = Number(prevResult?.dataValues.totalunpeel || 0);
        previousBroken = Number(prevResult?.dataValues.totalbroken || 0);
        previousChura = Number(prevResult?.dataValues.totalchura || 0);
        previousPeelDate = lastDatepeel;
      }

          if (lastDatescoop) {
        const start = new Date(lastDatescoop);
        start.setHours(0, 0, 0, 0);

        const end = new Date(lastDatescoop);
        end.setHours(23, 59, 59, 999);

        const prevResult = await RcnAllScooping.findOne({
          attributes: [[fn("SUM", col("Opening_Qty")), "Opening_Qty"],
                    [fn("SUM", col("Receiving_Qty")), "Receiving_Qty"],
                    [fn("SUM", col("Wholes")), "Wholes"],
                    [fn("SUM", col("Broken")), "Broken"],
                    [fn("SUM", col("Uncut")), "Uncut"],
                    [fn("SUM", col("Unscoop")), "Unscoop"],
                    [fn("SUM", col("Rejection")), "Rejection"],
                    [fn("SUM", col("Dust")), "Dust"],
                    [fn("SUM", col("NonCut")), "NonCut"],
                    [fn("AVG", col("KOR")), "KOR"],
        ],
          where: {
            ...commonWhere,
            date: { [Op.between]: [start, end] },
          },
          //raw: true,
        });
        const prevResultlab = await qcKOR.findOne({
          attributes: [
                    [fn("AVG", col("qcKOR")), "qcKOR"]
        ],
          where: {
            ...commonWhere,
            proddate: { [Op.between]: [start, end] },
          },
          //raw: true,
        });

        previousopen = Number(prevResult?.dataValues.Opening_Qty || 0);
        previousrcv = Number(prevResult?.dataValues.Receiving_Qty || 0);
        previouswholes = Number(prevResult?.dataValues.Wholes || 0);
        previousbroken = Number(prevResult?.dataValues.Broken || 0);
        previousuncut = Number(prevResult?.dataValues.Uncut || 0);
        previousnoncut = Number(prevResult?.dataValues.NonCut || 0);
        previousunscoop = Number(prevResult?.dataValues.Unscoop || 0);
        previousdust = Number(prevResult?.dataValues.Dust || 0);
        previousrejection = Number(prevResult?.dataValues.Rejection || 0);
        previouskor = Number(prevResult?.dataValues.KOR || 0);
        previouskorlab = Number(prevResultlab?.dataValues.qcKOR || 0);
        previousscoopDate = lastDatescoop;

        if((previousopen+previousrcv)!==0){
            
        previouswholesprcntg = ((previouswholes/(previousopen+previousrcv))*100) || 0;
        previousbrokenprcntg =  ((previousbroken/(previousopen+previousrcv))*100) || 0;
        previousuncutprcntg =  ((previousuncut/(previousopen+previousrcv))*100) || 0;
        previousnoncutprcntg =  ((previousnoncut/(previousopen+previousrcv))*100) || 0;
        previousunscoopprcntg =  ((previousunscoop/(previousopen+previousrcv))*100) || 0;
        previousdustprcntg =  ((previousdust/(previousopen+previousrcv))*100) || 0;
        previousrejectionprcntg =  ((previousrejection/(previousopen+previousrcv))*100) || 0;
        }
      }

      /* ===============================
       2️⃣ CURRENT FINANCIAL YEAR
       (India: Apr–Mar)
    =============================== */
      const year = nowIST.getFullYear();
      const fyStart =
        nowIST < new Date(`${year}-04-01`)
          ? new Date(`${year - 1}-04-01`)
          : new Date(`${year}-04-01`);

      fyStart.setHours(0, 0, 0, 0);

      const fyResultBoil = await RcnBoiling.findOne({
        attributes: [[fn("SUM", col("Size")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [fyStart, nowIST] },
        },
        //raw: true,
      });


        const fyResultBorma = await RcnBorma.findOne({
        attributes: [[fn("AVG", col("BormaLoss")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [fyStart, nowIST] },
          BormaStatus:1
        },
        // raw: true,
      });

       const fyResultHumid = await Humidifier.findOne({
        attributes: [[fn("AVG", col("MoistGain")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [fyStart, nowIST] },
          Status:1
        },
        // raw: true,
      });
      const fyReceivingTotal = await RcnPrimary.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('noOfBags * 80')), 'Total_Receiving']
            ],
            where: {
                rcnStatus: 'QC Approved',
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                date: { [Op.between]: [fyStart, nowIST] }
            }
        });

        
        //4.Total Village Outside ///////////////////////////////////////////////////////////////////////////////////   
        const Ville_Outside_Gatepass = await RcvVillageModel.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('totalWt')), 'Final_Village_Out']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'N/A' }],
                gateType:'OUT',
                recevingDate: { [Op.between]: [fyStart, nowIST] }
            }
        });
        //4.Total Village Outside ///////////////////////////////////////////////////////////////////////////////////   
        const Ville_Outside_Production = await villageProduction.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('issue_outside')), 'Production_Village_Out']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'NA' }],
                date: { [Op.between]: [fyStart, nowIST] }
            }
        });

        //4.Total Village Outside ///////////////////////////////////////////////////////////////////////////////////   
        const Ville_Inside_gatepass = await RcvVillageInModel.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('totalWt')), 'Village_In']
            ],
            where: {
               
                [Op.or]: [{ editStatus: 'Approved' }, { editStatus: 'N/A' }],
                recevingDate: { [Op.between]: [fyStart, nowIST] }
            }
        });

        const village_out_prod = Number(Ville_Outside_Production?.dataValues.Production_Village_Out) || 0;
        const village_out_gate = Number(Ville_Outside_Gatepass?.dataValues.Final_Village_Out) || 0;
        const village_in_gate = Number(Ville_Inside_gatepass?.dataValues.Village_In) || 0;
        const village_pending = village_out_gate-village_out_prod ;
        const village_pending_in = village_out_gate-village_in_gate ;

      const currentYearBoiling = Number(fyResultBoil?.dataValues.total || 0);

      /* ===============================
       2️⃣ CURRENT Week
       (India: Mon–Sun)
    =============================== */

      const weekStart = new Date(nowIST);
      const day = weekStart.getDay();
      // JS: Sun=0, Mon=1, Tue=2 ...

      const diffToMonday = day === 0 ? -6 : 1 - day;
      weekStart.setDate(weekStart.getDate() + diffToMonday);
      weekStart.setHours(0, 0, 0, 0);
      //console.log(weekStart)

    const weekResultGate = await gatePassMaster.count(
            { col:'gatePassNo',  where: {
                 [Op.and]: [{ Status: { [Op.notLike]: 'Closed' } }, { Status: { [Op.notLike]: 'Cancelled' }}],
                date: { [Op.between]: [weekStart, nowIST] }

      }})

       const weekResultBoil = await RcnBoiling.findOne({
        attributes: [[fn("SUM", col("Size")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [weekStart, nowIST] },
        },
        // raw: true,
      });

      const weekResultBorma = await RcnBorma.findOne({
        attributes: [[fn("AVG", col("BormaLoss")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [weekStart, nowIST] },
          BormaStatus:1
        },
        // raw: true,
      });
      const weekResultBormalab = await qcKOR.findOne({
        attributes: [[fn("AVG", col("qcBormaLoss")), "total"]],
        where: {
          ...commonWhere,
          prodbormadate: { [Op.between]: [weekStart, nowIST] },
        },
        // raw: true,
      });

       const weekResultHumid = await Humidifier.findOne({
        attributes: [[fn("AVG", col("MoistGain")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [weekStart, nowIST] },Status:1
        },
        // raw: true,
      });

          const weekResultPeel = await RcnPeeling.findOne({
        attributes: [[fn("AVG", col("brokenp")), "totalbroken"],
                    [fn("AVG", col("unpeelp")), "totalunpeel"],
                    [fn("AVG", col("churap")), "totalchura"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [weekStart, nowIST] },
        },
        // raw: true,
      });


       const currentWeekBoil = Number(weekResultBoil?.dataValues.total || 0);
       const currentWeekBorma = Number(weekResultBorma?.dataValues.total || 0);
       const currentWeekBormaLab = Number(weekResultBormalab?.dataValues.total || 0);
       const currentWeekHumid = Number(weekResultHumid?.dataValues.total || 0);

       const currentWeekBroken = Number(weekResultPeel?.dataValues.totalbroken || 0);
       const currentWeekUnpeel = Number(weekResultPeel?.dataValues.totalunpeel || 0);
       const currentWeekChura = Number(weekResultPeel?.dataValues.totalchura || 0);

    const weeklyRows = await RcnAllScooping.findAll({
      attributes: [
        "Opening_Qty",
        "Receiving_Qty",
        "Uncut",
        "NonCut",
        "Unscoop",
        "Broken",
        "Dust","KOR"
      ],
      where: {
        ...commonWhere,
        date: {
          [Op.between]: [weekStart, nowIST],
        },
      },
      //raw: true,
    });
    const weeklyRowsLab = await qcKOR.findAll({
      attributes: [
        "qcKOR"
      ],
      where: {
        ...commonWhere,
        proddate: {
          [Op.between]: [weekStart, nowIST],
        },
      },
      //raw: true,
    });

    let weeklyUncutAvg = 0;
    let weeklyNoncutAvg = 0;
    let weeklyUnscoopAvg = 0;
    let weeklyBrokenAvg = 0;
    let weeklyDustAvg = 0;
    let weeklyKORAvg = 0;
    let weeklyKORLabAvg = 0;

    if (weeklyRows.length > 0) {
      let totalUncutP = 0;
      let totalNoncutP = 0;
      let totalUnscoopP = 0;
      let totalBrokenP = 0;
      let totalDustP = 0;
      let totalKOR = 0;
      let totalKORlab = 0;

      let validRows = 0;
      let validRowslab = 0;

      for (const row of weeklyRows) {
        const open = Number(row.dataValues.Opening_Qty || 0);
        const rcv = Number(row.dataValues.Receiving_Qty || 0);
        const uncut = Number(row.dataValues.Uncut || 0);
        const noncut = Number(row.dataValues.NonCut || 0);
        const Unscoop = Number(row.dataValues.Unscoop || 0);
        const Broken = Number(row.dataValues.Broken || 0);
        const Dust = Number(row.dataValues.Dust || 0);
        const KOR = Number(row.dataValues.KOR || 0);
        const base = open + rcv;

        if (base > 0) {
          totalUncutP += (uncut / base) * 100;
          totalNoncutP += (noncut / base) * 100;
          totalUnscoopP += (Unscoop / base) * 100;
          totalBrokenP += (Broken / base) * 100;
          totalDustP += (Dust / base) * 100;
          totalKOR +=KOR
          validRows++;
        }
      }
      for (const row of weeklyRowsLab) {
        const qcKOR = Number(row.dataValues.qcKOR || 0);
        
          totalKORlab +=qcKOR
          validRowslab++;
        
      }

      weeklyUncutAvg = validRows > 0 ? totalUncutP / validRows : 0;
      weeklyNoncutAvg = validRows > 0 ? totalNoncutP / validRows : 0;
      weeklyUnscoopAvg = validRows > 0 ? totalUnscoopP / validRows : 0;
      weeklyBrokenAvg = validRows > 0 ? totalBrokenP / validRows : 0;
      weeklyDustAvg = validRows > 0 ? totalDustP / validRows : 0;
      weeklyKORAvg = validRows > 0 ? totalKOR / validRows : 0;
      weeklyKORLabAvg = validRowslab > 0 ? totalKORlab / validRowslab : 0;
    }

      /* ===============================
       3️⃣ CURRENT MONTH
    =============================== */
      const monthStart = new Date(nowIST.getFullYear(), nowIST.getMonth(), 1);
      monthStart.setHours(0, 0, 0, 0);

      const monthResultGate = await gatePassMaster.count(
            { col:'gatePassNo',  where: {
                 [Op.and]: [{ Status: { [Op.notLike]: 'Closed' } }, { Status: { [Op.notLike]: 'Cancelled' }}],
                date: { [Op.between]: [monthStart, nowIST] }

      }})

      const monthResultBoil = await RcnBoiling.findOne({
        attributes: [[fn("SUM", col("Size")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [monthStart, nowIST] },
        },
        //raw: true,
      });
      const monthResultBorma = await RcnBorma.findOne({
        attributes: [[fn("AVG", col("BormaLoss")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [monthStart, nowIST] },BormaStatus:1
        },
        //raw: true,
      });
       const monthResultBormaLab = await qcKOR.findOne({
        attributes: [[fn("AVG", col("qcBormaLoss")), "total"]],
        where: {
          ...commonWhere,
          prodbormadate: { [Op.between]: [monthStart, nowIST] },
        },
        //raw: true,
      });
       const monthResultHumid = await Humidifier.findOne({
        attributes: [[fn("AVG", col("MoistGain")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [monthStart, nowIST] },Status:1
        },
        //raw: true,
      });

       const monthResultPeel = await RcnPeeling.findOne({
       attributes: [[fn("AVG", col("brokenp")), "totalbroken"],
                    [fn("AVG", col("unpeelp")), "totalunpeel"],
                    [fn("AVG", col("churap")), "totalchura"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [monthStart, nowIST] },
        },
        //raw: true,
      });


      const currentMonthBoiling = Number(
        monthResultBoil?.dataValues.total || 0,
      );
      const currentMonthBorma = Number(monthResultBorma?.dataValues.total || 0);
      const currentMonthBormaLab = Number(monthResultBormaLab?.dataValues.total || 0);
      const currentMonthHumid = Number(monthResultHumid?.dataValues.total || 0);

      const currentMonthBroken = Number(monthResultPeel?.dataValues.totalbroken || 0);
      const currentMonthUnpeel = Number(monthResultPeel?.dataValues.totalunpeel || 0);
      const currentMonthChura = Number(monthResultPeel?.dataValues.totalchura || 0);

      const monthlyRows = await RcnAllScooping.findAll({
        attributes: [
          "Opening_Qty",
          "Receiving_Qty",
          "Uncut",
          "NonCut",
          "Unscoop",
          "Broken",
          "Dust","KOR"
        ],
        where: {
          ...commonWhere,
          date: {
            [Op.between]: [monthStart, nowIST],
          },
        },
        //raw: true,
      });
      const monthlyRowsLab = await qcKOR.findAll({
        attributes: [
          "qcKOR"
        ],
        where: {
          ...commonWhere,
          proddate: {
            [Op.between]: [monthStart, nowIST],
          },
        },
        //raw: true,
      });
      let monthlyUncutAvg = 0;
      let monthlyNoncutAvg = 0;
      let monthlyUnscoopAvg = 0;
      let monthlyBrokenAvg = 0;
      let monthlyDustAvg = 0;
      let monthlyKORAvg = 0;
      let monthlyKORAvglab = 0;

      if (monthlyRows.length > 0) {
        let totalUncutP = 0;
        let totalNoncutP = 0;
        let totalUnscoopP = 0;
        let totalBrokenP = 0;
        let totalDustP = 0;
        let totalKOR = 0;
        let totalKORlab = 0;
        let validRows = 0;
        let validRowslab = 0;

        for (const row of monthlyRows) {
          const open = Number(row.dataValues.Opening_Qty || 0);
          const rcv = Number(row.dataValues.Receiving_Qty || 0);
          const uncut = Number(row.dataValues.Uncut || 0);
          const noncut = Number(row.dataValues.NonCut || 0);
          const Unscoop = Number(row.dataValues.Unscoop || 0);
          const Broken = Number(row.dataValues.Broken || 0);
          const Dust = Number(row.dataValues.Dust || 0);
          const KOR = Number(row.dataValues.KOR || 0);

          const base = open + rcv;

          if (base > 0) {
            totalUncutP += (uncut / base) * 100;
            totalNoncutP += (noncut / base) * 100;
            totalUnscoopP += (Unscoop / base) * 100;
            totalBrokenP += (Broken / base) * 100;
            totalDustP += (Dust / base) * 100;
            totalKOR += KOR;
            validRows++;
          }
        }
         for (const row of monthlyRowsLab) {
         
          const qcKOR = Number(row.dataValues.qcKOR || 0);

            totalKORlab += qcKOR;
            validRowslab++;
          
        }

        monthlyUncutAvg = validRows > 0 ? totalUncutP / validRows : 0;
        monthlyNoncutAvg = validRows > 0 ? totalNoncutP / validRows : 0;
        monthlyUnscoopAvg = validRows > 0 ? totalUnscoopP / validRows : 0;
        monthlyBrokenAvg = validRows > 0 ? totalBrokenP / validRows : 0;
        monthlyDustAvg = validRows > 0 ? totalDustP / validRows : 0;
        monthlyKORAvg = validRows > 0 ? totalKOR / validRows : 0;
        monthlyKORAvglab = validRowslab > 0 ? totalKORlab / validRowslab : 0;
      }

   

    //    const monthResultScoop = await RcnAllScooping.findOne({
    //    attributes: [[fn("SUM", col("Opening_Qty")), "Opening_Qty"],
    //                 [fn("SUM", col("Receiving_Qty")), "Receiving_Qty"],
    //                 [fn("SUM", col("Wholes")), "Wholes"],
    //                 [fn("SUM", col("Broken")), "Broken"],
    //                 [fn("SUM", col("Uncut")), "Uncut"],
    //                 [fn("SUM", col("Unscoop")), "Unscoop"],
    //                 [fn("SUM", col("Rejection")), "Rejection"],
    //                 [fn("SUM", col("Dust")), "Dust"],
    //                 [fn("SUM", col("NonCut")), "NonCut"]],
    //     where: {
    //       ...commonWhere,
    //      date: { [Op.between]: [monthStart, nowIST] },
    //     },
    //     // raw: true,
    //   });

    // let previouswholesprcntgmt = 0;
    //   let previousbrokenprcntgmt = 0;
    //   let previousuncutprcntgmt= 0;
    //   let previousnoncutprcntgmt = 0;
    //   let previousunscoopprcntgmt = 0;
    //   let previousdustprcntgmt = 0;
    //   let previousrejectionprcntgmt = 0;

    //     const currentMtScoopOpen = Number(monthResultScoop?.dataValues.Opening_Qty || 0);
    //     const currentMtScoopRcv = Number(monthResultScoop?.dataValues.Receiving_Qty || 0);
    //     const currentMtScoopWholes = Number(monthResultScoop?.dataValues.Wholes || 0);
    //     const currentMtScoopBroken = Number(monthResultScoop?.dataValues.Broken || 0);
    //     const currentMtScoopUncut = Number(monthResultScoop?.dataValues.Uncut || 0);
    //     const currentMtScoopNoncut = Number(monthResultScoop?.dataValues.NonCut || 0);
    //     const currentMtScoopUnscoop = Number(monthResultScoop?.dataValues.Unscoop || 0);
    //     const currentMtScoopDust = Number(monthResultScoop?.dataValues.Dust || 0);
    //     const currentMtScoopRej = Number(monthResultScoop?.dataValues.Rejection || 0);

    //     if((currentMtScoopOpen+currentMtScoopRcv)!==0){
            
    //     previouswholesprcntgmt = (currentMtScoopWholes/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     previousbrokenprcntgmt =  (currentMtScoopBroken/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     previousuncutprcntgmt =  (currentMtScoopUncut/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     previousnoncutprcntgmt =  (currentMtScoopNoncut/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     previousunscoopprcntgmt =  (currentMtScoopUnscoop/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     previousdustprcntgmt =  (currentMtScoopDust/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     previousrejectionprcntgmt =  (currentMtScoopRej/(currentMtScoopRcv+currentMtScoopOpen)) || 0;
    //     }

      /* ===============================
       4️⃣ CUSTOM FROM–TO
    =============================== */
      let customBoiling = 0;
      let customBorma = 0;
      let customBormalab = 0;
      let customHumid = 0;
       let customGate = 0;

        let customBroken = 0;
         let customUnpeel = 0;
          let customChura = 0;


           let customUncutAvg = 0;
      let customNoncutAvg = 0;
      let customUnscoopAvg = 0;
      let customBrokenAvg = 0;
      let customDustAvg = 0;
      let customKORAvg = 0;
      let customKORAvglab = 0;

      if (type === "gatepass" && fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        const to = new Date(toDate);
        to.setHours(to.getHours() + 5);
        to.setMinutes(to.getMinutes() + 30);
        to.setHours(23, 59, 59, 999);

        const customResultGate = await gatePassMaster.count(
            { col:'gatePassNo',  where: {
                 [Op.and]: [{ Status: { [Op.notLike]: 'Closed' } }, { Status: { [Op.notLike]: 'Cancelled' }}],
                date: { [Op.between]: [from, to] }

      }})
      customGate=customResultGate

       
      }

      if (type === "boiling" && fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        const to = new Date(toDate);
        to.setHours(to.getHours() + 5);
        to.setMinutes(to.getMinutes() + 30);
        to.setHours(23, 59, 59, 999);

        const customResult = await RcnBoiling.findOne({
          attributes: [[fn("SUM", col("Size")), "total"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [from, to] },
          },
          //raw: true,
        });

        customBoiling = Number(customResult?.dataValues.total || 0);
      }
      if (type === "borma" && fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        const to = new Date(toDate);
        to.setHours(to.getHours() + 5);
        to.setMinutes(to.getMinutes() + 30);
        to.setHours(23, 59, 59, 999);

        const customResultBorma = await RcnBorma.findOne({
          attributes: [[fn("AVG", col("BormaLoss")), "total"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [from, to] },BormaStatus:1
          },
          //raw: true,
        });
        const customResultBormalab = await qcKOR.findOne({
          attributes: [[fn("AVG", col("qcBormaLoss")), "total"]],
          where: {
            ...commonWhere,
            prodbormadate: { [Op.between]: [from, to] },
          },
          //raw: true,
        });

        customBorma = Number(customResultBorma?.dataValues.total || 0);
        customBormalab = Number(customResultBormalab?.dataValues.total || 0);
      }
      if (type === "humid" && fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        const to = new Date(toDate);
        to.setHours(to.getHours() + 5);
        to.setMinutes(to.getMinutes() + 30);
        to.setHours(23, 59, 59, 999);

        const customResultHumid = await Humidifier.findOne({
          attributes: [[fn("AVG", col("MoistGain")), "total"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [from, to] },Status:1
          },
          //raw: true,
        });

        customHumid = Number(customResultHumid?.dataValues.total || 0);
      }
        if (type === "peeling" && fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        const to = new Date(toDate);
        to.setHours(to.getHours() + 5);
        to.setMinutes(to.getMinutes() + 30);
        to.setHours(23, 59, 59, 999);

        const customResultPeeling = await RcnPeeling.findOne({
           attributes: [[fn("AVG", col("brokenp")), "totalbroken"],
                    [fn("AVG", col("unpeelp")), "totalunpeel"],
                    [fn("AVG", col("churap")), "totalchura"]],
          where: {
            ...commonWhere,
            date: { [Op.between]: [from, to] },
          },
          //raw: true,
        });

        customBroken = Number(customResultPeeling?.dataValues.totalbroken || 0);
        customUnpeel= Number(customResultPeeling?.dataValues.totalunpeel || 0);
        customChura = Number(customResultPeeling?.dataValues.totalchura || 0);
      }

       if (type === "scoop" && fromDate && toDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        const to = new Date(toDate);
        to.setHours(to.getHours() + 5);
        to.setMinutes(to.getMinutes() + 30);
        to.setHours(23, 59, 59, 999);


          const customResultScoop = await RcnAllScooping.findAll({
        attributes: [
          "Opening_Qty",
          "Receiving_Qty",
          "Uncut",
          "NonCut",
          "Unscoop",
          "Broken",
          "Dust","KOR"
        ],
        where: {
          ...commonWhere,
          date: {
            [Op.between]: [from, to],
          },
        },
        //raw: true,
      });
           const customResultScooplab = await qcKOR.findAll({
        attributes: [
         "qcKOR"
        ],
        where: {
          ...commonWhere,
          proddate: {
            [Op.between]: [from, to],
          },
        },
        //raw: true,
      });

      if (customResultScoop.length > 0) {
        let totalUncutP = 0;
        let totalNoncutP = 0;
        let totalUnscoopP = 0;
        let totalBrokenP = 0;
        let totalDustP = 0;
        let totalKOR = 0;
        let totalKORlab = 0;
        let validRows = 0;
        let validRowslab = 0;

        for (const row of customResultScoop) {
          const open = Number(row.dataValues.Opening_Qty || 0);
          const rcv = Number(row.dataValues.Receiving_Qty || 0);
          const uncut = Number(row.dataValues.Uncut || 0);
          const noncut = Number(row.dataValues.NonCut || 0);
          const Unscoop = Number(row.dataValues.Unscoop || 0);
          const Broken = Number(row.dataValues.Broken || 0);
          const Dust = Number(row.dataValues.Dust || 0);
            const KOR = Number(row.dataValues.KOR || 0);
          const base = open + rcv;

          if (base > 0) {
            totalUncutP += (uncut / base) * 100;
            totalNoncutP += (noncut / base) * 100;
            totalUnscoopP += (Unscoop / base) * 100;
            totalBrokenP += (Broken / base) * 100;
            totalDustP += (Dust / base) * 100;
            totalKOR += KOR;
            validRows++;
          }
        }
         for (const row of customResultScooplab) {
        
            const qcKOR = Number(row.dataValues.qcKOR || 0);
 
            totalKORlab += qcKOR;
            validRowslab++;
          
        }

        customUncutAvg = validRows > 0 ? totalUncutP / validRows : 0;
        customNoncutAvg = validRows > 0 ? totalNoncutP / validRows : 0;
        customUnscoopAvg = validRows > 0 ? totalUnscoopP / validRows : 0;
        customBrokenAvg = validRows > 0 ? totalBrokenP / validRows : 0;
        customDustAvg = validRows > 0 ? totalDustP / validRows : 0;
        customKORAvg = validRows > 0 ? totalKOR / validRows : 0;
        customKORAvglab = validRowslab > 0 ? totalKORlab / validRowslab : 0;
      }
      }

      
    

      /* ===============================
       RESPONSE
    =============================== */
      return res.status(200).json({
        msg: "ok",
        data: {usercount,employeecount,pendingGatepass,village_pending,village_pending_in,fyReceivingTotal,village_out_gate,village_out_prod,Ville_Inside_gatepass,
          previousBoiling,previousBorma,previousHumid,previousGate,previousBormalab,
          previousBoilingDate,previousBormaDate,previousHumidDate,previousGateDate,
          currentWeekBoil,currentWeekBorma,currentWeekBormaLab,currentWeekHumid,weekResultGate,
          currentMonthBoiling,currentMonthBorma,currentMonthBormaLab,currentMonthHumid,monthResultGate,
          customBoiling,customBorma,customBormalab,customHumid,customGate,
          currentYearBoiling,fyResultBorma,fyResultHumid,
          previousscoopDate,previouswholesprcntg,previousbrokenprcntg,previousuncutprcntg,previousnoncutprcntg,previousunscoopprcntg,previousdustprcntg,previousrejectionprcntg,previouskor,previouskorlab,
          monthlyBrokenAvg,monthlyDustAvg,monthlyNoncutAvg,monthlyUnscoopAvg,monthlyUncutAvg,monthlyKORAvg,monthlyKORAvglab,
          weeklyBrokenAvg,weeklyDustAvg,weeklyNoncutAvg,weeklyUnscoopAvg,weeklyUncutAvg,weeklyKORAvg,weeklyKORLabAvg,
          customBrokenAvg,customDustAvg,customNoncutAvg,customUnscoopAvg,customUncutAvg,customKORAvg,customKORAvglab,
          customBroken,customUnpeel,customChura,currentMonthBroken,currentMonthUnpeel,currentMonthChura,
          currentWeekBroken,currentWeekUnpeel,currentWeekChura,previousBroken,previousChura,previousUnpeel,previousPeelDate
        },
      });
    } catch (error) {
    console.error(" Dashboard Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }

}

export const getBacklogLot = async (req: Request, res: Response) => {
       try {
        const section = req.params.section;
        let scoopingLot
        if(section==='mayur'){
            scoopingLot = await Mayur.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog','date'],
            
                where: { [Op.or]: [
                                    { editStatus: "Approved" },
                                    { editStatus: "NA" }
                                ],latest: 1,current_backlog: {
                                    [Op.gt]: 0
                                }
            }

        });
        }

        if(section==='hamsa'){
            scoopingLot = await hamsaModel.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog','date'],
            
                where: { [Op.or]: [
                                    { editStatus: "Approved" },
                                    { editStatus: "NA" }
                                ],latest: 1,current_backlog: {
                                    [Op.gt]: 0
                                },
            }

        });
        }

         if(section==='dpds'){
            scoopingLot = await DPDS.findAll({
            
            attributes: ['LotNo', 'origin','current_backlog','date'],
            
                where: { [Op.or]: [
                                    { editStatus: "Approved" },
                                    { editStatus: "NA" }
                                ],latest: 1,current_backlog: {
                                    [Op.gt]: 0
                                },
            }

        });
        }
        
        if(scoopingLot){
            res.status(200).json({ message: "Backlog Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}