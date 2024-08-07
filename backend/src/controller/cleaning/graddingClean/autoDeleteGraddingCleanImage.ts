import { promises as fs } from 'node:fs';
import GraddingClean from '../../../model/cleaningGraddingModel'; // Import the Model type from the cleaningGraddingModel file
import { GraddingCleanData } from '../../../type/type';

const DeleteImage = async (filepath: string[]) => {

    try {

        filepath.map(async (file) => {

            await fs.unlink(file)
        })

        return 1;
    }

    catch (err) {
        console.error(err)
        return 0;
    }
}

const autoDeleteGraddingCleanImage = async () => {

    const CleanData: GraddingCleanData[] = await GraddingClean.findAll() as unknown as GraddingCleanData[];
    const nowDate = new Date();
    CleanData.map(async (data: GraddingCleanData) => {

        const date = new Date(data.createdAt);
        const diffTime = Math.abs(nowDate.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= Number(process.env.DELETE_IMAGE_TIME)) {

            let deletflag = await DeleteImage(JSON.parse(data.cleanedPartsImages))

            if (data.damagedPartsImages != null && deletflag === 1) {

                deletflag = await DeleteImage(JSON.parse(data.damagedPartsImages))
            }

            if (deletflag === 1) {

                await GraddingClean.destroy({
                    where: {

                        id: data.id
                    }

                })

            }

        }

    });

}

export default autoDeleteGraddingCleanImage;