import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateInitialScooping from "../controller/scoopingController/createInitialScooping";
import getprevScoop from "../controller/scoopingController/getprevScoop";

const router = express()

router.post("/createInitialScooping",jwtVerify,CreateInitialScooping )
router.post("/getPrevScoop",jwtVerify,getprevScoop )

export default router