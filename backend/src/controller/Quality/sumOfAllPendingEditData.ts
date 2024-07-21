import { Request, Response } from "express";
import EditPackagingMaterial from "../../model/editPackageingMaterialModel";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import VendorName from "../../model/vendorNameModel";
import SkuData from "../../model/SkuModel";

const sumOfAllRecenvingPackageMaterial = async (req: Request, res: Response) => {
    try {
        const sumOfAllRecenvingPackageMaterial = await EditPackagingMaterial.count();
        const vendorName = await VendorName.count();
        const skuData = await SkuData.count();
        const packagingMaterial = await PackagingMaterial.count();
        return res.status(200).json({ sumOfAllRecenvingPackageMaterial, vendorName, skuData, packagingMaterial });
    }
    catch (err) {
        console.log(err)
    }
}
export default sumOfAllRecenvingPackageMaterial;