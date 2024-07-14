
import { Request, Response } from 'express';
import { promises as fs } from 'fs';
import BoillingMaintenence from '../../../model/cleaningBoillingModel';
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

const BoillingMaintenenceImageUpload = async (req: Request, res: Response) => {
    try {
        const { mc_name, date, motorClean, insideWashByStream, drainCleaning, waterChamberCleaning, pressureGageClean, elevetorCup, damage, partsName, percentage, hopperClean } = req.body;
        const files: any = req.files;
        let CleanedImage: [string] = [""];
        let DamagedImage: [string] = [""];
        const createdBy = req.cookies.user
        files.cleanedPartsImages.map(async (file: any) => {
            CompressImage(file, "./compressUpload/clean/cleaningBoilling/" + file.filename)

            CleanedImage.push("./compressUpload/clean/cleaningBoilling/" + file.filename)
        })
        const fileteredCleanImage = CleanedImage.filter((image) => image !== "")
        const cleanedPartsImages = JSON.stringify(fileteredCleanImage)
        let damagedPartsImages: string = ""
        if (damage === "true" && files.damagedPartsImages) {
            files.damagedPartsImages.map((file: any) => {
                CompressImage(file, "./compressUpload/clean/cleaningBoilling/" + file.filename)
                DamagedImage.push("./compressUpload/clean/cleaningBoilling/" + file.filename)
            })
            const fileteredDamagedImage = DamagedImage.filter((image) => image !== "")
            damagedPartsImages = JSON.stringify(fileteredDamagedImage)
        }



        if (damagedPartsImages && damage) {

            const BoillingCleanReport = await BoillingMaintenence.create({
                mc_name,
                date,
                motorAndOtherPartsCleaning: motorClean,
                cookingInsideWashByStream: insideWashByStream,
                drainLineCleaning: drainCleaning,
                waterWashChemberCleaning: waterChamberCleaning,
                pressureGageCleanning: pressureGageClean,
                hopper: hopperClean,
                elevetorCup,
                percentage,
                damage,
                partsName,
                cleanedPartsImages,
                damagedPartsImages,
                createdBy
            })
            if (!BoillingCleanReport) return res.status(400).send('Data not saved');
            return res.status(200).send('Data saved successfully');
        }
        else {
            const BoillingCleanReport = await BoillingMaintenence.create({
                mc_name,
                date,
                motorAndOtherPartsCleaning: motorClean,
                cookingInsideWashByStream: insideWashByStream,
                drainLineCleaning: drainCleaning,
                waterWashChemberCleaning: waterChamberCleaning,
                pressureGageCleanning: pressureGageClean,
                hopper: hopperClean,
                elevetorCup,
                percentage,
                damage,
                partsName,
                cleanedPartsImages,
                damagedPartsImages,
                createdBy
            })
            if (!BoillingCleanReport) return res.status(400).send('Data not saved');
            return res.status(200).send('Data saved successfully');
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default BoillingMaintenenceImageUpload;