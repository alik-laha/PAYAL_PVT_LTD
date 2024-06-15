import express from 'express';
import qcInitialEntry from '../controller/qcController/qcInitialEntry';
import SearchQcRCN from '../controller/qcController/SearchQcRCN';
import approveQCinitial from '../controller/qcController/approveQCinitial';
import creatercnReport from '../controller/qcController/creatercnReport';
import rejectQCinitial from '../controller/qcController/rejectQCinitial';
import modifyrcnReport from '../controller/qcController/modifyrcnReport';
import getTotalQcCount from '../controller/qcController/getTotalQcCount';
import searchEditQCRCN from '../controller/qcController/searcheditqcrcn';
import ApproveEditQCRcn from '../controller/qcController/approveEditQCRcn';
import rejectEditQCRcn from '../controller/qcController/rejectEditQCRcn';
import jwtVerify from '../middleWare/JwtAuthantication';
const router = express.Router();

router.post("/qcInitialEntry", jwtVerify, qcInitialEntry)
//search Rcn Entry by ConBlNo, fromDate, toDate, origin
router.put('/searchqcRcn', jwtVerify, SearchQcRCN);
//Edit Approve Rcn Entry by Id
router.put("/qcRcnApprove/:id", jwtVerify, approveQCinitial);
router.put("/qcRcnReject/:id", jwtVerify, rejectQCinitial);
router.put("/createQcRcn/:id", jwtVerify, creatercnReport);
router.put("/modifyQcRcn/:id", jwtVerify, modifyrcnReport);
router.get("/getTotalQCCount", jwtVerify, getTotalQcCount);
router.get("/getTotalEditQC", jwtVerify, searchEditQCRCN);
router.put("/approveEditQcReport/:id", jwtVerify, ApproveEditQCRcn);
router.delete("/rejectEditQcReport/:id", jwtVerify, rejectEditQCRcn);

export default router;