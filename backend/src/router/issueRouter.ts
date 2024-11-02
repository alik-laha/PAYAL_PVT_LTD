import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import GetAllIssueEditPendingData from '../controller/IssueController/getallIssuePending';
import sumOfallIssue from '../controller/IssueController/sumofAllIssue';
const router = express.Router();


router.get("/getPendingIssueData", jwtVerify, GetAllIssueEditPendingData)
router.get("/sumofallIssueUnit", jwtVerify, sumOfallIssue)
export default router