import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';


import editQCOnlineBoiling, { CreateBoiler, CreateBoiling, CreateBorma, CreateGrading, CreateHumidifier, CreateScooping, editQCOnlineBoiler, editQCOnlineBorma, SearchBoiler, SearchBoiling, SearchBorma, SearchGrading, SearchHumidifier, SearchScooping, sumOfallQCOnline } from '../controller/QCOnline/QCOnlineApi';

const router = express.Router();




 router.get("/sumofallQCOnline", jwtVerify, sumOfallQCOnline)

 router.post("/createQCOnlineBoiler", jwtVerify, CreateBoiler)
 router.post("/createQCOnlineGrading", jwtVerify, CreateGrading)
 router.post("/createQCOnlineBoiling", jwtVerify, CreateBoiling)
 router.post("/createQCOnlineScooping", jwtVerify, CreateScooping)
 router.post("/createQCOnlineBorma", jwtVerify, CreateBorma)
 router.post("/createQCOnlineHumid", jwtVerify, CreateHumidifier)



router.post("/searchQCOnlineBoiler", jwtVerify, SearchBoiler)
router.post("/searchQCOnlineGrading", jwtVerify, SearchGrading)
router.post("/searchQCOnlineBoiling", jwtVerify, SearchBoiling)
router.post("/searchQCOnlineScooping", jwtVerify, SearchScooping)
router.post("/searchQCOnlineBorma", jwtVerify, SearchBorma)
router.post("/searchQCOnlineHumidifier", jwtVerify, SearchHumidifier)


router.post("/editQCOnlineBoiler/:id",jwtVerify, editQCOnlineBoiler)
router.put("/editQCOnlineBoiling/:id",jwtVerify, editQCOnlineBoiling)
router.put("/updateQCOnlineBorma/:id",jwtVerify, editQCOnlineBorma)


export default router