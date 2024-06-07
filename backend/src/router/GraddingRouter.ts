import express from "express";
import CreateGrading from "../controller/GradingController/CreateGrading";
import SearchGrading from "../controller/GradingController/SearchGrading";
import UpdateGradding from "../controller/GradingController/UpdateGradding";

const router = express()

router.post("/createGrading", CreateGrading)

router.post("/searchgrading", SearchGrading)

router.put("/updateGrading/:id", UpdateGradding)

export default router