import express from 'express';
import QcPackageMaterialInitialEntry from '../controller/qcPackageController/qcPackageMarerialInitialEntry';
import ViewQcPackageMaterial from '../controller/qcPackageController/viewQcpackageMaterialEntry';
import QcPackageMaterialEntry from '../controller/qcPackageController/createQcPackagingMaterial';
import QualityPackageMetrialMiddleWare from '../middleWare/QualityPackageMetrialMiddleWare';
import downloadData from '../controller/qcPackageController/downloadData';
import ModifyQcPackageMaterial from '../controller/qcPackageController/modifyQcPackageMaterial';
import ApproveQcPackageEdit from '../controller/qcPackageController/ApproveQcPackageEdit';
import RejectQcPackageEdit from '../controller/qcPackageController/RejectQcPackageEdit';
import viewEditQcPackageMeterial from '../controller/qcPackageController/viewEditQcPackageMeterial';
const router = express.Router();

router.post("/qcpackaginginitialEntry", QcPackageMaterialInitialEntry)

router.post("/package_material_view", ViewQcPackageMaterial)

router.post("/packaging_meterial_qc_entry/:id", QualityPackageMetrialMiddleWare, QcPackageMaterialEntry)

router.get("/downloadData", downloadData)

router.put("/modifyQcPackageMaterial/:id", QualityPackageMetrialMiddleWare, ModifyQcPackageMaterial)

router.get("/viewQcPackageMaterial", viewEditQcPackageMeterial)

router.get("/approveQcPackageEdit/:id", ApproveQcPackageEdit)

router.get("/rejectQcPackageEdit/:id", RejectQcPackageEdit)

export default router