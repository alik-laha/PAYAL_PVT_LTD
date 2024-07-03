import Express from "express";
import { graddingCleanFunction, boilingCleanFunction } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/cleaning/graddingClean/createGraddingClean";
import CreateBoillingMaintenence from "../controller/cleaning/boillingClean/createBoillingClean";
import ViewGraddingCleaning from "../controller/cleaning/graddingClean/viewGraddingClean";

const router = Express.Router();
const graddingCleanImageUpload = graddingCleanFunction();
const boillingCleanImageUpload = boilingCleanFunction();


router.post("/graddingcleancreate", graddingCleanImageUpload, CreateGraddingMaintenence)

router.post("/boillingcleancreate", boillingCleanImageUpload, CreateBoillingMaintenence)

router.post("/graddingcleanreportview", ViewGraddingCleaning)




export default router;