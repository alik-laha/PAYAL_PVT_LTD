import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import GetAllIssueEditPendingData from '../controller/IssueController/getallIssuePending';
import sumOfallIssue from '../controller/IssueController/sumofAllIssue';
import CreateIssueEntire from '../controller/IssueController/createIssueEntire';
import SearchIssueItem from '../controller/IssueController/searchIssueItem';
const router = express.Router();


router.get("/getPendingIssueData", jwtVerify, GetAllIssueEditPendingData)
router.get("/sumofallIssueUnit", jwtVerify, sumOfallIssue)
router.post("/createIssueItemEntire", jwtVerify, CreateIssueEntire)
router.post("/searchItemIssue", jwtVerify, SearchIssueItem)
export default router