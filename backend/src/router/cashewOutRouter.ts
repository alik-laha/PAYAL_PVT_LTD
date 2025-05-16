import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';

import { approveCashewOut, batchdataFind, EditCashewOutEntry, EditRejectCashewOut, getAllcashewOutEditPending, getCashewOutByGatePass, getUnEntriedCashewOut, SearchCashewOutPrimary, sumofAllTypeCashewOut, updateCashewOut, updateCashewOutEntire } from '../controller/cashewOutController/cashewOutApi';
const router = express.Router();

router.get('/getCashewOuteditpending', jwtVerify, getAllcashewOutEditPending);
router.get('/sumofAllCashewOutEntry', jwtVerify, sumofAllTypeCashewOut);
router.get("/getCashewOutNotEntried/:status", jwtVerify, getUnEntriedCashewOut)
router.get("/getCashewOutByGatePass/:lotNO", jwtVerify, getCashewOutByGatePass)
router.put("/updateRcvCashewOut/:id",jwtVerify, updateCashewOut)
router.put("/updateRcvCashewOutEntire/:id",jwtVerify, updateCashewOutEntire)
router.put('/CashewOutprimarysearch', jwtVerify, SearchCashewOutPrimary);
//Edit Reject Rcn Entry by Id
router.delete('/rejectededitCashewOut/:id', jwtVerify, EditRejectCashewOut);
//Edit Approve Rcn Entry by Id
router.put("/approveeditCashewOut/:id", jwtVerify, approveCashewOut);
router.post("/findcompleteBatchNo", jwtVerify,batchdataFind)
router.post("/updateCashewOut/:id",jwtVerify, EditCashewOutEntry)





export default router;