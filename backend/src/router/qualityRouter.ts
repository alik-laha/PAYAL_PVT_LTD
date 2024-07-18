import express from 'express';
import RecivingPackageMaterial from '../controller/Quality/RecivingPackageMaterial';
const router = express.Router();


router.post("/createrecivingpackagematerial", RecivingPackageMaterial)

export default router;