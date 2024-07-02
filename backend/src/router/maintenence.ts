import Express from "express";
import { graddingCleanImageUpload } from "../helper/saveimagefromUpload";
import CreateGraddingMaintenence from "../controller/maintenence/graddingMaintenence/createGraddingMaintenence";

const router = Express.Router();


router.post("/graddingcleancreate", graddingCleanImageUpload.fields([{ name: 'files', maxCount: 10 }, { name: 'file', maxCount: 1 }]), CreateGraddingMaintenence)




export default router;