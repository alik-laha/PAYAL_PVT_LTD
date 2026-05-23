import { Request, Response } from "express";
import { Op } from "sequelize";
import ItemIssueEdit from "../../model/itemIssueEdit";
import ItemIssue from "../../model/itemissueModel";
import storePrimaryEditModel from "../../model/storePrimaryEditModel";

const sumOfallIssue = async (req: Request, res: Response) => {

    
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

        

       
        const data = await ItemIssue.count({
            attributes: [
                'sectionunit'
                
            ],
            where: {
               
                editStatus: {
                    [Op.notLike]: 'Pending'
                },
                date: {
                    [Op.between]: [targetDate, today]
                }
            },
            group: ['sectionunit']
        });


        const EditData = await ItemIssueEdit.count()
        const EditDataIn = await storePrimaryEditModel.count()
        if (data) {
            return res.status(200).json({ data, EditData,EditDataIn });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}
export default sumOfallIssue;