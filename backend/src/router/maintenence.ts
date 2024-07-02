import Express from "express";
import { graddingCleanFunction, boilingCleanFunction } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/maintenence/graddingMaintenence/createGraddingMaintenence";
import CreateBoillingMaintenence from "../controller/maintenence/boillingMaintenence/createBoillingMaintenence";

const router = Express.Router();
const graddingCleanImageUpload = graddingCleanFunction();
const boillingCleanImageUpload = boilingCleanFunction();


router.post("/graddingcleancreate", graddingCleanImageUpload.fields([{ name: 'files', maxCount: 10 }, { name: 'file', maxCount: 1 }]), CreateGraddingMaintenence)

router.post("/boillingcleancreate", boillingCleanImageUpload.fields([{ name: 'files', maxCount: 10 }, { name: 'file', maxCount: 1 }]), CreateBoillingMaintenence)




export default router;