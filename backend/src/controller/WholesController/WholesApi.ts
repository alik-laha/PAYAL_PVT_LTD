import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import WhatsappMsg from "../../helper/WhatsappMsg";
import lotoriginmodel from "../../model/lotoriginModel";
import sectionTransfer from "../../model/transactionsectionmodel";
import mixingModel from "../../model/mixingModel";
import bigTaihoModel from "../../model/bigTaihoModel";
import hamsaModel from "../../model/hamsamodel";
import WholesModel from "../../model/wholesModel";
import WholesEditModel from "../../model/wholesEditModel";
import rejectionModel from "../../model/rejectionModel";
import LWModel from "../../model/lowerGradeModel";


// //Wholes.tsx
export const findEditWholesAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await WholesEditModel.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditWholesAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error });
    }
}
export const sumOfallWholes = async (req: Request, res: Response) => {

    
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

        const data = await WholesModel.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('issue_pw_150')), 'issue_pw_150'],
                [sequelize.fn('sum', sequelize.col('issue_w_150')), 'issue_w_150'],
                [sequelize.fn('sum', sequelize.col('issue_ww_150')), 'issue_ww_150'],
                [sequelize.fn('sum', sequelize.col('issue_s_150')), 'issue_s_150'],
                [sequelize.fn('sum', sequelize.col('issue_aw_150')), 'issue_aw_150'],
                [sequelize.fn('sum', sequelize.col('issue_lw_150')), 'issue_lw_150'],
                [sequelize.fn('sum', sequelize.col('issue_pw_180')), 'issue_pw_180'],
                [sequelize.fn('sum', sequelize.col('issue_w_180')), 'issue_w_180'],
                [sequelize.fn('sum', sequelize.col('issue_ww_180')), 'issue_ww_180'],
                [sequelize.fn('sum', sequelize.col('issue_s_180')), 'issue_s_180'],
                [sequelize.fn('sum', sequelize.col('issue_aw_180')), 'issue_aw_180'],
                [sequelize.fn('sum', sequelize.col('issue_lw_180')), 'issue_lw_180'],
                [sequelize.fn('sum', sequelize.col('issue_pw_210')), 'issue_pw_210'],
                [sequelize.fn('sum', sequelize.col('issue_w_210')), 'issue_w_210'],
                [sequelize.fn('sum', sequelize.col('issue_ww_210')), 'issue_ww_210'],
                [sequelize.fn('sum', sequelize.col('issue_s_210')), 'issue_s_210'],
                [sequelize.fn('sum', sequelize.col('issue_aw_210')), 'issue_aw_210'],
                [sequelize.fn('sum', sequelize.col('issue_lw_210')), 'issue_lw_210'],
                [sequelize.fn('sum', sequelize.col('issue_pw_240')), 'issue_pw_240'],
                [sequelize.fn('sum', sequelize.col('issue_w_240')), 'issue_w_240'],
                [sequelize.fn('sum', sequelize.col('issue_ww_240')), 'issue_ww_240'],
                [sequelize.fn('sum', sequelize.col('issue_ww_240_A')), 'issue_ww_240_A'],
                [sequelize.fn('sum', sequelize.col('issue_aw_240')), 'issue_aw_240'],
                [sequelize.fn('sum', sequelize.col('issue_lw_240')), 'issue_lw_240'],
                [sequelize.fn('sum', sequelize.col('issue_pw_280')), 'issue_pw_280'],
                [sequelize.fn('sum', sequelize.col('issue_w_280')), 'issue_w_280'],
                [sequelize.fn('sum', sequelize.col('issue_ww_280')), 'issue_ww_280'],
                [sequelize.fn('sum', sequelize.col('issue_ww_280_A')), 'issue_ww_280_A'],
                [sequelize.fn('sum', sequelize.col('issue_aw_280')), 'issue_aw_280'],
                [sequelize.fn('sum', sequelize.col('issue_lw_280')), 'issue_lw_280'],
                [sequelize.fn('sum', sequelize.col('wholes_double')), 'wholes_double'],
                [sequelize.fn('sum', sequelize.col('issue_pw_320')), 'issue_pw_320'],
                [sequelize.fn('sum', sequelize.col('issue_w_320')), 'issue_w_320'],
                [sequelize.fn('sum', sequelize.col('issue_ww_320')), 'issue_ww_320'],
                [sequelize.fn('sum', sequelize.col('issue_ww_320_A')), 'issue_ww_320_A'],
                [sequelize.fn('sum', sequelize.col('issue_aw_320')), 'issue_aw_320'],
                [sequelize.fn('sum', sequelize.col('issue_lw_320')), 'issue_lw_320'],
                [sequelize.fn('sum', sequelize.col('issue_pw_360')), 'issue_pw_360'],
                [sequelize.fn('sum', sequelize.col('issue_w_360')), 'issue_w_360'],
                [sequelize.fn('sum', sequelize.col('issue_ww_360')), 'issue_ww_360'],
                [sequelize.fn('sum', sequelize.col('issue_ww_360_A')), 'issue_ww_360_A'],
                [sequelize.fn('sum', sequelize.col('issue_aw_360')), 'issue_aw_360'],
                [sequelize.fn('sum', sequelize.col('issue_lw_360')), 'issue_lw_360'],
                [sequelize.fn('sum', sequelize.col('issue_pw_400')), 'issue_pw_400'],
                [sequelize.fn('sum', sequelize.col('issue_w_400')), 'issue_w_400'],
                [sequelize.fn('sum', sequelize.col('issue_ww_400')), 'issue_ww_400'],
                [sequelize.fn('sum', sequelize.col('issue_ww_400_A')), 'issue_ww_400_A'],
                [sequelize.fn('sum', sequelize.col('issue_aw_400')), 'issue_aw_400'],
                [sequelize.fn('sum', sequelize.col('issue_lw_400')), 'issue_lw_400'],
                [sequelize.fn('sum', sequelize.col('issue_jjb')), 'issue_jjb'],
                [sequelize.fn('sum', sequelize.col('issue_jjb1')), 'issue_jjb1'],
                [sequelize.fn('sum', sequelize.col('issue_lw')), 'issue_lw'],
                [sequelize.fn('sum', sequelize.col('issue_bigTaiho')), 'issue_bigTaiho'],
                [sequelize.fn('sum', sequelize.col('issue_rejection')), 'issue_rejection'],
                [sequelize.fn('sum', sequelize.col('issue_village')), 'issue_village'],
            
             
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
        const EditData = await WholesEditModel.count()
        if (data) {
            return res.status(200).json({ data, EditData });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export const getWholesLot = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const scoopingLot = await WholesModel.findAll({

            attributes: ['LotNo', 'origin', 'current_backlog', 'rcv_pw_210', 'rcv_w_210', 'rcv_ww_210',
                'rcv_pw_240', 'rcv_w_240', 'rcv_ww_240',
                'rcv_pw_280', 'rcv_w_280', 'rcv_ww_280',
                'rcv_pw_320', 'rcv_w_320', 'rcv_ww_320',
                'rcv_pw_360', 'rcv_w_360', 'rcv_ww_360',
                'rcv_pw_400', 'rcv_w_400', 'rcv_ww_400',
                'rcv_jb_hamsa'],
            where: {
                Status: status
            }

        });
        if (scoopingLot) {
            res.status(200).json({ message: "Un Hamsa Entry", scoopingLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding Hamsa Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //WholesInitial.tsx
export const getWholesBylotorigin = async (req: Request, res: Response) => {

    try {
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await WholesModel.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un Wholes Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding Wholes Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

// //WholesCreateForm.tsx
export const CreateEntireWholes= async (req: Request, res: Response) => {
   
   
    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
           
         
            
            if((parseFloat(data.issue_add_1)
                
            //parseFloat(data.rcv_pw_210)+parseFloat(data.rcv_w_210)+parseFloat(data.rcv_ww_210)
            //+parseFloat(data.rcv_pw_240)+parseFloat(data.rcv_w_240)+parseFloat(data.rcv_ww_240)
            //+parseFloat(data.rcv_pw_280)+parseFloat(data.rcv_w_280)+parseFloat(data.rcv_ww_280)
            //+parseFloat(data.rcv_pw_320)+parseFloat(data.rcv_w_320)+parseFloat(data.rcv_ww_320)
            //+parseFloat(data.rcv_pw_360)+parseFloat(data.rcv_w_360)+parseFloat(data.rcv_ww_360)
            //+parseFloat(data.rcv_pw_400)+parseFloat(data.rcv_w_400)+parseFloat(data.rcv_ww_400)
            //+parseFloat(data.rcv_jb_hamsa)+parseFloat(data.rcv_jb_mayur)
               
           )< (parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
           +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
              +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                    +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                        +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                        +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                            +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                            +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                    +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                    +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                        +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                        +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                            +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                            +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                +parseFloat(data.issue_village)
         
               ))
               {
                console.log(parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
                +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                   +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                     +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                         +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                             +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                             +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                 +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                 +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                     +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                     +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                         +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                         +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                             +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                             +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                 +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                 +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                     +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                     +parseFloat(data.issue_village))
                res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                throw new Error('Transaction Aborted due to negative value')

            }
            const wholesUpdate = await WholesModel.update(
                {
                    date: data.Date,              
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    rcv_pw_210 : data.rcv_pw_210,
                    rcv_w_210 : data.rcv_w_210,
                    rcv_ww_210 : data.rcv_ww_210,
                    rcv_pw_240 : data.rcv_pw_240,
                    rcv_w_240 : data.rcv_w_240,
                    rcv_ww_240 : data.rcv_ww_240,
                    rcv_pw_280 : data.rcv_pw_280,
                    rcv_w_280 : data.rcv_w_280,
                    rcv_ww_280 : data.rcv_ww_280,
                    rcv_pw_320 : data.rcv_pw_320,
                    rcv_w_320 : data.rcv_w_320,
                    rcv_ww_320 : data.rcv_ww_320,
                    rcv_pw_360 : data.rcv_pw_360,
                    rcv_w_360 : data.rcv_w_360,
                    rcv_ww_360 : data.rcv_ww_360,
                    rcv_pw_400 : data.rcv_pw_400,
                    rcv_w_400 : data.rcv_w_400,
                    rcv_ww_400 : data.rcv_ww_400,
                    rcv_jb_mayur : data.rcv_jb_mayur,
                    rcv_jb_hamsa : data.rcv_jb_hamsa,
                    issue_pw_150 : data.issue_pw_150,
                    issue_w_150 : data.issue_w_150,
                    issue_ww_150 : data.issue_ww_150,
                    issue_s_150 : data.issue_s_150,
                    issue_aw_150 : data.issue_aw_150,
                    issue_lw_150 : data.issue_lw_150,
                    issue_pw_180 : data.issue_pw_180,
                    issue_w_180 : data.issue_w_180,
                    issue_ww_180 : data.issue_ww_180,
                    issue_s_180 : data.issue_s_180,
                    issue_aw_180 : data.issue_aw_180,
                    issue_lw_180 : data.issue_lw_180,
                    issue_pw_210 : data.issue_pw_210,
                    issue_w_210 : data.issue_w_210,
                    issue_ww_210 : data.issue_ww_210,
                    issue_s_210 : data.issue_s_210,
                    issue_aw_210 : data.issue_aw_210,
                    issue_lw_210 : data.issue_lw_210,
                    issue_pw_240 : data.issue_pw_240,
                    issue_w_240 : data.issue_w_240,
                    issue_ww_240 : data.issue_ww_240,
                    issue_ww_240_A : data.issue_ww_240_A,
                    issue_aw_240 : data.issue_aw_240,
                    issue_lw_240 : data.issue_lw_240,
                    issue_pw_280 : data.issue_pw_280,
                    issue_w_280 : data.issue_w_280,
                    issue_ww_280 : data.issue_ww_280,
                    issue_ww_280_A : data.issue_ww_280_A,
                    issue_aw_280 : data.issue_aw_280,
                    issue_lw_280 : data.issue_lw_280,
                    wholes_double : data.wholes_double,
                    issue_pw_320 : data.issue_pw_320,
                    issue_w_320 : data.issue_w_320,
                    issue_ww_320 : data.issue_ww_320,
                    issue_ww_320_A : data.issue_ww_320_A,
                    issue_aw_320 : data.issue_aw_320,
                    issue_lw_320 : data.issue_lw_320,
                    issue_pw_360 : data.issue_pw_360,
                    issue_w_360 : data.issue_w_360,
                    issue_ww_360 : data.issue_ww_360,
                    issue_ww_360_A : data.issue_ww_360_A,
                    issue_aw_360 : data.issue_aw_360,
                    issue_lw_360 : data.issue_lw_360,
                    issue_pw_400 : data.issue_pw_400,
                    issue_w_400 : data.issue_w_400,
                    issue_ww_400 : data.issue_ww_400,
                    issue_ww_400_A : data.issue_ww_400_A,
                    issue_aw_400 : data.issue_aw_400,
                    issue_lw_400 : data.issue_lw_400,
                    issue_jjb : data.issue_jjb,
                    issue_jjb1 : data.issue_jjb1,
                    issue_rejection : data.issue_rejection,
                    issue_village : data.issue_village,
                    issue_bigTaiho : data.issue_bigTaiho,
                    issue_lw : data.issue_lw,
                    issue_add_1 : data.issue_add_1,
                    issue_add_2 : data.issue_add_2,
                    issue_add_3 : data.issue_add_3,
                    issue_add_4 : data.issue_add_4,
                    issue_add_5 : data.issue_add_5,
                    issue_add_6 : data.issue_add_6,
                    issue_add_7 : data.issue_add_7,
                    issue_add_8 : data.issue_add_8,
                    issue_add_9 : data.issue_add_9,
                    issue_add_10 : data.issue_add_10,
                    entry_backlog: (parseFloat(data.issue_add_1)
                    //parseFloat(data.rcv_pw_210)+parseFloat(data.rcv_w_210)+parseFloat(data.rcv_ww_210)
                    //+parseFloat(data.rcv_pw_240)+parseFloat(data.rcv_w_240)+parseFloat(data.rcv_ww_240)
                    //+parseFloat(data.rcv_pw_280)+parseFloat(data.rcv_w_280)+parseFloat(data.rcv_ww_280)
                    //+parseFloat(data.rcv_pw_320)+parseFloat(data.rcv_w_320)+parseFloat(data.rcv_ww_320)
                    //+parseFloat(data.rcv_pw_360)+parseFloat(data.rcv_w_360)+parseFloat(data.rcv_ww_360)
                    //+parseFloat(data.rcv_pw_400)+parseFloat(data.rcv_w_400)+parseFloat(data.rcv_ww_400)
                    //+parseFloat(data.rcv_jb_hamsa)+parseFloat(data.rcv_jb_mayur)
                    )
                    - (parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
                    +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                       +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                         +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                             +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                 +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                                 +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                     +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                     +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                         +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                         +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                             +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                             +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                                 +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                                 +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                     +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                     +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                         +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                         +parseFloat(data.issue_village)
                        ),
                    current_backlog: (parseFloat(data.issue_add_1)
                    //parseFloat(data.rcv_pw_210)+parseFloat(data.rcv_w_210)+parseFloat(data.rcv_ww_210)
                    //+parseFloat(data.rcv_pw_240)+parseFloat(data.rcv_w_240)+parseFloat(data.rcv_ww_240)
                    //+parseFloat(data.rcv_pw_280)+parseFloat(data.rcv_w_280)+parseFloat(data.rcv_ww_280)
                    //+parseFloat(data.rcv_pw_320)+parseFloat(data.rcv_w_320)+parseFloat(data.rcv_ww_320)
                    //+parseFloat(data.rcv_pw_360)+parseFloat(data.rcv_w_360)+parseFloat(data.rcv_ww_360)
                    //+parseFloat(data.rcv_pw_400)+parseFloat(data.rcv_w_400)+parseFloat(data.rcv_ww_400)
                    //+parseFloat(data.rcv_jb_hamsa)+parseFloat(data.rcv_jb_mayur)
                    )
                    - (parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
                    +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                       +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                         +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                             +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                 +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                                 +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                     +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                     +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                         +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                         +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                             +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                             +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                                 +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                                 +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                     +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                     +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                         +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                         +parseFloat(data.issue_village)
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
            if (wholesUpdate) {

                // BigTaiho out/////////
                const bigT_backlog = await bigTaihoModel.findOne({
                    attributes: ['current_backlog','rcv_wholes'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(bigT_backlog)
                if (bigT_backlog && bigT_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_bigTaiho,
                        issueid:1,
                        date:data.Date,
                        fromSection:'Wholes',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy
                     },{transaction});
                     if(bigT_backlog.dataValues.rcv_wholes){
                        await bigTaihoModel.update(
                            { 
                                rcv_wholes:sequelize.literal(`rcv_wholes+ ${data.issue_bigTaiho}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
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
                        await bigTaihoModel.update(
                            { 
                                rcv_wholes:data.issue_bigTaiho,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
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
                    res.status(500).json({ message: "Error In Creating BigTaiho Transaction History" });
                    throw new Error('Transaction Aborted')
                } 


                // Rejection Out//

                const rejection_backlog = await rejectionModel.findOne({
                    attributes: ['current_backlog','rcv_wholes'],
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
                        fromSection:'Wholes',
                        toSection:'Rejection',
                        toSectionBeforeBacklog:rejection_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(rejection_backlog.dataValues.current_backlog)+parseFloat(data.issue_rejection),
                        createdBy: feeledBy
                     },{transaction});
                     if(rejection_backlog.dataValues.rcv_wholes){
                        await rejectionModel.update(
                            { 
                                rcv_wholes:sequelize.literal(`rcv_wholes+ ${data.issue_rejection}`),
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
                                rcv_wholes:data.issue_rejection,
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

                 // LW Out//

                 const LW_backlog = await LWModel.findOne({
                    attributes: ['current_backlog','rcv_wholes'],
                    where: {
                        lotNo:LotNO,
                        origin: data.origin,
                        latest:1
            
                    },
                    order: [['LotNo', 'ASC']]
            
                });
                console.log(LW_backlog)
                if (LW_backlog && LW_backlog.dataValues.current_backlog>=0){
                    await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_lw,
                        issueid:1,
                        date:data.Date,
                        fromSection:'Wholes',
                        toSection:'LW',
                        toSectionBeforeBacklog:LW_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(LW_backlog.dataValues.current_backlog)+parseFloat(data.issue_lw),
                        createdBy: feeledBy
                     },{transaction});
                     if(LW_backlog.dataValues.rcv_wholes){
                        await LWModel.update(
                            { 
                                rcv_wholes:sequelize.literal(`rcv_wholes+ ${data.issue_lw}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_lw}`)
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
                        await LWModel.update(
                            { 
                                rcv_wholes:data.issue_lw,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_lw}`)
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
                    res.status(500).json({ message: "Error In Creating LW Transaction History" });
                    throw new Error('Transaction Aborted')
                } 



                

                const lotupdate = await LotNo.update(
                    { 
                      modifiedBy:'Next Interconnected'
                    },
                    {
                        where: {
                            lotNo:LotNO
                        },transaction
                    }
                );
                const lotoriginupdate = await lotoriginmodel.update(
                    {
                        latest_section: 'Wholes',
                        wholesgradeStatus: 1
                    },
                    {
                        where: {
                            lotNo: LotNO,
                            origin: data.origin
                        }, transaction
                    }
                );
                if (lotupdate && lotoriginupdate) {
                    res.status(200).json({ message: "Wholes Entry Made Successfully" });
                }
                else {
                    console.log('No Need For Update')
                }
            }


        }

    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating BigTaiho Entry" ,error});
        }
    }
}

// //WholesTable.tsx
export const SearchRCNWholes = async (req: Request, res: Response) => {
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
             rcnEntries = await WholesModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                
            });
        }
        else{
             rcnEntries = await WholesModel.findAll({
                where,
                order: [['LotNo','DESC'],['origin','ASC'],['altid', 'ASC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }
       
        return res.status(200).json({ message: 'Wholes Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}
// //HamsaRecreate.tsx
export const CreateReissueHamsa= async (req: Request, res: Response) => {
   
    const timeToMilliseconds = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    };
    // Helper function to convert milliseconds to "HH:MM"
    const millisecondsToTime = (milliseconds: number) => {
        const totalMinutes = Math.floor(milliseconds / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const CalculatemachineOnOffTime = (time1: string, time2: string) => {
        const time1InMilliseconds = timeToMilliseconds(time1) - timeToMilliseconds(time2);
        if (time1InMilliseconds < 0) {
            return timeToMilliseconds(time1) - timeToMilliseconds(time2) + 24 * 60 * 60 * 1000;
        }
        return time1InMilliseconds;
    }


    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
            if (data.otherTime_1 === undefined || data.otherTime_1 === null) {
                data.otherTime_1 = '00:00'
            }
            if (data.Mc_breakdown_1 === undefined || data.Mc_breakdown_1 === null) {
                data.Mc_breakdown_1 = '00:00'
            }
            if (data.otherTime_2 === undefined || data.otherTime_2 === null) {
                data.otherTime_2 = '00:00'
            }
            if (data.Mc_breakdown_2 === undefined || data.Mc_breakdown_2 === null) {
                data.Mc_breakdown_2 = '00:00'
            }
            if (data.otherTime_3 === undefined || data.otherTime_3 === null) {
                data.otherTime_3 = '00:00'
            }
            if (data.Mc_breakdown_3 === undefined || data.Mc_breakdown_3 === null) {
                data.Mc_breakdown_3 = '00:00'
            }
            if (data.Mc_breakdown_4 === undefined || data.Mc_breakdown_4 === null) {
                data.Mc_breakdown_4 = '00:00'
            }
            if (data.otherTime_4 === undefined || data.otherTime_4 === null) {
                data.otherTime_4 = '00:00'
            }
            if (data.otherTime_5 === undefined || data.otherTime_5 === null) {
                data.otherTime_5 = '00:00'
            }
            if (data.Mc_breakdown_5 === undefined || data.Mc_breakdown_5 === null) {
                data.Mc_breakdown_5 = '00:00'
            }
            if (data.otherTime_6 === undefined || data.otherTime_6 === null) {
                data.otherTime_6 = '00:00'
            }
            if (data.Mc_breakdown_6 === undefined || data.Mc_breakdown_6 === null) {
                data.Mc_breakdown_6 = '00:00'
            }
            
            const runtime1 = CalculatemachineOnOffTime(data.Mc_off_1, data.Mc_on_1) -
                (timeToMilliseconds(data.Mc_breakdown_1) + timeToMilliseconds(data.otherTime_1))
            const runtime2 = CalculatemachineOnOffTime(data.Mc_off_2, data.Mc_on_2) -
                (timeToMilliseconds(data.Mc_breakdown_2) + timeToMilliseconds(data.otherTime_2))
            const runtime3 = CalculatemachineOnOffTime(data.Mc_off_3, data.Mc_on_3) -
                (timeToMilliseconds(data.Mc_breakdown_3) + timeToMilliseconds(data.otherTime_3))
            const runtime4= CalculatemachineOnOffTime(data.Mc_off_4, data.Mc_on_4) -
                (timeToMilliseconds(data.Mc_breakdown_4) + timeToMilliseconds(data.otherTime_4))        
            const runtime5 = CalculatemachineOnOffTime(data.Mc_off_5, data.Mc_on_5) -
                (timeToMilliseconds(data.Mc_breakdown_5) + timeToMilliseconds(data.otherTime_5))
            const runtime6 = CalculatemachineOnOffTime(data.Mc_off_6, data.Mc_on_6) -
                (timeToMilliseconds(data.Mc_breakdown_6) + timeToMilliseconds(data.otherTime_6))
             
             
            if (runtime1 < 0) {
                res.status(500).json({ message: "Machine BigTaiho Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime2 < 0) {
                res.status(500).json({ message: "Machine Spectrum Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime3 < 0) {
                res.status(500).json({ message: "Machine Amrita Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime4 < 0) {
                res.status(500).json({ message: "Machine Hamsa-4 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime5 < 0) {
                res.status(500).json({ message: "Machine Hamsa-5 Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
            if (runtime6 < 0) {
                res.status(500).json({ message: "Machine Spectrum Run Time can not be negative" });
                throw new Error('Transaction Aborted 1')
            }
           
          
            
            const Mc_runTime1 = millisecondsToTime(runtime1);
            const Mc_runTime2 = millisecondsToTime(runtime2);
            const Mc_runTime3 = millisecondsToTime(runtime3);
            const Mc_runTime4 = millisecondsToTime(runtime4);
            const Mc_runTime5 = millisecondsToTime(runtime5);
            const Mc_runTime6 = millisecondsToTime(runtime6);


            //const totalOut=parseFloat(data.OutputWholes) + parseFloat(data.OutputPieces)
            if(parseFloat(data.rcv_opening)< (parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                   +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                     +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                     +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                     +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                     +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                     +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                     +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                     +parseFloat(data.issue_jb)))
                {
                 console.log(parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                 +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                    +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                      +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                      +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                      +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                      +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                      +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                      +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                      +parseFloat(data.issue_jb)
                  )
                 res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                 throw new Error('Transaction Aborted due to negative value')
 
             }
            
            const hamsaupdate=await hamsaModel.update(
                {
                    latest:0
                    
                },{
                    where: {
                        id: data.id
                    }, transaction
                }
                   
                
            );
            if(hamsaupdate)
            {
                const reissuecreate=await hamsaModel.create(
                    {     
                        date:data.Date,
                        altid:parseInt(data.alt_id)+1,
                        LotNo:data.LotNo,
                        origin:data.origin,
                        mixingLot:data.mixingLot,
                        rcv_pw_w:data.rcv_pw_w ,
                        rcv_w_lot:data.rcv_w_lot,
                        rcv_ww:data.rcv_ww,
                        rcv_village:data.rcv_village,
                        rcv_lw:data.rcv_lw,     
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                        Mc_on_1: data.Mc_on_1,
                        Mc_off_1: data.Mc_off_1,
                        Mc_runTime_1: Mc_runTime1,
                        Mc_breakdown_1: data.Mc_breakdown_1,
                        otherTime_1: data.otherTime_1,
                        Mc_on_2: data.Mc_on_2,
                        Mc_off_2: data.Mc_off_2,
                        Mc_runTime_2: Mc_runTime2,
                        Mc_breakdown_2: data.Mc_breakdown_2,
                        otherTime_2: data.otherTime_2,
                        Mc_on_3: data.Mc_on_3,
                        Mc_off_3: data.Mc_off_3,
                        Mc_runTime_3: Mc_runTime3,
                        Mc_breakdown_3: data.Mc_breakdown_3,
                        otherTime_3: data.otherTime_3,
                        Mc_on_4: data.Mc_on_4,
                        Mc_off_4: data.Mc_off_4,
                        Mc_runTime_4: Mc_runTime4,
                        Mc_breakdown_4: data.Mc_breakdown_4,
                        otherTime_4: data.otherTime_4,
                        Mc_on_5: data.Mc_on_5,
                        Mc_off_5: data.Mc_off_5,
                        Mc_runTime_5: Mc_runTime5,
                        Mc_breakdown_5: data.Mc_breakdown_5,
                        otherTime_5: data.otherTime_5,
                        Mc_on_6: data.Mc_on_6,
                        Mc_off_6: data.Mc_off_6,
                        Mc_runTime_6: Mc_runTime6,
                        Mc_breakdown_6: data.Mc_breakdown_6,
                        otherTime_6: data.otherTime_6,
                        issue_pw_210: data.issue_pw_210,
                        issue_w_210: data.issue_w_210,
                        issue_ww_210: data.issue_ww_210,
                        issue_pw_240:data.issue_pw_240,
                        issue_w_240: data.issue_w_240,
                        issue_ww_240: data.issue_ww_240,
                        issue_pw_280:data.issue_pw_280,
                        issue_w_280:   data.issue_w_280,
                        issue_ww_280: data.issue_ww_280,
                        issue_pw_320:data.issue_pw_320,
                        issue_w_320: data.issue_w_320,
                        issue_ww_320: data.issue_ww_320,
                        issue_pw_400: data.issue_pw_400,
                        issue_w_400:  data.issue_w_400,
                        issue_ww_400:  data.issue_ww_400,    
                        issue_add_1: data.issue_add_1,
                        issue_add_2: data.issue_add_2,
                        issue_add_3:data.issue_add_3,
                        issue_add_4: data.issue_add_4,
                        issue_add_5: data.issue_add_5,
                        issue_add_6: data.issue_add_6,
                        issue_add_7: data.issue_add_7,
                        issue_add_8: data.issue_add_8,
                        issue_add_9: data.issue_add_9,
                        issue_add_10: data.issue_add_10,
                        issue_lw: data.issue_lw,
                        issue_bigTaiho: data.issue_bigTaiho,
                        issue_jb: data.issue_jb,
                        entry_backlog: parseFloat(data.rcv_opening)
                        - (parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                            +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                            +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                             +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                             +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                             +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                             +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                             +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                             +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                             +parseFloat(data.issue_jb)
                            ),
                        current_backlog: parseFloat(data.rcv_opening)
                        - (parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                             +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                             +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                             +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                             +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                             +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                             +parseFloat(data.issue_add_4)+parseFloat(data.issue_add_5)+parseFloat(data.issue_add_6)
                             +parseFloat(data.issue_add_7)+parseFloat(data.issue_add_8)+parseFloat(data.issue_add_9)
                             +parseFloat(data.issue_add_10)+parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)
                             +parseFloat(data.issue_jb)
                            ),
                        Status: 1,
                        CreatedBy: feeledBy 
                    },
                    {
                        transaction
                    }
                );
                if(reissuecreate)
                {
                    // BigTaiho Out
                    const bigT_backlog = await bigTaihoModel.findOne({
                        attributes: ['current_backlog','rcv_hamsa'],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(bigT_backlog)
                    if (bigT_backlog && bigT_backlog.dataValues.current_backlog>=0)
                    {
                        await sectionTransfer.create({              
                        LotNo:LotNO,
                        origin:data.origin,
                        amount:data.issue_bigTaiho,
                        date:data.Date,
                        fromSection:'Hamsa',
                        toSection:'BigTaiho',
                        toSectionBeforeBacklog:bigT_backlog.dataValues.current_backlog,
                        toSectionAfterBacklog:parseFloat(bigT_backlog.dataValues.current_backlog)+parseFloat(data.issue_bigTaiho),
                        createdBy: feeledBy,
                        issueid:parseInt(data.alt_id)+1,
                        },{transaction});
                        if(bigT_backlog.dataValues.rcv_hamsa)
                            {
                        await bigTaihoModel.update(
                            { 
                                rcv_hamsa:sequelize.literal(`rcv_hamsa+ ${data.issue_bigTaiho}`),
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
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
                        await bigTaihoModel.update(
                            { 
                                rcv_hamsa:data.issue_bigTaiho,
                                current_backlog:sequelize.literal(`current_backlog+ ${data.issue_bigTaiho}`)
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
                        res.status(500).json({ message: "Error In Creating Reissue Hamsa Transaction History" });
                        throw new Error('Transaction Aborted')
                    }  

                    // Wholes Out
                     const wholes_backlog = await WholesModel.findOne({
                        attributes: ['current_backlog','rcv_jb_hamsa'
                            ,'rcv_pw_210','rcv_w_210','rcv_ww_210',
                            'rcv_pw_240','rcv_w_240','rcv_ww_240',
                            'rcv_pw_280','rcv_w_280','rcv_ww_280',
                            'rcv_pw_320','rcv_w_320','rcv_ww_320',
                            'rcv_pw_360','rcv_w_360','rcv_ww_360',
                            'rcv_pw_400','rcv_w_400','rcv_ww_400'
                        ],
                        where: {
                            lotNo:LotNO,
                            origin: data.origin,
                            latest:1
                
                        },
                        order: [['LotNo', 'ASC']]
                
                    });
                    console.log(wholes_backlog)
                    if (wholes_backlog && wholes_backlog.dataValues.current_backlog>=0){  
                        await sectionTransfer.create({              
                            LotNo:LotNO,
                            origin:data.origin,
                            amount:parseFloat(data.issue_pw_210)
                            +parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                        +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)
                        +parseFloat(data.issue_ww_240)+parseFloat(data.issue_pw_280)
                        +parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                        +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                        +parseFloat(data.issue_ww_320)+parseFloat(data.issue_add_1)
                        +parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                        +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                        +parseFloat(data.issue_ww_400)+parseFloat(data.issue_jb),
                            issueid:parseInt(data.alt_id)+1,
                            date:data.Date,
                            fromSection:'Hamsa',
                            toSection:'Wholes',
                            toSectionBeforeBacklog:wholes_backlog.dataValues.current_backlog,
                            toSectionAfterBacklog:parseFloat(wholes_backlog.dataValues.current_backlog)+parseFloat(data.issue_pw_210)
                            +parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                        +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)
                        +parseFloat(data.issue_ww_240)+parseFloat(data.issue_pw_280)
                        +parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                        +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                        +parseFloat(data.issue_ww_320)+parseFloat(data.issue_add_1)
                        +parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                        +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                        +parseFloat(data.issue_ww_400)+parseFloat(data.issue_jb),
                            createdBy: feeledBy
                         },{transaction});

                        if(wholes_backlog.dataValues.rcv_pw_210 && wholes_backlog.dataValues.rcv_w_210 && wholes_backlog.dataValues.rcv_ww_210
                            && wholes_backlog.dataValues.rcv_pw_240 && wholes_backlog.dataValues.rcv_w_240 && wholes_backlog.dataValues.rcv_ww_240
                            && wholes_backlog.dataValues.rcv_pw_280 && wholes_backlog.dataValues.rcv_w_280 && wholes_backlog.dataValues.rcv_ww_280
                            && wholes_backlog.dataValues.rcv_pw_320 && wholes_backlog.dataValues.rcv_w_320 && wholes_backlog.dataValues.rcv_ww_320
                            && wholes_backlog.dataValues.rcv_pw_360 && wholes_backlog.dataValues.rcv_w_360 && wholes_backlog.dataValues.rcv_ww_360
                            && wholes_backlog.dataValues.rcv_pw_400 && wholes_backlog.dataValues.rcv_w_400 && wholes_backlog.dataValues.rcv_ww_400
                            && wholes_backlog.dataValues.rcv_jb_hamsa
                        )
                            {
                                
                                await WholesModel.update(
                                    { 
                                        rcv_pw_210:sequelize.literal(`rcv_pw_210+ ${data.issue_pw_210}`),
                                        rcv_w_210:sequelize.literal(`rcv_w_210+ ${data.issue_w_210}`),
                                        rcv_ww_210:sequelize.literal(`rcv_ww_210+ ${data.issue_ww_210}`),
                                        rcv_pw_240:sequelize.literal(`rcv_pw_240+ ${data.issue_pw_240}`),
                                        rcv_w_240:sequelize.literal(`rcv_w_240+ ${data.issue_w_240}`),
                                        rcv_ww_240:sequelize.literal(`rcv_ww_240+ ${data.issue_ww_240}`),
                                        rcv_pw_280:sequelize.literal(`rcv_pw_280+ ${data.issue_pw_280}`),
                                        rcv_w_280:sequelize.literal(`rcv_w_280+ ${data.issue_w_280}`),
                                        rcv_ww_280:sequelize.literal(`rcv_ww_280+ ${data.issue_ww_280}`),
                                        rcv_pw_320:sequelize.literal(`rcv_pw_320+ ${data.issue_pw_320}`),
                                        rcv_w_320:sequelize.literal(`rcv_w_320+ ${data.issue_w_320}`),
                                        rcv_ww_320:sequelize.literal(`rcv_ww_320+ ${data.issue_ww_320}`),
                                        rcv_pw_360:sequelize.literal(`rcv_pw_360+ ${data.issue_add_1}`),
                                        rcv_w_360:sequelize.literal(`rcv_w_360+ ${data.issue_add_2}`),
                                        rcv_ww_360:sequelize.literal(`rcv_ww_360+ ${data.issue_add_3}`),
                                        rcv_pw_400:sequelize.literal(`rcv_pw_400+ ${data.issue_pw_400}`),
                                        rcv_w_400:sequelize.literal(`rcv_w_400+ ${data.issue_w_400}`),
                                        rcv_ww_400:sequelize.literal(`rcv_ww_400+ ${data.issue_ww_400}`),
                                        rcv_jb_hamsa:sequelize.literal(`rcv_jb_hamsa+ ${data.issue_jb}`),

                                      
                                        current_backlog:sequelize.literal(`current_backlog+
                                             ${parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                            +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                            +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                            +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                                            +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                                            +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                                            +parseFloat(data.issue_jb)
                                        }`)
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
                                await WholesModel.update(
                                    { 
                                        rcv_pw_210:data.issue_pw_210,
                                        rcv_w_210:data.issue_w_210,
                                        rcv_ww_210:data.issue_ww_210,
                                        rcv_pw_240:data.issue_pw_240,
                                        rcv_w_240:data.issue_w_240,
                                        rcv_ww_240:data.issue_ww_240,
                                        rcv_pw_280:data.issue_pw_280,
                                        rcv_w_280:data.issue_w_280,
                                        rcv_ww_280:data.issue_ww_280,
                                        rcv_pw_320:data.issue_pw_320,
                                        rcv_w_320:data.issue_w_320,
                                        rcv_ww_320:data.issue_ww_320,
                                        rcv_pw_360:data.issue_add_1,
                                        rcv_w_360:data.issue_add_2,
                                        rcv_ww_360:data.issue_add_3,
                                        rcv_pw_400:data.issue_pw_400,
                                        rcv_w_400:data.issue_w_400,
                                        rcv_ww_400:data.issue_ww_400_A,
                                        rcv_jb_hamsa:data.issue_jb,
                                        current_backlog:sequelize.literal(`current_backlog+
                                            ${parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                           +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                           +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                           +parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)+parseFloat(data.issue_ww_320)
                                           +parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)+parseFloat(data.issue_ww_400)
                                           +parseFloat(data.issue_add_1)+parseFloat(data.issue_add_2)+parseFloat(data.issue_add_3)
                                           +parseFloat(data.issue_jb)
                                        }`)
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
                        res.status(500).json({ message: "Error In Creating Wholes Entry" });
                        throw new Error('Transaction Aborted')
                    } 



                    const lotupdate = await lotoriginmodel.update(
                        {
                            latest_section: 'Hamsa',
                            hansaStatus: 1
                        },
                        {
                            where: {
                                lotNo: LotNO,
                                origin: data.origin
                            }, transaction
                        }
                        );
                        if (lotupdate) {
                        res.status(200).json({ message: "Hamsa Re-Issue Entry Made Successfully" });
                        }
                        else {
                        console.log('No Need For Update')
                        }
                }
                else{
                    return res.status(500).json({ message: "Error while creating Hamsa Re Issue Entry"});
                }
            }     
        }
    })
    }
    catch(error) {
        if(!res.headersSent){
            console.log(error)
            return res.status(500).json({ message: "Error while creating Hamsa Re-Issue Entry" ,error});
        }
    }
    


}

export const updateEntireWholes= async (req: Request, res: Response) => {
    

    try{
    const feeledBy = req.cookies.user;
    const linehumid = req.body.linehumid
    const LotNO = req.body.LotNo

    

    await sequelize.transaction(async (transaction: any) => {

        for (let data of linehumid) 
        {
         
 
            if((parseFloat(data.rcv_pw_210)+parseFloat(data.rcv_w_210)+parseFloat(data.rcv_ww_210)
                +parseFloat(data.rcv_pw_240)+parseFloat(data.rcv_w_240)+parseFloat(data.rcv_ww_240)
                +parseFloat(data.rcv_pw_280)+parseFloat(data.rcv_w_280)+parseFloat(data.rcv_ww_280)
                +parseFloat(data.rcv_pw_320)+parseFloat(data.rcv_w_320)+parseFloat(data.rcv_ww_320)
                +parseFloat(data.rcv_pw_360)+parseFloat(data.rcv_w_360)+parseFloat(data.rcv_ww_360)
                +parseFloat(data.rcv_pw_400)+parseFloat(data.rcv_w_400)+parseFloat(data.rcv_ww_400)
                +parseFloat(data.rcv_jb_hamsa)+parseFloat(data.rcv_jb_mayur)
                   
               )< (parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
               +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                  +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                    +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                        +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                            +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                            +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                    +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                    +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                        +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                        +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                            +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                            +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                    +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                    +parseFloat(data.issue_village)
             
                   ))
                   {
                    console.log(parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
                    +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                       +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                         +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                             +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                 +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                                 +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                     +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                     +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                         +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                         +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                             +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                             +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                                 +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                                 +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                     +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                     +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                         +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                         +parseFloat(data.issue_village))
                    res.status(500).json({ message: "Backlog can't be Greater Than Input" });
                    throw new Error('Transaction Aborted due to negative value')

            }
            
            await WholesEditModel.create(
                {     
                    id:data.id,
                    date:data.Date,
                    LotNo:LotNO,
                    origin:data.origin,
                    altid:data.alt_id,
                    mixingLot:data.mixingLot,
                                
                    noOfdayOperators: data.dayoperator,
                    noOfnightOperators: data.nightoperator,
                    rcv_pw_210 : data.rcv_pw_210,
                    rcv_w_210 : data.rcv_w_210,
                    rcv_ww_210 : data.rcv_ww_210,
                    rcv_pw_240 : data.rcv_pw_240,
                    rcv_w_240 : data.rcv_w_240,
                    rcv_ww_240 : data.rcv_ww_240,
                    rcv_pw_280 : data.rcv_pw_280,
                    rcv_w_280 : data.rcv_w_280,
                    rcv_ww_280 : data.rcv_ww_280,
                    rcv_pw_320 : data.rcv_pw_320,
                    rcv_w_320 : data.rcv_w_320,
                    rcv_ww_320 : data.rcv_ww_320,
                    rcv_pw_360 : data.rcv_pw_360,
                    rcv_w_360 : data.rcv_w_360,
                    rcv_ww_360 : data.rcv_ww_360,
                    rcv_pw_400 : data.rcv_pw_400,
                    rcv_w_400 : data.rcv_w_400,
                    rcv_ww_400 : data.rcv_ww_400,
                    rcv_jb_mayur : data.rcv_jb_mayur,
                    rcv_jb_hamsa : data.rcv_jb_hamsa,
                    issue_pw_150 : data.issue_pw_150,
                    issue_w_150 : data.issue_w_150,
                    issue_ww_150 : data.issue_ww_150,
                    issue_s_150 : data.issue_s_150,
                    issue_aw_150 : data.issue_aw_150,
                    issue_lw_150 : data.issue_lw_150,
                    issue_pw_180 : data.issue_pw_180,
                    issue_w_180 : data.issue_w_180,
                    issue_ww_180 : data.issue_ww_180,
                    issue_s_180 : data.issue_s_180,
                    issue_aw_180 : data.issue_aw_180,
                    issue_lw_180 : data.issue_lw_180,
                    issue_pw_210 : data.issue_pw_210,
                    issue_w_210 : data.issue_w_210,
                    issue_ww_210 : data.issue_ww_210,
                    issue_s_210 : data.issue_s_210,
                    issue_aw_210 : data.issue_aw_210,
                    issue_lw_210 : data.issue_lw_210,
                    issue_pw_240 : data.issue_pw_240,
                    issue_w_240 : data.issue_w_240,
                    issue_ww_240 : data.issue_ww_240,
                    issue_ww_240_A : data.issue_ww_240_A,
                    issue_aw_240 : data.issue_aw_240,
                    issue_lw_240 : data.issue_lw_240,
                    issue_pw_280 : data.issue_pw_280,
                    issue_w_280 : data.issue_w_280,
                    issue_ww_280 : data.issue_ww_280,
                    issue_ww_280_A : data.issue_ww_280_A,
                    issue_aw_280 : data.issue_aw_280,
                    issue_lw_280 : data.issue_lw_280,
                    wholes_double : data.wholes_double,
                    issue_pw_320 : data.issue_pw_320,
                    issue_w_320 : data.issue_w_320,
                    issue_ww_320 : data.issue_ww_320,
                    issue_ww_320_A : data.issue_ww_320_A,
                    issue_aw_320 : data.issue_aw_320,
                    issue_lw_320 : data.issue_lw_320,
                    issue_pw_360 : data.issue_pw_360,
                    issue_w_360 : data.issue_w_360,
                    issue_ww_360 : data.issue_ww_360,
                    issue_ww_360_A : data.issue_ww_360_A,
                    issue_aw_360 : data.issue_aw_360,
                    issue_lw_360 : data.issue_lw_360,
                    issue_pw_400 : data.issue_pw_400,
                    issue_w_400 : data.issue_w_400,
                    issue_ww_400 : data.issue_ww_400,
                    issue_ww_400_A : data.issue_ww_400_A,
                    issue_aw_400 : data.issue_aw_400,
                    issue_lw_400 : data.issue_lw_400,
                    issue_jjb : data.issue_jjb,
                    issue_jjb1 : data.issue_jjb1,
                    issue_rejection : data.issue_rejection,
                    issue_village : data.issue_village,
                    issue_bigTaiho : data.issue_bigTaiho,
                    issue_lw : data.issue_lw,
                    issue_add_1 : data.issue_add_1,
                    issue_add_2 : data.issue_add_2,
                    issue_add_3 : data.issue_add_3,
                    issue_add_4 : data.issue_add_4,
                    issue_add_5 : data.issue_add_5,
                    issue_add_6 : data.issue_add_6,
                    issue_add_7 : data.issue_add_7,
                    issue_add_8 : data.issue_add_8,
                    issue_add_9 : data.issue_add_9,
                    issue_add_10 : data.issue_add_10,
                    entry_backlog: (parseFloat(data.rcv_pw_210)+parseFloat(data.rcv_w_210)+parseFloat(data.rcv_ww_210)
                    +parseFloat(data.rcv_pw_240)+parseFloat(data.rcv_w_240)+parseFloat(data.rcv_ww_240)
                    +parseFloat(data.rcv_pw_280)+parseFloat(data.rcv_w_280)+parseFloat(data.rcv_ww_280)
                    +parseFloat(data.rcv_pw_320)+parseFloat(data.rcv_w_320)+parseFloat(data.rcv_ww_320)
                    +parseFloat(data.rcv_pw_360)+parseFloat(data.rcv_w_360)+parseFloat(data.rcv_ww_360)
                    +parseFloat(data.rcv_pw_400)+parseFloat(data.rcv_w_400)+parseFloat(data.rcv_ww_400)
                    +parseFloat(data.rcv_jb_hamsa)+parseFloat(data.rcv_jb_mayur))
                    - (parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
                    +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                       +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                         +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                             +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                 +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                                 +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                     +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                     +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                         +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                         +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                             +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                             +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                                 +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                                 +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                     +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                     +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                         +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                         +parseFloat(data.issue_village)
                        ),
                    current_backlog: (parseFloat(data.rcv_pw_210)+parseFloat(data.rcv_w_210)+parseFloat(data.rcv_ww_210)
                    +parseFloat(data.rcv_pw_240)+parseFloat(data.rcv_w_240)+parseFloat(data.rcv_ww_240)
                    +parseFloat(data.rcv_pw_280)+parseFloat(data.rcv_w_280)+parseFloat(data.rcv_ww_280)
                    +parseFloat(data.rcv_pw_320)+parseFloat(data.rcv_w_320)+parseFloat(data.rcv_ww_320)
                    +parseFloat(data.rcv_pw_360)+parseFloat(data.rcv_w_360)+parseFloat(data.rcv_ww_360)
                    +parseFloat(data.rcv_pw_400)+parseFloat(data.rcv_w_400)+parseFloat(data.rcv_ww_400)
                    +parseFloat(data.rcv_jb_hamsa)+parseFloat(data.rcv_jb_mayur))
                    - (parseFloat(data.issue_pw_150)+parseFloat(data.issue_w_150)+parseFloat(data.issue_ww_150)
                    +parseFloat(data.issue_s_150)+parseFloat(data.issue_aw_150)+parseFloat(data.issue_lw_150)
                       +parseFloat(data.issue_pw_180)+parseFloat(data.issue_w_180)+parseFloat(data.issue_ww_180)
                         +parseFloat(data.issue_s_180)+parseFloat(data.issue_aw_180)+parseFloat(data.issue_lw_180)
                             +parseFloat(data.issue_pw_210)+parseFloat(data.issue_w_210)+parseFloat(data.issue_ww_210)
                                 +parseFloat(data.issue_s_210)+parseFloat(data.issue_aw_210)+parseFloat(data.issue_lw_210)
                                 +parseFloat(data.issue_pw_240)+parseFloat(data.issue_w_240)+parseFloat(data.issue_ww_240)
                                     +parseFloat(data.issue_ww_240_A)+parseFloat(data.issue_aw_240)+parseFloat(data.issue_lw_240)
                                     +parseFloat(data.issue_pw_280)+parseFloat(data.issue_w_280)+parseFloat(data.issue_ww_280)
                                         +parseFloat(data.issue_ww_280_A)+parseFloat(data.issue_aw_280)+parseFloat(data.issue_lw_280)
                                         +parseFloat(data.wholes_double)+parseFloat(data.issue_pw_320)+parseFloat(data.issue_w_320)
                                             +parseFloat(data.issue_ww_320)+parseFloat(data.issue_ww_320_A)+parseFloat(data.issue_aw_320)
                                             +parseFloat(data.issue_lw_320)+parseFloat(data.issue_pw_360)+parseFloat(data.issue_w_360)
                                                 +parseFloat(data.issue_ww_360)+parseFloat(data.issue_ww_360_A)+parseFloat(data.issue_aw_360)
                                                 +parseFloat(data.issue_lw_360)+parseFloat(data.issue_pw_400)+parseFloat(data.issue_w_400)
                                                     +parseFloat(data.issue_ww_400)+parseFloat(data.issue_ww_400_A)+parseFloat(data.issue_aw_400)
                                                     +parseFloat(data.issue_lw_400)+parseFloat(data.issue_jjb)+parseFloat(data.issue_jjb1)
                                                         +parseFloat(data.issue_lw)+parseFloat(data.issue_bigTaiho)+parseFloat(data.issue_rejection)
                                                         +parseFloat(data.issue_village)
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
            const lotupdate= await WholesModel.update({
                    editStatus:'Pending'
                },
                 {
                     where: {
                         id: data.id
                     }, transaction
                 });

                 
                 if(lotupdate){
                   
                    const data = await WhatsappMsg("Wholes Grading", feeledBy,"modify_request","Production")
                    console.log(data)
                    return res.status(201).json({ message: "Edit Request of Wholes Entry Raised successfully" });
               
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
            return res.status(500).json({ message: "Error while Editing Hamsa Entry" ,error});
        }
    }
    


}

export const approveWholes = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const LotNo = req.params.LotNo;
        const origin = req.params.origin;
        const approvedBy = req.cookies.user;
        // const approvedBy = "RC Admin 1";
        if (!id || !approvedBy) {
            return res.status(400).json({ message: "Please provide the id or approved by" });
        }
        const data = await WholesEditModel.findOne({
            where: {
                id
            }
        }) as any;
        
        if (!data) {
            return res.status(400).json({ message: "Wholes Edit Entry not found" });
        }
        else{
            const transferBigTdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Wholes',
                    toSection:'BigTaiho'
                }
            }) as any

            const transferRejectiondata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Wholes',
                    toSection:'Rejection'
                }
            }) as any

            const transferLWdata = await sectionTransfer.findOne({
                where: {
                    issueid:data.altid,
                    LotNo:data.LotNo,
                    origin:data.origin,
                    fromSection:'Wholes',
                    toSection:'LW'
                }
            }) as any

            if(transferBigTdata &&  transferRejectiondata && transferLWdata){
                await sequelize.transaction(async (transaction: any) => {

                    const BigTEdit = await WholesModel.update({
                        date: data.Date,              
                        noOfdayOperators: data.dayoperator,
                        noOfnightOperators: data.nightoperator,
                       
    
                        rcv_pw_210 : data.rcv_pw_210,
                    rcv_w_210 : data.rcv_w_210,
                    rcv_ww_210 : data.rcv_ww_210,
                    rcv_pw_240 : data.rcv_pw_240,
                    rcv_w_240 : data.rcv_w_240,
                    rcv_ww_240 : data.rcv_ww_240,
                    rcv_pw_280 : data.rcv_pw_280,
                    rcv_w_280 : data.rcv_w_280,
                    rcv_ww_280 : data.rcv_ww_280,
                    rcv_pw_320 : data.rcv_pw_320,
                    rcv_w_320 : data.rcv_w_320,
                    rcv_ww_320 : data.rcv_ww_320,
                    rcv_pw_360 : data.rcv_pw_360,
                    rcv_w_360 : data.rcv_w_360,
                    rcv_ww_360 : data.rcv_ww_360,
                    rcv_pw_400 : data.rcv_pw_400,
                    rcv_w_400 : data.rcv_w_400,
                    rcv_ww_400 : data.rcv_ww_400,
                    rcv_jb_mayur : data.rcv_jb_mayur,
                    rcv_jb_hamsa : data.rcv_jb_hamsa,
                    issue_pw_150 : data.issue_pw_150,
                    issue_w_150 : data.issue_w_150,
                    issue_ww_150 : data.issue_ww_150,
                    issue_s_150 : data.issue_s_150,
                    issue_aw_150 : data.issue_aw_150,
                    issue_lw_150 : data.issue_lw_150,
                    issue_pw_180 : data.issue_pw_180,
                    issue_w_180 : data.issue_w_180,
                    issue_ww_180 : data.issue_ww_180,
                    issue_s_180 : data.issue_s_180,
                    issue_aw_180 : data.issue_aw_180,
                    issue_lw_180 : data.issue_lw_180,
                    issue_pw_210 : data.issue_pw_210,
                    issue_w_210 : data.issue_w_210,
                    issue_ww_210 : data.issue_ww_210,
                    issue_s_210 : data.issue_s_210,
                    issue_aw_210 : data.issue_aw_210,
                    issue_lw_210 : data.issue_lw_210,
                    issue_pw_240 : data.issue_pw_240,
                    issue_w_240 : data.issue_w_240,
                    issue_ww_240 : data.issue_ww_240,
                    issue_ww_240_A : data.issue_ww_240_A,
                    issue_aw_240 : data.issue_aw_240,
                    issue_lw_240 : data.issue_lw_240,
                    issue_pw_280 : data.issue_pw_280,
                    issue_w_280 : data.issue_w_280,
                    issue_ww_280 : data.issue_ww_280,
                    issue_ww_280_A : data.issue_ww_280_A,
                    issue_aw_280 : data.issue_aw_280,
                    issue_lw_280 : data.issue_lw_280,
                    wholes_double : data.wholes_double,
                    issue_pw_320 : data.issue_pw_320,
                    issue_w_320 : data.issue_w_320,
                    issue_ww_320 : data.issue_ww_320,
                    issue_ww_320_A : data.issue_ww_320_A,
                    issue_aw_320 : data.issue_aw_320,
                    issue_lw_320 : data.issue_lw_320,
                    issue_pw_360 : data.issue_pw_360,
                    issue_w_360 : data.issue_w_360,
                    issue_ww_360 : data.issue_ww_360,
                    issue_ww_360_A : data.issue_ww_360_A,
                    issue_aw_360 : data.issue_aw_360,
                    issue_lw_360 : data.issue_lw_360,
                    issue_pw_400 : data.issue_pw_400,
                    issue_w_400 : data.issue_w_400,
                    issue_ww_400 : data.issue_ww_400,
                    issue_ww_400_A : data.issue_ww_400_A,
                    issue_aw_400 : data.issue_aw_400,
                    issue_lw_400 : data.issue_lw_400,
                    issue_jjb : data.issue_jjb,
                    issue_jjb1 : data.issue_jjb1,
                    issue_rejection : data.issue_rejection,
                    issue_village : data.issue_village,
                    issue_bigTaiho : data.issue_bigTaiho,
                    issue_lw : data.issue_lw,
                    issue_add_1 : data.issue_add_1,
                    issue_add_2 : data.issue_add_2,
                    issue_add_3 : data.issue_add_3,
                    issue_add_4 : data.issue_add_4,
                    issue_add_5 : data.issue_add_5,
                    issue_add_6 : data.issue_add_6,
                    issue_add_7 : data.issue_add_7,
                    issue_add_8 : data.issue_add_8,
                    issue_add_9 : data.issue_add_9,
                    issue_add_10 : data.issue_add_10,
                        
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
                        console.log(transferBigTdata)
                    
                        if(parseFloat(transferBigTdata.amount)!==parseFloat(data.issue_bigTaiho)){
                            console.log('Needs Update In BigTaiho')
                            const difference_bigT=parseFloat(data.issue_bigTaiho)-parseFloat(transferBigTdata.amount)
                            console.log(difference_bigT)
                            const backlog = await bigTaihoModel.findOne({
                                attributes: ['current_backlog','rcv_wholes'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await bigTaihoModel.update(
                                    {
                                        rcv_wholes: sequelize.literal(`rcv_wholes+ ${difference_bigT}`),
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
                                    amount:data.issue_bigTaiho,
                                    toSectionBeforeBacklog:transferBigTdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferBigTdata.toSectionBeforeBacklog)+parseFloat(data.issue_bigTaiho)
                        
                                }, {
                                    where: {
                                        id:transferBigTdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated BigTaiho Entry Not Found" });
                                    throw new Error('Transaction Aborted due to Improper Value')
                                }
                        }

                        if(parseFloat(transferRejectiondata.amount)!==parseFloat(data.issue_rejection)){
                            console.log('Needs Update In Rejection')
                            const difference_rejection=parseFloat(data.issue_rejection)-parseFloat(transferRejectiondata.amount)
                            console.log(difference_rejection)
                            const backlog = await rejectionModel.findOne({
                                attributes: ['current_backlog','rcv_wholes'],
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
                                        rcv_wholes: sequelize.literal(`rcv_wholes+ ${difference_rejection}`),
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

                        if(parseFloat(transferLWdata.amount)!==parseFloat(data.issue_lw)){
                            console.log('Needs Update In LW')
                            const difference_lw=parseFloat(data.issue_lw)-parseFloat(transferLWdata.amount)
                            console.log(difference_lw)
                            const backlog = await LWModel.findOne({
                                attributes: ['current_backlog','rcv_wholes'],
                                where: {
                                    lotNo:LotNo,
                                    origin:origin,
                                    latest:1
                        
                                },
                                order: [['LotNo', 'ASC']]
                        
                            });
                            if (backlog && backlog.dataValues.current_backlog>=0)
                                {
                                await LWModel.update(
                                    {
                                        rcv_wholes: sequelize.literal(`rcv_wholes+ ${difference_lw}`),
                                        current_backlog: sequelize.literal(`current_backlog+ ${difference_lw}`)
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
                                    amount:data.issue_lw,
                                    toSectionBeforeBacklog:transferLWdata.toSectionBeforeBacklog,
                                    toSectionAfterBacklog:parseFloat(transferLWdata.toSectionBeforeBacklog)+parseFloat(data.issue_lw)
                        
                                }, {
                                    where: {
                                        id:transferLWdata.id
                                    },transaction
                                });
                                }
                                else{
                                    res.status(500).json({ message: "Associated LW Entry Not Found" });
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
                        await WholesEditModel.destroy({
                            where: {
                                id
                            },transaction
                        });
                        return res.status(200).json({ message: "Edit Request of Wholes Entry is Approved Successfully" });
                    }


                    
                })
            }
            else{
                return res.status(400).json({ message: "Wholes Transfer Entry is not found" });
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const EditRejectWholes = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         const rejectedBy = req.cookies.user;
         const LotNo = req.params.LotNo;
         const origin = req.params.origin;

        if (!id || !rejectedBy) {
            return res.status(400).json({ message: "Please provide the id or rejected By" });
        }
        const rcn = await WholesModel.update({
            editStatus: "NA",
            modifiedBy:rejectedBy
        }, {
            where: {
                id
            }
        });
        if (!rcn) {
            return res.status(400).json({ message: "Wholes Entry not found" });
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
        const rcnEdit = await WholesEditModel.destroy({
            where: {
                id
            }
        });
        if (!rcnEdit) {
            return res.status(400).json({ message: "Wholes Entry not found" });
        }
        return res.status(200).json({ message: "Wholes Entry rejected successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}
// //WholesMix.tsx
export const SearchRCNWholesMix = async (req: Request, res: Response) => {
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
        
             rcnEntries = await WholesModel.findOne({
                attributes: ['id','editStatus','Status',
                    'rcv_pw_210','rcv_w_210','rcv_ww_210',
                    'rcv_pw_240','rcv_w_240','rcv_ww_240',
                    'rcv_pw_280','rcv_w_280','rcv_ww_280',
                    'rcv_pw_320','rcv_w_320','rcv_ww_320',
                    'rcv_pw_360','rcv_w_360','rcv_ww_360',
                    'rcv_pw_400','rcv_w_400','rcv_ww_400','rcv_jb_mayur',
                    'rcv_jb_hamsa','current_backlog'],
                where
                
                
            });
        
        
       
        return res.status(200).json({ message: 'Mix Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error', error: err })
    }
 
}

export const CreateMixWholes = async (req: Request, res: Response) => {

    try {
        console.log(req.body)
        const createdBy = req.cookies.user;
        const sourceid = req.body.fsourceid;
        const sourcelot = req.body.fsourcelot;
        const sourceorigin = req.body.fsourceorigin;
        const source_rcv_pw_210 = req.body.fsourcercv_pw_210;
        const source_rcv_w_210 = req.body.fsourcercv_w_210;
        const source_rcv_ww_210 = req.body.fsourcercv_ww_210;
        const source_rcv_pw_240 = req.body.fsourcercv_pw_240;
        const source_rcv_w_240 = req.body.fsourcercv_w_240;
        const source_rcv_ww_240 = req.body.fsourcercv_ww_240;
        const source_rcv_pw_280 = req.body.fsourcercv_pw_280;
        const source_rcv_w_280 = req.body.fsourcercv_w_280;
        const source_rcv_ww_280 = req.body.fsourcercv_ww_280;
        const source_rcv_pw_320 = req.body.fsourcercv_pw_320;
        const source_rcv_w_320 = req.body.fsourcercv_w_320;
        const source_rcv_ww_320 = req.body.fsourcercv_ww_320;
        const source_rcv_pw_360 = req.body.fsourcercv_pw_360;
        const source_rcv_w_360 = req.body.fsourcercv_w_360;
        const source_rcv_ww_360 = req.body.fsourcercv_ww_360;
        const source_rcv_pw_400 = req.body.fsourcercv_pw_400;
        const source_rcv_w_400 = req.body.fsourcercv_w_400;
        const source_rcv_ww_400 = req.body.fsourcercv_ww_400;
        const source_rcv_jb_mayur = req.body.fsourcercv_jb_mayur;
        const source_rcv_jb_hamsa = req.body.fsourcercv_jb_hamsa;

        const source_backlog = req.body.fsourcebacklog;

        const transfer_amount = req.body.amount

        const destid = req.body.destid;
        const destlot = req.body.destlot;
        const destorigin = req.body.destorigin;
        const dest_rcv_pw_210 = req.body.destrcv_pw_210;
        const dest_rcv_w_210 = req.body.destrcv_w_210;
        const dest_rcv_ww_210 = req.body.destrcv_ww_210;
        const dest_rcv_pw_240 = req.body.destrcv_pw_240;
        const dest_rcv_w_240 = req.body.destrcv_w_240;
        const dest_rcv_ww_240 = req.body.destrcv_ww_240;
        const dest_rcv_pw_280 = req.body.destrcv_pw_280;
        const dest_rcv_w_280 = req.body.destrcv_w_280;
        const dest_rcv_ww_280 = req.body.destrcv_ww_280;
        const dest_rcv_pw_320 = req.body.destrcv_pw_320;
        const dest_rcv_w_320 = req.body.destrcv_w_320;
        const dest_rcv_ww_320 = req.body.destrcv_ww_320;
        const dest_rcv_pw_360 = req.body.destrcv_pw_360;
        const dest_rcv_w_360 = req.body.destrcv_w_360;
        const dest_rcv_ww_360 = req.body.destrcv_ww_360;
        const dest_rcv_pw_400 = req.body.destrcv_pw_400;
        const dest_rcv_w_400 = req.body.destrcv_w_400;
        const dest_rcv_ww_400 = req.body.destrcv_ww_400;
        const dest_rcv_jb_mayur = req.body.destrcv_jb_mayur;
        const dest_rcv_jb_hamsa = req.body.destrcv_jb_hamsa;
        const dest_backlog = req.body.destbacklog;

        const b_soucre_backlog = req.body.bsourcebacklog;
        const b_dest_backlog = req.body.bdestbacklog;


        await sequelize.transaction(async (transaction: any) => {

            const sourceupdate = await WholesModel.update(
                {
                    rcv_pw_210: source_rcv_pw_210,
                    rcv_w_210: source_rcv_w_210,
                    rcv_ww_210: source_rcv_ww_210,
                    rcv_pw_240: source_rcv_pw_240,
                    rcv_w_240: source_rcv_w_240,
                    rcv_ww_240: source_rcv_ww_240,
                    rcv_pw_280: source_rcv_pw_280,
                    rcv_w_280: source_rcv_w_280,
                    rcv_ww_280: source_rcv_ww_280,
                    rcv_pw_320: source_rcv_pw_320,
                    rcv_w_320: source_rcv_w_320,
                    rcv_ww_320: source_rcv_ww_320,
                    rcv_pw_360: source_rcv_pw_360,
                    rcv_w_360: source_rcv_w_360,
                    rcv_ww_360: source_rcv_ww_360,
                    rcv_pw_400: source_rcv_pw_400,
                    rcv_w_400: source_rcv_w_400,
                    rcv_ww_400: source_rcv_ww_400,
                    rcv_jb_mayur: source_rcv_jb_mayur,
                    rcv_jb_hamsa: source_rcv_jb_hamsa,
                    issue_add_1:sequelize.literal(`issue_add_1- ${transfer_amount}`),
                    issue_add_3: sequelize.literal(`(issue_add_2 / (issue_add_1+${transfer_amount})) * 100`),
                    current_backlog: source_backlog,
                },
                {
                    where: {
                        id: sourceid
                    }, transaction
                }
            );
            const destdata = await WholesModel.findOne({
                attributes: ['mixingLot'],
                where: {
                    id: destid

                },

            });
            if (destdata && destdata.dataValues.mixingLot) {
                const destupdate = await WholesModel.update(
                    {
                        rcv_pw_210: dest_rcv_pw_210,
                        rcv_w_210: dest_rcv_w_210,
                        rcv_ww_210: dest_rcv_ww_210,
                        rcv_pw_240: dest_rcv_pw_240,
                        rcv_w_240: dest_rcv_w_240,
                        rcv_ww_240: dest_rcv_ww_240,
                        rcv_pw_280: dest_rcv_pw_280,
                        rcv_w_280: dest_rcv_w_280,
                        rcv_ww_280: dest_rcv_ww_280,
                        rcv_pw_320: dest_rcv_pw_320,
                        rcv_w_320: dest_rcv_w_320,
                        rcv_ww_320: dest_rcv_ww_320,
                        rcv_pw_360: dest_rcv_pw_360,
                        rcv_w_360: dest_rcv_w_360,
                        rcv_ww_360: dest_rcv_ww_360,
                        rcv_pw_400: dest_rcv_pw_400,
                        rcv_w_400: dest_rcv_w_400,
                        rcv_ww_400: dest_rcv_ww_400,
                        rcv_jb_mayur: dest_rcv_jb_mayur,
                        rcv_jb_hamsa: dest_rcv_jb_hamsa,
                        current_backlog: dest_backlog,
                        issue_add_1:sequelize.literal(`issue_add_1+ ${transfer_amount}`),
                        issue_add_3: sequelize.literal(`(issue_add_2 / (issue_add_1+${transfer_amount})) * 100`),
                        mixingLot: sequelize.literal(`CONCAT(mixingLot,'${sourcelot}(${sourceorigin})')`)
                    },
                    {
                        where: {
                            id: destid
                        }, transaction
                    }
                );
                if (sourceupdate && destupdate) {
                    const mixcreate = await mixingModel.create(
                        {
                            FromLotNo: sourcelot,
                            Fromorigin: sourceorigin,
                            ToLotNo: destlot,
                            Toorigin: destorigin,
                            amount: transfer_amount,
                            date: new Date(),
                            Section: 'Wholes',
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
            else {
                const destupdate = await WholesModel.update(
                    {
                        rcv_pw_210: dest_rcv_pw_210,
                        rcv_w_210: dest_rcv_w_210,
                        rcv_ww_210: dest_rcv_ww_210,
                        rcv_pw_240: dest_rcv_pw_240,
                        rcv_w_240: dest_rcv_w_240,
                        rcv_ww_240: dest_rcv_ww_240,
                        rcv_pw_280: dest_rcv_pw_280,
                        rcv_w_280: dest_rcv_w_280,
                        rcv_ww_280: dest_rcv_ww_280,
                        rcv_pw_320: dest_rcv_pw_320,
                        rcv_w_320: dest_rcv_w_320,
                        rcv_ww_320: dest_rcv_ww_320,
                        rcv_pw_360: dest_rcv_pw_360,
                        rcv_w_360: dest_rcv_w_360,
                        rcv_ww_360: dest_rcv_ww_360,
                        rcv_pw_400: dest_rcv_pw_400,
                        rcv_w_400: dest_rcv_w_400,
                        rcv_ww_400: dest_rcv_ww_400,
                        rcv_jb_mayur: dest_rcv_jb_mayur,
                        rcv_jb_hamsa: dest_rcv_jb_hamsa,
                        current_backlog: dest_backlog,
                        issue_add_1:sequelize.literal(`issue_add_1+ ${transfer_amount}`),
                        issue_add_3: sequelize.literal(`(issue_add_2 / (issue_add_1+${transfer_amount})) * 100`),
                        mixingLot: `${sourcelot}(${sourceorigin})`
                    },
                    {
                        where: {
                            id: destid
                        }, transaction
                    }
                );
                if (sourceupdate && destupdate) {
                    const mixcreate = await mixingModel.create(
                        {
                            FromLotNo: sourcelot,
                            Fromorigin: sourceorigin,
                            ToLotNo: destlot,
                            Toorigin: destorigin,
                            amount: transfer_amount,
                            date: new Date(),
                            Section: 'Wholes',
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







