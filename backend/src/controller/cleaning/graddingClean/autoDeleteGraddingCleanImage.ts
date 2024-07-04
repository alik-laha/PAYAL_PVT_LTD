import fs from "fs"
import GraddingClean from '../../../model/cleaningGraddingModel'; // Import the Model type from the cleaningGraddingModel file
import { GraddingCleanData } from '../../../type/type';

const autoDeleteGraddingCleanImage = async () => {
    const CleanData: GraddingCleanData[] = await GraddingClean.findAll() as unknown as GraddingCleanData[];
    const nowDate = new Date();
    CleanData.map((data: GraddingCleanData) => {
        const date = new Date(data.createdAt);
        const diffTime = Math.abs(nowDate.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays, "cron job runs")
        if (diffDays > 7) {
            data.cleanedPartsImages.map((image) => {
                fs.unlink(image, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            })
            data.damagedPartsImages.map((image) => {
                fs.unlink(image, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            })
            GraddingClean.destroy({
                where: {
                    id: data.id
                }
            })
        }
    });
}

export default autoDeleteGraddingCleanImage;