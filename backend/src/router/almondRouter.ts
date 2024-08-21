import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import sumofAllTypeAlmond from '../controller/almondController/sumofAlmondEntry';
import getUnEntriedAlmond from '../controller/almondController/getUntriedAlmond';
import getAlmondByGatePass from '../controller/almondController/getAlmondByGatePass';
const router = express.Router();

router.get('/sumofAllAlmondEntry', jwtVerify, sumofAllTypeAlmond);
router.get("/getAlmondNotEntried/:status", jwtVerify, getUnEntriedAlmond)
router.get("/getAlmondByGatePass/:lotNO", jwtVerify, getAlmondByGatePass)


export default router;