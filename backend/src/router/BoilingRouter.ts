import express from "express";
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateBoiling from "../controller/BoilingController/createBoiling";
import BoilingMiddleWare from "../middleWare/BoilingMiddleware";
import SearchBoiling from "../controller/BoilingController/searchBoiling";
import sumOfallBoil from "../controller/BoilingController/sumOfAllBoil";
import GetAllEditPendingData from "../controller/BoilingController/getAllEditPending";
const router = express.Router();

router.post("/createBoiling", jwtVerify,BoilingMiddleWare, CreateBoiling)
router.post("/searchBoiling", jwtVerify, SearchBoiling)
router.get("/sumofallboil", jwtVerify, sumOfallBoil)
router.get("/geteditpendingboiling", jwtVerify, GetAllEditPendingData)

export default router;