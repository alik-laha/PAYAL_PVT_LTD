import Express from "express";
import cron from 'node-cron';
import { graddingCleanFunction, boilingCleanFunction, ScoopingSectionCuttingFunction } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/cleaning/graddingClean/createGraddingClean";
import CreateBoillingMaintenence from "../controller/cleaning/boillingClean/createBoillingClean";
import ViewGraddingCleaning from "../controller/cleaning/graddingClean/viewGraddingClean";
import path from 'path';
import autoDeleteGraddingCleanImage from "../controller/cleaning/graddingClean/autoDeleteGraddingCleanImage";
import autoDeleteBoillingCleanImage from "../controller/cleaning/boillingClean/autoDeleteBoillingCleanImage";
import BoillingCleanCreate from "../controller/cleaning/boillingClean/createBoillingClean";
import ViewBoillingCleaning from "../controller/cleaning/boillingClean/viewBoillingClean";
import CreateScoopingSectionCutting from "../controller/cleaning/scoopingSectionCuttingClean/createScoopingSectionCuttingClean";
import ViewScoopingSectionCuttingClean from "../controller/cleaning/scoopingSectionCuttingClean/viewScoopingSectionCuttingClean";

const router = Express.Router();
const graddingCleanImageUpload = graddingCleanFunction();
const boillingCleanImageUpload = boilingCleanFunction();


router.post("/graddingcleancreate", graddingCleanImageUpload, CreateGraddingMaintenence)


router.post("/boillingcleancreate", boillingCleanImageUpload, CreateBoillingMaintenence)

router.post("/cuttingcleancreate", ScoopingSectionCuttingFunction, CreateScoopingSectionCutting)

router.post("/graddingcleanreportview", ViewGraddingCleaning)

router.post("/boillingcleancreate", BoillingCleanCreate)

router.post('/cuttingcleanreportview', ViewScoopingSectionCuttingClean)

router.post("/boillingcleanreportview", ViewBoillingCleaning)

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