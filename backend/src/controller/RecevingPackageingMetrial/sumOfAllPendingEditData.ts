import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import { Op } from "sequelize";

const sumOfAllRecenvingPackageMaterial = async (req: Request, res: Response) => {
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
        const sumOfAllRecenvingPackageMaterial = await PackagingMaterial.count({
            where: {
                recevingDate: {
                    [Op.between]: [targetDate, today]
                }
                ,editStatus:{
                    [Op.notLike]:'Pending'
                },status:1
            }
        });
    
        const packagingMaterial = await EditPackagingMaterial.count();
        return res.status(200).json({ sumOfAllRecenvingPackageMaterial, packagingMaterial });
    }
    catch (err) {
        console.log(err)
    }
}
export default sumOfAllRecenvingPackageMaterial;