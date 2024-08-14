import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import getUnEntriedStorePrimary from '../controller/StorePrimaryController/getUntriedStorePrimary';
import getStorebyGatePass from '../controller/StorePrimaryController/getStoreByGatePass';

const router = express.Router();



router.get("/getStoreByGatePass/:lotNO", jwtVerify, getStorebyGatePass)
router.get("/getStoreNotEntried/:status", jwtVerify, getUnEntriedStorePrimary)


export default router;