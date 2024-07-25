import Express from "express";
import cron from 'node-cron';
import { graddingCleanFunction, boilingCleanFunction, ScoopingSectionCuttingFunction } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/cleaning/graddingClean/createGraddingClean";
import CreateCookingMaintenence from "../controller/cleaning/cookingingClean/createCookingClean";
import ViewGraddingCleaning from "../controller/cleaning/graddingClean/viewGraddingClean";
import path from 'path';
import autoDeleteGraddingCleanImage from "../controller/cleaning/graddingClean/autoDeleteGraddingCleanImage";
import autoDeleteBoillingCleanImage from "../controller/cleaning/cookingingClean/autoDeleteCookingCleanImage";
import ViewCookingCleaning from "../controller/cleaning/cookingingClean/viewCookingClean";
import CreateScoopingSectionCutting from "../controller/cleaning/scoopingSectionCuttingClean/createScoopingSectionCuttingClean";
import ViewScoopingSectionCuttingClean from "../controller/cleaning/scoopingSectionCuttingClean/viewScoopingSectionCuttingClean";
import AbhayCleanCreate from "../controller/cleaning/AbhayMcClean/abhayMcCleanCreate"
import AbhayMcCleanView from "../controller/cleaning/AbhayMcClean/viewAbhayMcClean"

const router = Express.Router();
const graddingCleanImageUpload = graddingCleanFunction();
const boillingCleanImageUpload = boilingCleanFunction();


router.post("/graddingcleancreate", graddingCleanImageUpload, CreateGraddingMaintenence)


router.post("/cookingcleancreate", boillingCleanImageUpload, CreateCookingMaintenence)

router.post("/cuttingcleancreate", graddingCleanImageUpload, CreateScoopingSectionCutting)

router.post("/abhayMcCleanCreate", boillingCleanImageUpload, AbhayCleanCreate)

router.post("/abhaycleanview", AbhayMcCleanView)

router.post("/graddingcleanreportview", ViewGraddingCleaning)

router.post('/cuttingcleanreportview', ViewScoopingSectionCuttingClean)

router.post("/cookingcleanreportview", ViewCookingCleaning)

router.get('/view', function (req, res) {
    const filename = req.query.filename as string;
    if (!filename) {
        return res.status(400).send('Filename is required');
    }
    const filePath = path.resolve(filename);

    // Ensure the file path is within the uploads directory to prevent directory traversal attacks
    return res.sendFile(filePath);


});

cron.schedule('0 0 * * *', () => {
    autoDeleteGraddingCleanImage();
    autoDeleteBoillingCleanImage();
})




export default router;