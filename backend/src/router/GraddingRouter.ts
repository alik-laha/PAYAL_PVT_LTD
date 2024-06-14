import express from "express";
import CreateGrading from "../controller/GradingController/CreateGrading";
import SearchGrading from "../controller/GradingController/SearchGrading";
import UpdateGradding from "../controller/GradingController/UpdateGradding";
import GetAllEditPendingData from "../controller/GradingController/GetAllEditPendingData";
import sumOfallGrade from "../controller/GradingController/sumOfallGrade";
import ApproveEditStatus from "../controller/GradingController/ApproveEditStatus";
import rejectEditStatus from "../controller/GradingController/rejectEditStatus";
import GradingMiddleWare from "../middleWare/GraddingMiddleWare";

const router = express()

router.post("/createGrading", GradingMiddleWare, CreateGrading)

router.post("/searchgrading", SearchGrading)

router.put("/updateGrading/:id", GradingMiddleWare, UpdateGradding)

router.get("/getPendingData", GetAllEditPendingData)

router.get("/sumofallgrade", sumOfallGrade)

router.post("/approveEditStatus/:id", ApproveEditStatus)

router.post("/rejectEditStatus/:id", rejectEditStatus)

export default router