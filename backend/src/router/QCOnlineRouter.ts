import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';


import editQCWater from '../controller/QCWaterController/editQCWater';


import { CreateBoiler, CreateBoiling, CreateBorma, CreateGrading, CreateHumidifier, CreateScooping, SearchBoiler, SearchBoiling, SearchGrading, sumOfallQCOnline } from '../controller/QCOnline/QCOnlineApi';

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


router.post("/editQCWater/:id",jwtVerify, editQCWater)


export default router