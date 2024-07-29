import express from 'express';
import QcPackageMaterialInitialEntry from '../controller/qcPackageController/qcPackageMarerialInitialEntry';
import ViewQcPackageMaterial from '../controller/qcPackageController/viewQcpackageMaterialEntry';
import QcPackageMaterialEntry from '../controller/qcPackageController/createQcPackagingMaterial';
import QualityPackageMetrialMiddleWare from '../middleWare/QualityPackageMetrialMiddleWare';
import downloadData from '../controller/qcPackageController/downloadData';
const router = express.Router();

router.post("/qcpackaginginitialEntry", QcPackageMaterialInitialEntry)

router.post("/package_material_view", ViewQcPackageMaterial)

router.post("/packaging_meterial_qc_entry/:id", QualityPackageMetrialMiddleWare, QcPackageMaterialEntry)

router.get("/downloadData/:path", downloadData)

export default router