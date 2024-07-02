import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

const router = express()

router.post("/createScooping",jwtVerify )



export default router