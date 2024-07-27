import express from 'express';
import QcPackageMaterialInitialEntry from '../controller/qcPackageController/qcPackageMarerialInitialEntry';
import ViewQcPackageMaterial from '../controller/qcPackageController/viewQcpackageMaterialEntry';
import QcPackageMaterialEntry from '../controller/qcPackageController/createQcPackagingMaterial';
const router = express.Router();

router.post("/qcpackaginginitialEntry", QcPackageMaterialInitialEntry)

router.post("/package_material_view", ViewQcPackageMaterial)

router.post("/packaging_meterial_qc_entry/:id", QcPackageMaterialEntry)

export default router