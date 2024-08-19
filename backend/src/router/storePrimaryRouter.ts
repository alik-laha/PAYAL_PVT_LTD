import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import getUnEntriedStorePrimary from '../controller/StorePrimaryController/getUntriedStorePrimary';
import getStorebyGatePass from '../controller/StorePrimaryController/getStoreByGatePass';
import updateRcvStore from '../controller/StorePrimaryController/updateRcvStore';
import createStorePrimary from '../controller/StorePrimaryController/createStorePrimary';
import deleteStorePrimary from '../controller/StorePrimaryController/deleteStorePrimary';
import SearchStorePrimary from '../controller/StorePrimaryController/searchStorePrimary';
import sumofStorePrimary from '../controller/StorePrimaryController/sumofStorePrimary';
import getEditStorePrimary from '../controller/StorePrimaryController/getEditStorePrimary';
import editstorePrimary from '../controller/StorePrimaryController/editstorePrimary';
import acceptStoreEditPrimary from '../controller/StorePrimaryController/acceptStoreEditPrimary';
import rejectStorePrimaryEdit from '../controller/StorePrimaryController/rejectStoreEditPrimary';

const router = express.Router();



router.get("/getStoreByGatePass/:lotNO", jwtVerify, getStorebyGatePass)
router.get("/getStoreNotEntried/:status", jwtVerify, getUnEntriedStorePrimary)
router.put("/updateRcvStore/:id",jwtVerify, updateRcvStore)

router.post("/createStorePrimary",jwtVerify, createStorePrimary)
router.post("/deleteStorePrimaryByID", jwtVerify, deleteStorePrimary)
router.post("/getStorePrimary", jwtVerify,SearchStorePrimary)

router.get("/getsumofStore",jwtVerify, sumofStorePrimary)
router.get("/getEditStorePrimary",jwtVerify, getEditStorePrimary)
router.post("/editStorePrimary/:id",jwtVerify, editstorePrimary)

router.get('/acceptEditStorePrimary/:id', jwtVerify,acceptStoreEditPrimary)
router.get("/rejectEditStorePrimary/:id",jwtVerify, rejectStorePrimaryEdit)

export default router;