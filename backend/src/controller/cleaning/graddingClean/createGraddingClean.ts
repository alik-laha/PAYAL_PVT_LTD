import { Request, Response } from "express";
import GraddingMaintenence from "../../../model/cleaningGraddingModel";


const CreateGraddingMaintenence = async (req: Request, res: Response) => {
    try {
        const { mc_name, date, dustTable, hopper, elevetorCups, elevetorMotorCleanByAir, McAllPartsClean, binClean, CallibrationRollerHolesClean, damage, partsName, percentage } = req.body;
        const files: any = req.files;
        let CleanedImage: [string] = [""];
        let DamagedImage: [string] = [""];
        const createdBy = req.cookies.user
        files.cleanedPartsImages.map((file: any) => {
            CleanedImage.push(file.destination)
        })
        const fileteredCleanImage = CleanedImage.filter((image) => image !== "")
        const cleanedPartsImages = JSON.stringify(fileteredCleanImage)
        files.damagedPartsImages.map((file: any) => {
            DamagedImage.push(file.destination)
        })
        const fileteredDamagedImage = DamagedImage.filter((image) => image !== "")
        const damagedPartsImages = JSON.stringify(fileteredDamagedImage)

        const GraddingCleanReport = await GraddingMaintenence.create({
            mc_name,
            date,
            dustTable,
            hopper,
            elevetorCups,
            elevetorMotorCleanByAir,
            McAllPartsClean,
            binClean,
            CallibrationRollerHolesClean,
            damage,
            partsName,
            percentage,
            cleanedPartsImages,
            damagedPartsImages,
            createdBy
        })
        if (!GraddingCleanReport) return res.status(400).send('Data not saved');
        return res.status(200).send('Data saved successfully');
    }
    catch (error) {
        console.log(error);
    }

}
export default CreateGraddingMaintenence;