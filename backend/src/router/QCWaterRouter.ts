import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';

import CreateQCWaterEntire from '../controller/QCWaterController/createQCWater';
import SearchQCWater from '../controller/QCWaterController/searchQCWater';
import GetAllQCWaterEditPendingData from '../controller/QCWaterController/getPendingQCWater';
import acceptQCWaterEditPrimary from '../controller/QCWaterController/acceptQCWater';
import editQCWater from '../controller/QCWaterController/editQCWater';
import rejectQCWaterPrimaryEdit from '../controller/QCWaterController/rejectQCWater';
import sumOfallQCWater from '../controller/QCWaterController/sumOfallQCWater';
const router = express.Router();


 router.get("/getPendingQCWaterData", jwtVerify, GetAllQCWaterEditPendingData)
 router.get("/sumofallQCWater", jwtVerify, sumOfallQCWater)
router.post("/createQCWaterEntire", jwtVerify, CreateQCWaterEntire)
router.post("/searchQCWater", jwtVerify, SearchQCWater)
router.post("/editQCWater/:id",jwtVerify, editQCWater)
router.get('/acceptEditQCWaterPrimary/:id', jwtVerify,acceptQCWaterEditPrimary)
router.get("/rejectEditQCWaterPrimary/:id",jwtVerify, rejectQCWaterPrimaryEdit)
export default router