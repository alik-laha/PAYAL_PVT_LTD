import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import VendorName from "../../model/vendorNameModel";
import SkuData from "../../model/SkuModel";
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
                }
            }
        });
        const vendorName = await VendorName.count();
        const skuData = await SkuData.count();
        const packagingMaterial = await EditPackagingMaterial.count();
        return res.status(200).json({ sumOfAllRecenvingPackageMaterial, vendorName, skuData, packagingMaterial });
    }
    catch (err) {
        console.log(err)
    }
}
export default sumOfAllRecenvingPackageMaterial;