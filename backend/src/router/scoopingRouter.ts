import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateInitialScooping from "../controller/scoopingController/createScooping";

const router = express()

router.post("/createInitialScooping",jwtVerify,CreateInitialScooping )


export default router