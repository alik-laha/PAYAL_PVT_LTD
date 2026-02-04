
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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
                    { LotNo: { [Op.notLike]: '%V%' } }
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

      /* ===============================
       1️⃣ GET LAST DATE FROM DB
       (Previous boiling date)
    =============================== */
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

      const lastDateboil = lastEntryboil?.dataValues.lastDate;
      const lastDateborma = lastEntryborma?.dataValues.lastDate;
      const lastDatehumid = lastEntryhumid?.dataValues.lastDate;

      let previousBoiling = 0;
      let previousBoilingDate = null;
      let previousBorma = 0;
      let previousBormaDate = null;
      let previousHumid = 0;
      let previousHumidDate = null;

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

        previousBorma = Number(prevResult?.dataValues.total || 0);
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

      const weekResultBorma = await RcnBorma.findOne({
        attributes: [[fn("AVG", col("BormaLoss")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [weekStart, nowIST] },
        },
        // raw: true,
      });

       const weekResultHumid = await Humidifier.findOne({
        attributes: [[fn("AVG", col("MoistGain")), "total"]],
        where: {
          ...commonWhere,
          date: { [Op.between]: [weekStart, nowIST] },
        },
        // raw: true,
      });

      const currentWeekBorma = Number(weekResultBorma?.dataValues.total || 0);
      const currentWeekHumid = Number(weekResultHumid?.dataValues.total || 0);

      /* ===============================
       3️⃣ CURRENT MONTH
    =============================== */
      const monthStart = new Date(nowIST.getFullYear(), nowIST.getMonth(), 1);
      monthStart.setHours(0, 0, 0, 0);

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
          date: { [Op.between]: [monthStart, nowIST] },
        },
        //raw: true,
      });
       const monthResultHumid = await Humidifier.findOne({
        attributes: [[fn("AVG", col("MoistGain")), "total"]],
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
      const currentMonthHumid = Number(monthResultHumid?.dataValues.total || 0);

      /* ===============================
       4️⃣ CUSTOM FROM–TO
    =============================== */
      let customBoiling = 0;
      let customBorma = 0;
      let customHumid = 0;

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
            date: { [Op.between]: [from, to] },
          },
          //raw: true,
        });

        customBorma = Number(customResultBorma?.dataValues.total || 0);
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
            date: { [Op.between]: [from, to] },
          },
          //raw: true,
        });

        customHumid = Number(customResultHumid?.dataValues.total || 0);
      }

      /* ===============================
       RESPONSE
    =============================== */
      return res.status(200).json({
        msg: "ok",
        data: {
          previousBoiling,previousBorma,previousHumid,
          previousBoilingDate,previousBormaDate,previousHumidDate,
          currentWeekBorma,currentWeekHumid,
          currentMonthBoiling,currentMonthBorma,currentMonthHumid,
          customBoiling,customBorma,customHumid,
          currentYearBoiling
        },
      });
    } catch (error) {
    console.error(" Dashboard Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }

}