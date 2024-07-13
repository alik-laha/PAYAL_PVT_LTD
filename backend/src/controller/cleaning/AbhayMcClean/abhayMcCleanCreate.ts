import { Request, Response } from "express";
import GraddingMaintenence from "../../../model/cleaningGraddingModel";
import { promises as fs } from 'fs';
import sharp from 'sharp';

const CompressImage = async (files: any, output: string) => {
    try {
        await sharp(files.path)
            .resize(200, 200)
            .jpeg({ quality: 90 })
            .png({ quality: 90 })
            .webp({ quality: 90 })
            .toFile(output)

        await fs.unlink(files.path)
    }
    catch (error) {
        console.log(error)
    }
}

const CreateGraddingMaintenence = async (req: Request, res: Response) => {
    try {
        const { mc_name, date, dustTable, hopper, elevetorCups, elevetorMotorCleanByAir, McAllPartsClean, binClean, CallibrationRollerHolesClean, damage, partsName, percentage } = req.body;
        const files: any = req.files;
        let CleanedImage: [string] = [""];
        let DamagedImage: [string] = [""];
        const createdBy = req.cookies.user
        files.cleanedPartsImages.map(async (file: any) => {
            CompressImage(file, "./compressUpload/clean/cleaningGradding/" + file.filename)

            CleanedImage.push("./compressUpload/clean/cleaningGradding/" + file.filename)
        })
        const fileteredCleanImage = CleanedImage.filter((image) => image !== "")
        const cleanedPartsImages = JSON.stringify(fileteredCleanImage)
        let damagedPartsImages: string = ""
        if (damage === "true" && files.damagedPartsImages) {
            files.damagedPartsImages.map((file: any) => {
                CompressImage(file, "./compressUpload/clean/cleaningGradding/" + file.filename)
                DamagedImage.push("./compressUpload/clean/cleaningGradding/" + file.filename)
            })
            const fileteredDamagedImage = DamagedImage.filter((image) => image !== "")
            damagedPartsImages = JSON.stringify(fileteredDamagedImage)
        }



        if (damagedPartsImages && damage) {

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
        else {
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
                partsName,
                percentage,
                cleanedPartsImages,
                createdBy
            })
            if (!GraddingCleanReport) return res.status(400).send('Data not saved');
            return res.status(200).send('Data saved successfully');
        }
    }
    catch (error) {
        console.log(error);
    }

}
export default CreateGraddingMaintenence;