import express from "express";
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateBoiling from "../controller/BoilingController/createBoiling";
import BoilingMiddleWare from "../middleWare/BoilingMiddleware";
import SearchBoiling from "../controller/BoilingController/searchBoiling";
import sumOfallBoil from "../controller/BoilingController/sumOfAllBoil";
import GetAllEditPendingData from "../controller/BoilingController/getAllEditPending";
import BoilingEditMiddleWare from "../middleWare/BoilingEditMiddleware";
import UpdateBoiling from "../controller/BoilingController/updateBoiling";
import rejectEditBoiling from "../controller/BoilingController/rejectEditBoiling";
import approveEditBoiling from "../controller/BoilingController/approveEditBoilig";
const router = express.Router();

router.post("/createBoiling", jwtVerify,BoilingMiddleWare, CreateBoiling)
router.post("/searchBoiling", jwtVerify, SearchBoiling)
router.get("/sumofallboil", jwtVerify, sumOfallBoil)
router.get("/geteditpendingboiling", jwtVerify, GetAllEditPendingData)
router.put("/updateBoiling/:id", jwtVerify, BoilingEditMiddleWare,UpdateBoiling)
router.post("/rejectededitrcnboiling/:id", jwtVerify, rejectEditBoiling)
router.post("/approveEditrcnBoiling/:id", jwtVerify, approveEditBoiling)

export default router;