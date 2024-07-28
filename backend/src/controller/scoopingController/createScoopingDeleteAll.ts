import { Request, Response } from "express";

import RcnAllScooping from "../../model/scoopingAllmodel";
import RcnAllEditScooping from "../../model/scoopingAllEditModel";


const createScoopingDeleteAll = async (req: Request, res: Response) => {

 
        try {
           
            let { LotNo,
                origin,
                Opening_Qty,
                Receiving_Qty,
                Wholes,
                Broken,
                Uncut,
                Unscoop,
                NonCut,
                Rejection,
                Dust,
                noOfEmployees,
                noOfOperators,male,female,supervisor,Date } = req.body.data2;
            
            const modifiedBy = req.cookies.user
            const total_bag=(((parseFloat(Receiving_Qty)+parseFloat(Opening_Qty))
                            -(parseFloat(Uncut)+parseFloat(Unscoop)+parseFloat(NonCut)+parseFloat(Dust)))/80)
            console.log(total_bag) 
                
            const kor=((parseFloat(Wholes)+parseFloat(Broken))/(total_bag*0.453)).toFixed(2)

            const latestEditEntry = await RcnAllEditScooping.findOne({
                attributes: ['CreatedBy'],
                where: {
                    LotNo:LotNo,
                    origin:origin
                    }
            });
    
            let createdBy='ProductionManager'
            if(latestEditEntry){
                 createdBy=latestEditEntry?.dataValues.CreatedBy
            }

       
            
            const scoop = await RcnAllScooping.update(
                {
                    date: Date,
                    Wholes:Wholes,
                    Broken:Broken,
                    Unscoop:Unscoop,
                    Uncut:Uncut,
                    NonCut:NonCut,
                    Rejection:Rejection,
                    Dust:Dust,
                    KOR:kor,
                    TotBagCutting:total_bag,
                    noOfGents:male,
                    noOfLadies:female,
                    noOfSupervisors:supervisor,
                    noOfEmployees:noOfEmployees,
                    noOfOperators:noOfOperators,
                    CreatedBy:createdBy,
                    modifiedBy:modifiedBy,
                    editStatus:'NA'

                }, {
                    where: {
                    LotNo:LotNo,
                    origin:origin
                    }
                });
                if (scoop) {
                    await RcnAllEditScooping.destroy({ where: {
                        LotNo:LotNo,
                        origin:origin
                        } });
                    return res.status(200).json({ message: "RCN Scooping Edit All Request Approved Successfully" });
                }
                else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }

           
        } catch (err) {
            return res.status(500).json({ message: "internal server Error", err });
        }
}

export default createScoopingDeleteAll;