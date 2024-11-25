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
import SumOfallelement from '../controller/qcPackageController/SumOfallelement';
import jwtVerify from '../middleWare/JwtAuthantication';
import getTotalQcCountPM from '../controller/qcPackageController/getAllEntryDetails';

const router = express.Router();

router.post("/qcpackaginginitialEntry",jwtVerify, QcPackageMaterialInitialEntry)
router.get("/getTotalQCCountPM", jwtVerify, getTotalQcCountPM);
router.post("/package_material_view", ViewQcPackageMaterial)
router.post("/packaging_meterial_qc_entry/:id", jwtVerify,QualityPackageMetrialMiddleWare, QcPackageMaterialEntry)

router.get("/downloadData", downloadData)

router.put("/modifyQcPackageMaterial/:id",jwtVerify, QualityPackageMetrialMiddleWare, ModifyQcPackageMaterial)

router.get("/viewQcPackageMaterial", jwtVerify,viewEditQcPackageMeterial)

router.get("/approveQcPackageEdit/:id",jwtVerify, ApproveQcPackageEdit)

router.get("/rejectQcPackageEdit/:id",jwtVerify, RejectQcPackageEdit)

router.get("/sumOfallelement",jwtVerify, SumOfallelement)


export default router