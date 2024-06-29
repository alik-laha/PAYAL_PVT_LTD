import express from "express";
import CreateGrading from "../controller/GradingController/CreateGrading";
import SearchGrading from "../controller/GradingController/SearchGrading";
import UpdateGradding from "../controller/GradingController/UpdateGradding";
import GetAllEditPendingData from "../controller/GradingController/GetAllEditPendingData";
import sumOfallGrade from "../controller/GradingController/sumOfallGrade";
import ApproveEditStatus from "../controller/GradingController/ApproveEditStatus";
import rejectEditStatus from "../controller/GradingController/rejectEditStatus";
import GradingMiddleWare from "../middleWare/GraddingMiddleWare";
import jwtVerify from "../middleWare/JwtAuthantication";
import getGradingStockByOrigin from "../controller/GradingController/getGradingStockbyOrigin";

const router = express()

router.post("/createGrading", jwtVerify, GradingMiddleWare, CreateGrading)

router.post("/searchgrading", jwtVerify, SearchGrading)

router.put("/updateGrading/:id", jwtVerify, GradingMiddleWare, UpdateGradding)

router.get("/getPendingData", jwtVerify, GetAllEditPendingData)

router.get("/sumofallgrade", jwtVerify, sumOfallGrade)

router.post("/approveEditStatus/:id", jwtVerify, ApproveEditStatus)

router.post("/rejectEditStatus/:id", jwtVerify, rejectEditStatus)

router.get('/getGradeStockByOrigin/:origin', jwtVerify, getGradingStockByOrigin)

export default router