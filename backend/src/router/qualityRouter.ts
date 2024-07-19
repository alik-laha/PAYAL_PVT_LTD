import express from 'express';
import RecivingPackageMaterial from '../controller/Quality/RecivingPackageMaterial';
import SkudataFind from '../controller/Quality/SkudataFind';
const router = express.Router();


router.post("/createrecivingpackagematerial", RecivingPackageMaterial)
router.post("/skudatafind", SkudataFind)

export default router;