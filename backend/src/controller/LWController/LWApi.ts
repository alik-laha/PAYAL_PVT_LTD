import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";
import LotNo from "../../model/lotNomodel";
import { Op } from "sequelize";
import LWEditModel from "../../model/lowerGradeEditModel";
import LWModel from "../../model/lowerGradeModel";

// //LW.tsx
export const findEditLWAll = async (req: Request, res: Response) => {
    try {
        const scoopingAllEdit = await LWEditModel.findAll({order: [['LotNo', 'DESC'], ['date', 'DESC']] });
        if (!scoopingAllEdit) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(200).json({ message: "findEditLWAll", scoopingAllEdit });
    } catch (error) {
        res.status(500).json({ message: "Internal server error",error });
    }
}
export const sumOfallLW = async (req: Request, res: Response) => {

    
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
        const EditData = await LWEditModel.count()
        if (data) {
            return res.status(200).json({ data, EditData });
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
            
            attributes: ['LotNo', 'origin','current_backlog','rcv_mayur','rcv_wholes','rcv_hamsa'],
            where: {
                Status:status
            }

        });
        if(scoopingLot){
            res.status(200).json({ message: "Un LW Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding LW Entry"});
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
        const lotNO=req.params.lotNO
        const origin=req.params.origin
        const scoopingLot = await LWModel.findAll({
            where: {
                LotNo:lotNO,origin:origin
            }, order: [['LotNo', 'ASC']]

        }
        );
        if(scoopingLot){
            res.status(200).json({ message: "Un LW Entry", scoopingLot });
        }
        else{
            res.status(500).json({ message: "Error in Finding LW Entry"});
        }
       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}