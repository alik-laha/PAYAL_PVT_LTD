import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import getUnEntriedStorePrimary from '../controller/StorePrimaryController/getUntriedStorePrimary';
import getStorebyGatePass from '../controller/StorePrimaryController/getStoreByGatePass';
import updateRcvStore from '../controller/StorePrimaryController/updateRcvStore';
import createStorePrimary from '../controller/StorePrimaryController/createStorePrimary';

const router = express.Router();



router.get("/getStoreByGatePass/:lotNO", jwtVerify, getStorebyGatePass)
router.get("/getStoreNotEntried/:status", jwtVerify, getUnEntriedStorePrimary)
router.put("/updateRcvStore/:id",jwtVerify, updateRcvStore)

router.post("/createStorePrimary",jwtVerify, createStorePrimary)

export default router;