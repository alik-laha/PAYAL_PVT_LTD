import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import RecivingPackageMaterial from '../controller/RecevingPackageingMetrial/RecivingPackageMaterial';

import viewReceivingPackageMetrial from '../controller/RecevingPackageingMetrial/viewReceivingPackageMetrial';
import editedRecevingPackageMaterial from '../controller/RecevingPackageingMetrial/editedRecevingPackageMaterial';
import sumOfAllRecenvingPackageMaterial from '../controller/RecevingPackageingMetrial/sumOfAllPendingEditData';
import editRecevingPackageMaterial from '../controller/RecevingPackageingMetrial/editRecevingPackageMetrial';
import acceptRecevingPackageEdit from '../controller/RecevingPackageingMetrial/acceptrecevingPackageedit';
import rejectRecevingPackageEdit from '../controller/RecevingPackageingMetrial/rejectrecevingPackageedit';
import getUnEntriedPM from '../controller/RecevingPackageingMetrial/getUnEntriedPM';
import getPMbyGatePass from '../controller/RecevingPackageingMetrial/getPMbyGatePass';
import updatePM from '../controller/RecevingPackageingMetrial/updatePM';
import deletePMbyID from '../controller/RecevingPackageingMetrial/deletePMbyID';
import updatePMEntire from '../controller/RecevingPackageingMetrial/updatePMEntire';
const router = express.Router();


router.post("/createPM",jwtVerify, RecivingPackageMaterial)
router.put("/updateRcvPM/:id",jwtVerify, updatePM)

router.post("/getreceivematerial", jwtVerify,viewReceivingPackageMetrial)
router.get("/geteditrecevingpackagematerial",jwtVerify, editedRecevingPackageMaterial)
router.get("/getsumofEditRecevingPackageMaterial",jwtVerify, sumOfAllRecenvingPackageMaterial)
router.post("/editrecevingpackagematerial/:id",jwtVerify, editRecevingPackageMaterial)
router.get('/accepteditrecevingpackagematerial/:id', jwtVerify,acceptRecevingPackageEdit)
router.get("/rejecteditrecevingpackagematerial/:id",jwtVerify, rejectRecevingPackageEdit)

router.get("/getPMNotEntried/:status", jwtVerify, getUnEntriedPM)
router.get("/getPMByGatePass/:lotNO", jwtVerify, getPMbyGatePass)
router.post("/deletePMByID", jwtVerify, deletePMbyID)

router.put("/updatePMEntire/:id",jwtVerify, updatePMEntire)

export default router;