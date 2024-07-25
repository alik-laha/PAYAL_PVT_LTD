import express from 'express';
import QcPackageMaterialInitialEntry from '../controller/qcPackageController/qcPackageMarerialInitialEntry';
import ViewQcPackageMaterial from '../controller/qcPackageController/viewQcpackageMaterialEntry';
const router = express.Router();

router.post("/qcpackaginginitialEntry", QcPackageMaterialInitialEntry)

router.post("/package_material_view", ViewQcPackageMaterial)


export default router