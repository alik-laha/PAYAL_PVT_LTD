import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';


import { approveEditCreditNote, createEntireRLOT, EditCreditNoteEntry, getCreditNoteByGatePass, getCreditNoteeditpending, getRcvCreditNotebyDate, getStatusRLOT, getUnEntriedCreditNote, getUnEntriedRcvCreditNoteRLOT,  rejectCreditNotePrimaryEdit, searchCreditNote, searchRLOTDetails, sumofAllTypeCreditNote, updateCreditNote, updateCreditNoteEntire } from '../controller/CreditNoteController/CreditNoteApi';


const router = express.Router();

router.get('/getCreditNoteeditpending', jwtVerify, getCreditNoteeditpending);
router.get('/sumofAllCreditNoteEntry', jwtVerify, sumofAllTypeCreditNote);
router.get("/getCreditNoteNotEntried/:status", jwtVerify, getUnEntriedCreditNote)
router.get("/getCreditNoteByGatePass/:lotNO", jwtVerify, getCreditNoteByGatePass)
router.put("/updateRcvCreditNote/:id",jwtVerify, updateCreditNote)
router.put("/updateRcvCreditNotetEntire/:id",jwtVerify, updateCreditNoteEntire)
router.post('/getcreditNotePrimary', jwtVerify, searchCreditNote);
router.get('/rejectEditCreditNotePrimary/:id', jwtVerify, rejectCreditNotePrimaryEdit);
router.get("/acceptEditCreditNotePrimary/:id", jwtVerify, approveEditCreditNote);
router.post("/updateCreditNote/:id",jwtVerify, EditCreditNoteEntry)


router.get("/getRcvCreditNoteRLOT", jwtVerify, getUnEntriedRcvCreditNoteRLOT)
router.get("/getRcvCreditNotenByDate/:lotNO", jwtVerify, getRcvCreditNotebyDate)

  router.post("/createEntireRLOT", jwtVerify,createEntireRLOT)
  router.post("/getStatusRLOT", jwtVerify,getStatusRLOT)
  router.post("/getRLOTDetails", jwtVerify,searchRLOTDetails)





export default router;