import express from "express";
import CreateGrading from "../controller/GradingController/CreateGrading";
import SearchGrading from "../controller/GradingController/SearchGrading";

const router = express()

router.post("/createGrading", CreateGrading)

router.post("/searchgrading", SearchGrading)

export default router