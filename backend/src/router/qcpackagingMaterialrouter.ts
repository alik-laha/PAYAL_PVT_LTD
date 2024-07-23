import express from 'express';
import QcPackageMaterialInitialEntry from '../controller/qcPackageController/qcPackageMarerialInitialEntry';
const router = express.Router();

router.post("/qcpackaginginitialEntry", QcPackageMaterialInitialEntry)


export default router