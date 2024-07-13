import { Request, Response } from "express";
import CleaningScoopingSectionCutting from "../../../model/cleaningScoopingSectionCuttingModel";
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

const CreateScoopingSectionCutting = async (req: Request, res: Response) => {
    try {
        const { mc_name, date, gear_m3_30ta, gear_m3_40tb, gear_m372ta_50_18r, sap, bladeUp, bladeDown, speaderDown, brushBig, brushSmall, chainOneSmall, chainTwoLarge, chainThreeBig, chainFourBigTwo, bigChainPatti, bigTwoChainPatti, spring, trayCup, gear_m3_60ta, motorPinionGear, cuttingChain, damage, partsName, percentage } = req.body;
        const files: any = req.files;
        let CleanedImage: [string] = [""];
        let DamagedImage: [string] = [""];
        const createdBy = req.cookies.user
        files.cleanedPartsImages.map(async (file: any) => {
            CompressImage(file, "./compressUpload/clean/cleaningScoopingSectionCutting/" + file.filename)

            CleanedImage.push("./compressUpload/clean/cleaningScoopingSectionCutting/" + file.filename)
        })
        const fileteredCleanImage = CleanedImage.filter((image) => image !== "")
        const cleanedPartsImages = JSON.stringify(fileteredCleanImage)
        let damagedPartsImages: string = ""
        if (damage === "true" && files.damagedPartsImages) {
            files.damagedPartsImages.map((file: any) => {
                CompressImage(file, "./compressUpload/clean/cleaningScoopingSectionCutting/" + file.filename)
                DamagedImage.push("./compressUpload/clean/cleaningScoopingSectionCutting/" + file.filename)
            })
            const fileteredDamagedImage = DamagedImage.filter((image) => image !== "")
            damagedPartsImages = JSON.stringify(fileteredDamagedImage)
        }



        if (damagedPartsImages && damage) {

            const GraddingCleanReport = await CleaningScoopingSectionCutting.create({
                mc_name,
                date,
                gear_m3_30ta,
                gear_m3_40tb,
                gear_m372ta_50_18r,
                sap,
                bladeUp,
                bladeDown,
                speaderDown,
                brushBig,
                brushSmall,
                chainOneSmall,
                chainTwoLarge,
                chainThreeBig,
                chainFourBigTwo,
                bigChainPatti,
                bigTwoChainPatti,
                spring,
                trayCup,
                gear_m3_60ta,
                motorPinionGear,
                cuttingChain,
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
            const GraddingCleanReport = await CleaningScoopingSectionCutting.create({
                mc_name,
                date,
                gear_m3_30ta,
                gear_m3_40tb,
                gear_m372ta_50_18r,
                sap,
                bladeUp,
                bladeDown,
                speaderDown,
                brushBig,
                brushSmall,
                chainOneSmall,
                chainTwoLarge,
                chainThreeBig,
                chainFourBigTwo,
                bigChainPatti,
                bigTwoChainPatti,
                spring,
                trayCup,
                gear_m3_60ta,
                motorPinionGear,
                cuttingChain,
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
export default CreateScoopingSectionCutting;