import Express from "express";
import { graddingCleanFunction, boilingCleanFunction } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/maintenence/graddingMaintenence/createGraddingMaintenence";
import CreateBoillingMaintenence from "../controller/maintenence/boillingMaintenence/createBoillingMaintenence";

const router = Express.Router();
const graddingCleanImageUpload = graddingCleanFunction();
const boillingCleanImageUpload = boilingCleanFunction();


router.post("/graddingcleancreate", graddingCleanImageUpload, CreateGraddingMaintenence)

router.post("/boillingcleancreate", boillingCleanImageUpload, CreateBoillingMaintenence)




export default router;