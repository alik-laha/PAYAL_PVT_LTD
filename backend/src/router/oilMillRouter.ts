import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';





import EditAlmondEntry from '../controller/almondController/EditAlmondEntry';


import getAllOilMillEditPending from '../controller/OilMillController/getOilMillEditPending';
import sumofAllTypeOilMill from '../controller/OilMillController/sumOfAllOilMillPending';
import getUnEntriedOilMill from '../controller/OilMillController/getUnEntriedOilMill';
import getOilMillByGatePass from '../controller/OilMillController/getOilMillByGatepass';
import updateOilMIllExit from '../controller/OilMillController/updateOilMillsingle';
import updateRcvOilMIllEntire from '../controller/OilMillController/updateRcvOilMillEntire';
import SearchOilMill from '../controller/OilMillController/searchOilMill';
import approveOilMIll from '../controller/OilMillController/approveOilMill';
import EditRejectOilMill from '../controller/OilMillController/rejectOilMill';
import EditOilMIllEntry from '../controller/OilMillController/editOilMill';
const router = express.Router();

router.get('/sumofAllOilMillEntry', jwtVerify, sumofAllTypeOilMill);
router.get("/getOilMillNotEntried/:status", jwtVerify, getUnEntriedOilMill)
router.get("/getOilMillByGatePass/:lotNO", jwtVerify, getOilMillByGatePass)

router.put("/updateRcvOilMill/:id",jwtVerify, updateOilMIllExit)
router.put("/updateRcvOilMillEntire/:id",jwtVerify, updateRcvOilMIllEntire)


router.put('/oilMillprimarysearch', jwtVerify, SearchOilMill);
router.get('/getoilMilleditpending', jwtVerify, getAllOilMillEditPending);

router.post("/updateOilMill/:id",jwtVerify, EditOilMIllEntry)

//Edit Reject Rcn Entry by Id
router.delete('/rejectededitOilMill/:id', jwtVerify, EditRejectOilMill);

//Edit Approve Rcn Entry by Id
router.put("/approveeditOilMill/:id", jwtVerify, approveOilMIll);



export default router;