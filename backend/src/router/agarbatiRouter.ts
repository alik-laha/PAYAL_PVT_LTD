import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';

import SearchAlmondPrimary from '../controller/almondController/searchAlmond';

import EditAlmondEntry from '../controller/almondController/EditAlmondEntry';
import approveAlmond from '../controller/almondController/approveAlmondEntry';
import EditRejectAlmond from '../controller/almondController/rejectAlmondEntry';

import getAllAgarbatiEditPending from '../controller/AgarbatiController/getEditPendingAgarbati';
import sumofAllTypeAgarbati from '../controller/AgarbatiController/sumOfAllTypeAgarbati';
import getUnEntriedAgarbati from '../controller/AgarbatiController/getUnEntriedAgarbati';
import getAgarbatiByGatePass from '../controller/AgarbatiController/getAgarbatiByGatePass';
import updateAgarbatiExit from '../controller/AgarbatiController/createRcvAgarbati';
import updateRcvAgarbatiEntire from '../controller/AgarbatiController/createRcvAgarbatiEntire';
const router = express.Router();

router.get('/getAgarbatieditpending', jwtVerify, getAllAgarbatiEditPending);
router.get('/sumofAllAgarbatiEntry', jwtVerify, sumofAllTypeAgarbati);
router.get("/getAgarbatiNotEntried/:status", jwtVerify, getUnEntriedAgarbati)
router.get("/getAgarbatiByGatePass/:lotNO", jwtVerify, getAgarbatiByGatePass)
router.put("/updateRcvAgarbati/:id",jwtVerify, updateAgarbatiExit)
router.put("/updateRcvAlmondEntire/:id",jwtVerify, updateRcvAgarbatiEntire)



router.put('/almondprimarysearch', jwtVerify, SearchAlmondPrimary);
router.post("/updateAlmond/:id",jwtVerify, EditAlmondEntry)

//Edit Reject Rcn Entry by Id
router.delete('/rejectededitAlmond/:id', jwtVerify, EditRejectAlmond);

//Edit Approve Rcn Entry by Id
router.put("/approveeditAlmond/:id", jwtVerify, approveAlmond);



export default router;