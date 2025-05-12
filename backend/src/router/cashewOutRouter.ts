import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';



import updateAgarbatiExit from '../controller/AgarbatiController/createRcvAgarbati';
import updateRcvAgarbatiEntire from '../controller/AgarbatiController/createRcvAgarbatiEntire';
import SearchAgarbatiPrimary from '../controller/AgarbatiController/searchAgarbati';
import EditRejectAgarbati from '../controller/AgarbatiController/rejectAgarbatiEdit';
import approveAgarbati from '../controller/AgarbatiController/approveAgarbatiEdit';
import EditAgarbatiEntry from '../controller/AgarbatiController/editAgarbati';
import { batchdataFind, getAllcashewOutEditPending, getCashewOutByGatePass, getUnEntriedCashewOut, sumofAllTypeCashewOut } from '../controller/cashewOutController/cashewOutApi';
const router = express.Router();

router.get('/getCashewOuteditpending', jwtVerify, getAllcashewOutEditPending);
router.get('/sumofAllCashewOutEntry', jwtVerify, sumofAllTypeCashewOut);
router.get("/getCashewOutNotEntried/:status", jwtVerify, getUnEntriedCashewOut)
router.get("/getCashewOutByGatePass/:lotNO", jwtVerify, getCashewOutByGatePass)

router.put("/updateRcvAgarbati/:id",jwtVerify, updateAgarbatiExit)
router.put("/updateRcvAgarbatiEntire/:id",jwtVerify, updateRcvAgarbatiEntire)
router.put('/agarbatiprimarysearch', jwtVerify, SearchAgarbatiPrimary);
//Edit Reject Rcn Entry by Id
router.delete('/rejectededitAgarbati/:id', jwtVerify, EditRejectAgarbati);
//Edit Approve Rcn Entry by Id
router.put("/approveeditAgarbati/:id", jwtVerify, approveAgarbati);
router.post("/findcompleteBatchNo", jwtVerify,batchdataFind)

router.post("/updateAgarbati/:id",jwtVerify, EditAgarbatiEntry)





export default router;