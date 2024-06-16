import express from "express";
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateBoiling from "../controller/BoilingController/createBoiling";
const router = express.Router();

router.post("/createBoiling", jwtVerify, CreateBoiling)

export default router;