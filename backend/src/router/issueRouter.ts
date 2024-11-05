import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import GetAllIssueEditPendingData from '../controller/IssueController/getallIssuePending';
import sumOfallIssue from '../controller/IssueController/sumofAllIssue';
import CreateIssueEntire from '../controller/IssueController/createIssueEntire';
const router = express.Router();


router.get("/getPendingIssueData", jwtVerify, GetAllIssueEditPendingData)
router.get("/sumofallIssueUnit", jwtVerify, sumOfallIssue)
router.post("/createIssueItemEntire", jwtVerify, CreateIssueEntire)
export default router