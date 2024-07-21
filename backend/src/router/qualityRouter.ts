import express from 'express';
import RecivingPackageMaterial from '../controller/Quality/RecivingPackageMaterial';
import SkudataFind from '../controller/Quality/SkudataFind';
import vendorNameFind from '../controller/Quality/vendorNameFind';
import viewReceivingPackageMetrial from '../controller/Quality/viewReceivingPackageMetrial';
import editRecevingPackageMaterial from '../controller/Quality/editRecevingPackageMaterial';
import sumOfAllRecenvingPackageMaterial from '../controller/Quality/sumOfAllPendingEditData';
const router = express.Router();


router.post("/createrecivingpackagematerial", RecivingPackageMaterial)
router.post("/skudatafind", SkudataFind)
router.post("/vendornamefind", vendorNameFind)
router.post("/getreceivematerial", viewReceivingPackageMetrial)
router.get("/geteditrecevingpackagematerial", editRecevingPackageMaterial)
router.get("/getsumofEditRecevingPackageMaterial", sumOfAllRecenvingPackageMaterial)

export default router;