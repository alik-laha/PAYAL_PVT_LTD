import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import getAllAgarbatiEditPending from '../controller/AgarbatiController/getEditPendingAgarbati';
import sumofAllTypeAgarbati from '../controller/AgarbatiController/sumOfAllTypeAgarbati';
import getUnEntriedAgarbati from '../controller/AgarbatiController/getUnEntriedAgarbati';
import getAgarbatiByGatePass from '../controller/AgarbatiController/getAgarbatiByGatePass';
import updateAgarbatiExit from '../controller/AgarbatiController/createRcvAgarbati';
import updateRcvAgarbatiEntire from '../controller/AgarbatiController/createRcvAgarbatiEntire';
import SearchAgarbatiPrimary from '../controller/AgarbatiController/searchAgarbati';
import EditRejectAgarbati from '../controller/AgarbatiController/rejectAgarbatiEdit';
import approveAgarbati from '../controller/AgarbatiController/approveAgarbatiEdit';
import EditAgarbatiEntry from '../controller/AgarbatiController/editAgarbati';
const router = express.Router();

router.get('/getAgarbatieditpending', jwtVerify, getAllAgarbatiEditPending);
router.get('/sumofAllAgarbatiEntry', jwtVerify, sumofAllTypeAgarbati);
router.get("/getAgarbatiNotEntried/:status", jwtVerify, getUnEntriedAgarbati)
router.get("/getAgarbatiByGatePass/:lotNO", jwtVerify, getAgarbatiByGatePass)
router.put("/updateRcvAgarbati/:id",jwtVerify, updateAgarbatiExit)
router.put("/updateRcvAgarbatiEntire/:id",jwtVerify, updateRcvAgarbatiEntire)
router.put('/agarbatiprimarysearch', jwtVerify, SearchAgarbatiPrimary);
//Edit Reject Rcn Entry by Id
router.delete('/rejectededitAgarbati/:id', jwtVerify, EditRejectAgarbati);
//Edit Approve Rcn Entry by Id
router.put("/approveeditAgarbati/:id", jwtVerify, approveAgarbati);


router.post("/updateAgarbati/:id",jwtVerify, EditAgarbatiEntry)





export default router;