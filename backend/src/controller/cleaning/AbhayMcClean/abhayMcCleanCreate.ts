import { Request, Response } from "express";
import AbahayMc from "../../../model/cleaningAbhayMcModel";
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

const AbhayCleanCreate = async (req: Request, res: Response) => {
    try {
        const { mc_name, date, damage, partsName, percentage, mainElevetorCup,
            mainElevetorGearBox,
            mainElevetorSpocket,
            mainElevetorChain,
            vibretor_1_scooperFan,
            vibretor_1_clamSap,
            vibretor_1_towerBlower,
            vibretor_2_clamSap,
            vibretor2_scooperFan,
            vibretor_2_towerBlower,
            wholesElevetorCup,
            wholesElevetorSap,
            wholesElevetorBlower,
            wholesElevetorPully,
            wholeElevetorSplitsAndBlower,
            wholeElevetorGearBox,
            sizerElevetor_1_cup,
            sizerElevetor_2_cup,
            shellHopper,
            shelllBlower,
            sizerElevetor_2toUnscoopTableScooperFan,
            panaboardAllPartsCleanByHandBlower } = req.body;
        const files: any = req.files;
        let CleanedImage: [string] = [""];
        let DamagedImage: [string] = [""];
        const createdBy = req.cookies.user
        files.cleanedPartsImages.map(async (file: any) => {
            CompressImage(file, "./compressUpload/clean/abhayMcClean/" + file.filename)

            CleanedImage.push("./compressUpload/clean/abhayMcClean/" + file.filename)
        })
        const fileteredCleanImage = CleanedImage.filter((image) => image !== "")
        const cleanedPartsImages = JSON.stringify(fileteredCleanImage)
        let damagedPartsImages: string = ""
        if (damage === "true" && files.damagedPartsImages) {
            files.damagedPartsImages.map((file: any) => {
                CompressImage(file, "./compressUpload/clean/abhayMcClean/" + file.filename)
                DamagedImage.push("./compressUpload/clean/abhayMcClean/" + file.filename)
            })
            const fileteredDamagedImage = DamagedImage.filter((image) => image !== "")
            damagedPartsImages = JSON.stringify(fileteredDamagedImage)
        }



        if (damagedPartsImages && damage) {

            const aabhayMcCleanReport = await AbahayMc.create({
                mc_name,
                date,
                mainElevetorCup,
                mainElevetorGearBox,
                mainElevetorSpocket,
                mainElevetorChain,
                vibretor_1_scooperFan,
                vibretor_1_clamSap,
                vibretor_1_towerBlower,
                vibretor_2_clamSap,
                vibretor2_scooperFan,
                vibretor_2_towerBlower,
                wholesElevetorCup,
                wholesElevetorSap,
                wholesElevetorBlower,
                wholesElevetorPully,
                wholeElevetorSplitsAndBlower,
                wholeElevetorGearBox,
                sizerElevetor_1_cup,
                sizerElevetor_2_cup,
                shellHopper,
                shelllBlower,
                sizerElevetor_2toUnscoopTableScooperFan,
                panaboardAllPartsCleanByHandBlower,
                damage,
                partsName,
                percentage,
                cleanedPartsImages,
                damagedPartsImages,
                createdBy
            })
            if (!aabhayMcCleanReport) return res.status(400).send('Data not saved');
            return res.status(200).send('Data saved successfully');
        }
        else {
            const aabhayMcCleanReport = await AbahayMc.create({
                mc_name,
                date,
                mainElevetorCup,
                mainElevetorGearBox,
                mainElevetorSpocket,
                mainElevetorChain,
                vibretor_1_scooperFan,
                vibretor_1_clamSap,
                vibretor_1_towerBlower,
                vibretor_2_clamSap,
                vibretor2_scooperFan,
                vibretor_2_towerBlower,
                wholesElevetorCup,
                wholesElevetorSap,
                wholesElevetorBlower,
                wholesElevetorPully,
                wholeElevetorSplitsAndBlower,
                wholeElevetorGearBox,
                sizerElevetor_1_cup,
                sizerElevetor_2_cup,
                shellHopper,
                shelllBlower,
                sizerElevetor_2toUnscoopTableScooperFan,
                panaboardAllPartsCleanByHandBlower,
                percentage,
                cleanedPartsImages,
                createdBy
            })
            if (!aabhayMcCleanReport) return res.status(400).send('Data not saved');
            return res.status(200).send('Data saved successfully');
        }
    }
    catch (error) {
        console.log(error);
    }

}
export default AbhayCleanCreate;