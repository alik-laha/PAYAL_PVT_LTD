import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import sumofAllTypeAlmond from '../controller/almondController/sumofAlmondEntry';
import getUnEntriedAlmond from '../controller/almondController/getUntriedAlmond';
import getAlmondByGatePass from '../controller/almondController/getAlmondByGatePass';
import updateAlmondPrimaryEntry from '../controller/almondController/updateAlmondEntry';
import updateAlmondExit from '../controller/almondController/updateAlmondExit';
import createAlmondExit from '../controller/almondController/createAlmondExit';
import deleteAlmondPrimary from '../controller/almondController/deleteAlmondByGatePass';
import SearchAlmondPrimary from '../controller/almondController/searchAlmond';
import getAllAlmondEditPending from '../controller/almondController/getAllAlmondEditPending';
import EditAlmondEntry from '../controller/almondController/EditAlmondEntry';
import approveAlmond from '../controller/almondController/approveAlmondEntry';
import EditRejectAlmond from '../controller/almondController/rejectAlmondEntry';
const router = express.Router();

router.get('/sumofAllAlmondEntry', jwtVerify, sumofAllTypeAlmond);
router.get("/getAlmondNotEntried/:status", jwtVerify, getUnEntriedAlmond)
router.get("/getAlmondByGatePass/:lotNO", jwtVerify, getAlmondByGatePass)
router.post('/updateAlmondEntry', jwtVerify, updateAlmondPrimaryEntry);
router.put("/updateRcvAlmond/:id",jwtVerify, updateAlmondExit)
router.post("/createAlmondPrimary",jwtVerify, createAlmondExit)
router.post("/deleteAlmondByID", jwtVerify, deleteAlmondPrimary)

router.put('/almondprimarysearch', jwtVerify, SearchAlmondPrimary);
router.get('/getAlmondeditpending', jwtVerify, getAllAlmondEditPending);

router.post("/updateAlmond/:id",jwtVerify, EditAlmondEntry)

//Edit Reject Rcn Entry by Id
router.delete('/rejectededitAlmond/:id', jwtVerify, EditRejectAlmond);

//Edit Approve Rcn Entry by Id
router.put("/approveeditAlmond/:id", jwtVerify, approveAlmond);

export default router;