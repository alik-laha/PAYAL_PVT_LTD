import Express from "express";
import { graddingCleanFunction, boilingCleanFunction } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/cleaning/graddingClean/createGraddingClean";
import CreateBoillingMaintenence from "../controller/cleaning/boillingClean/createBoillingClean";
import ViewGraddingCleaning from "../controller/cleaning/graddingClean/viewGraddingClean";
import path from 'path';

const router = Express.Router();
const graddingCleanImageUpload = graddingCleanFunction();
const boillingCleanImageUpload = boilingCleanFunction();


router.post("/graddingcleancreate", graddingCleanImageUpload, CreateGraddingMaintenence)


router.post("/boillingcleancreate", boillingCleanImageUpload, CreateBoillingMaintenence)

router.post("/graddingcleanreportview", ViewGraddingCleaning)

router.get('/view', function (req, res) {
    const filename = req.query.filename as string;
    console.log(filename)
    if (!filename) {
        return res.status(400).send('Filename is required');
    }
    const filePath = path.resolve(filename);

    // Ensure the file path is within the uploads directory to prevent directory traversal attacks
    return res.sendFile(filePath);


});




export default router;