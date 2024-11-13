import { Request, Response } from "express";
import ItemIssue from "../../model/itemissueModel";
import sequelize from "../../config/databaseConfig";
import SkuModel from "../../model/SkuModel";

const CreateIssueEntire = async (req: Request, res: Response) => {
    try{
        const formData=req.body.data
        const feeledBy = req.cookies.user;

        const lastIssueNo = await ItemIssue.findOne({     
            order: [['issueID', 'DESC']]
          });

          const newIssueNo = lastIssueNo ? parseInt(lastIssueNo.dataValues.issueID.slice(5)) + 1 : 1;
          const finalIssueNo = `ISSUE${String(newIssueNo).padStart(6, '0')}`;

          await sequelize.transaction( async (transaction) =>{
            for (let data of formData){
                let skuData = await SkuModel.findOne({ where: { sku: data.material, type: data.category, section: 'Store' } });
                if (!skuData) {
                    res.status(500).json({ message: "Material Does Not Exist" });
                    throw new Error('Transaction Aborted')
                }
               await ItemIssue.create({
                    issueID:finalIssueNo,
                    date:data.Date,
                    category:data.category,
                    materialName:data.material,
                    quantity:data.quantity,
                    itemunit:data.unit,
                    unitPrice:data.unitprice,
                    totalPrice:data.totalprice,
                    section:data.section,
                    subsection:data.subsection,
                    sectionunit:data.sectionunit,
                    issueUser:data.User,
                    damagereturn:data.damagestatus,
                    damagequantity:data.damageqty,
                    damageunit:data.damageunit,
                    remarks:data.remarks,
                    CreatedBy:feeledBy
                },{transaction})

               
            }
            
          })
          return res.status(200).json({ message: `New Issue ID ${finalIssueNo} Generated Successfully` });
    }
    catch(err){
        if(!res.headersSent){
            console.log(err)
            return res.status(500).json({ message: "Error in Creating Issue Item", err });
        }
    }
}
export default CreateIssueEntire;