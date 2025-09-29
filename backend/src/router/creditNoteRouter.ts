import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';

import { approveCashewOut, batchdataFind, EditCashewOutEntry, EditRejectCashewOut } from '../controller/cashewOutController/cashewOutApi';

import { getCreditNoteByGatePass, getCreditNoteeditpending, getUnEntriedCreditNote, searchCreditNote, sumofAllTypeCreditNote, updateCreditNote, updateCreditNoteEntire } from '../controller/CreditNoteController/CreditNoteApi';
const router = express.Router();

router.get('/getCreditNoteeditpending', jwtVerify, getCreditNoteeditpending);
router.get('/sumofAllCreditNoteEntry', jwtVerify, sumofAllTypeCreditNote);
router.get("/getCreditNoteNotEntried/:status", jwtVerify, getUnEntriedCreditNote)
router.get("/getCreditNoteByGatePass/:lotNO", jwtVerify, getCreditNoteByGatePass)


router.put("/updateRcvCreditNote/:id",jwtVerify, updateCreditNote)
router.put("/updateRcvCreditNotetEntire/:id",jwtVerify, updateCreditNoteEntire)

router.post('/getcreditNotePrimary', jwtVerify, searchCreditNote);
//Edit Reject Rcn Entry by Id
router.delete('/rejectededitCashewOut/:id', jwtVerify, EditRejectCashewOut);
//Edit Approve Rcn Entry by Id
router.put("/approveeditCashewOut/:id", jwtVerify, approveCashewOut);
router.post("/findcompleteBatchNo", jwtVerify,batchdataFind)
router.post("/updateCashewOut/:id",jwtVerify, EditCashewOutEntry)





export default router;