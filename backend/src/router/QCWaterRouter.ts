import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import GetAllIssueEditPendingData from '../controller/IssueController/getallIssuePending';
import sumOfallIssue from '../controller/IssueController/sumofAllIssue';

import editstoreIssue from '../controller/IssueController/editStoreIssue';
import acceptIssueEditPrimary from '../controller/IssueController/acceptIssuePrimary';
import rejectIssuePrimaryEdit from '../controller/IssueController/rejectIssuePrimary';
import CreateQCWaterEntire from '../controller/QCWaterController/createQCWater';
import SearchQCWater from '../controller/QCWaterController/searchQCWater';
const router = express.Router();


// router.get("/getPendingIssueData", jwtVerify, GetAllIssueEditPendingData)
// router.get("/sumofallIssueUnit", jwtVerify, sumOfallIssue)
router.post("/createQCWaterEntire", jwtVerify, CreateQCWaterEntire)
router.post("/searchQCWater", jwtVerify, SearchQCWater)
router.post("/editStoreIssue/:id",jwtVerify, editstoreIssue)
router.get('/acceptEditIssuePrimary/:id', jwtVerify,acceptIssueEditPrimary)
router.get("/rejectEditIssuePrimary/:id",jwtVerify, rejectIssuePrimaryEdit)
export default router