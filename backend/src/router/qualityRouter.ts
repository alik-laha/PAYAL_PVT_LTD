import express from 'express';
import RecivingPackageMaterial from '../controller/RecevingPackageingMetrial/RecivingPackageMaterial';
import SkudataFind from '../controller/RecevingPackageingMetrial/SkudataFind';
import vendorNameFind from '../controller/RecevingPackageingMetrial/vendorNameFind';
import viewReceivingPackageMetrial from '../controller/RecevingPackageingMetrial/viewReceivingPackageMetrial';
import editedRecevingPackageMaterial from '../controller/RecevingPackageingMetrial/editedRecevingPackageMaterial';
import sumOfAllRecenvingPackageMaterial from '../controller/RecevingPackageingMetrial/sumOfAllPendingEditData';
import editRecevingPackageMaterial from '../controller/RecevingPackageingMetrial/editRecevingPackageMetrial';
import acceptRecevingPackageEdit from '../controller/RecevingPackageingMetrial/acceptrecevingPackageedit';
const router = express.Router();


router.post("/createrecivingpackagematerial", RecivingPackageMaterial)
router.post("/skudatafind", SkudataFind)
router.post("/vendornamefind", vendorNameFind)
router.post("/getreceivematerial", viewReceivingPackageMetrial)
router.get("/geteditrecevingpackagematerial", editedRecevingPackageMaterial)
router.get("/getsumofEditRecevingPackageMaterial", sumOfAllRecenvingPackageMaterial)
router.post("/editrecevingpackagematerial/:id", editRecevingPackageMaterial)
router.get('/accepteditrecevingpackagematerial/:id', acceptRecevingPackageEdit)

export default router;