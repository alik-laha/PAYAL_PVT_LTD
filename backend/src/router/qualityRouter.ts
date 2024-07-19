import express from 'express';
import RecivingPackageMaterial from '../controller/Quality/RecivingPackageMaterial';
import SkudataFind from '../controller/Quality/SkudataFind';
import vendorNameFind from '../controller/Quality/vendorNameFind';
const router = express.Router();


router.post("/createrecivingpackagematerial", RecivingPackageMaterial)
router.post("/skudatafind", SkudataFind)
router.post("/vendornamefind", vendorNameFind)

export default router;