import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';

const router = express.Router();


router.post("/createPM",jwtVerify, RecivingPackageMaterial)
router.put("/updateRcvStore/:id",jwtVerify, updatePM)

router.post("/getreceivematerial", jwtVerify,viewReceivingPackageMetrial)
router.get("/geteditrecevingpackagematerial",jwtVerify, editedRecevingPackageMaterial)
router.get("/getsumofEditRecevingPackageMaterial",jwtVerify, sumOfAllRecenvingPackageMaterial)
router.post("/editrecevingpackagematerial/:id",jwtVerify, editRecevingPackageMaterial)
router.get('/accepteditrecevingpackagematerial/:id', jwtVerify,acceptRecevingPackageEdit)
router.get("/rejecteditrecevingpackagematerial/:id",jwtVerify, rejectRecevingPackageEdit)

router.get("/getPMNotEntried/:status", jwtVerify, getUnEntriedPM)
router.get("/getPMByGatePass/:lotNO", jwtVerify, getPMbyGatePass)
router.post("/deletePMByID", jwtVerify, deletePMbyID)
router.post("/updateGatePass/:lotNO", jwtVerify, deletePMbyID)

export default router;