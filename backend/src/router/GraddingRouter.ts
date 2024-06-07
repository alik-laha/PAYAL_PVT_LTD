import express from "express";
import CreateGrading from "../controller/GradingController/CreateGrading";
import SearchGrading from "../controller/GradingController/SearchGrading";
import UpdateGradding from "../controller/GradingController/UpdateGradding";
import GetAllEditPendingData from "../controller/GradingController/GetAllEditPendingData";
import sumOfallGrade from "../controller/GradingController/sumOfallGrade";
import ApproveEditStatus from "../controller/GradingController/ApproveEditStatus";

const router = express()

router.post("/createGrading", CreateGrading)

router.post("/searchgrading", SearchGrading)

router.put("/updateGrading/:id", UpdateGradding)

router.get("/getPendingData", GetAllEditPendingData)

router.get("/sumofallgrade", sumOfallGrade)

router.post("/approveEditStatus/:id", ApproveEditStatus)

export default router