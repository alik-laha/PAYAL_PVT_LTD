import express from "express";
import CreateGrading from "../controller/GradingController/CreateGrading";

const router = express()

router.post("/createGrading", CreateGrading)

export default router