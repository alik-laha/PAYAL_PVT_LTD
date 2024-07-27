import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import getBormaLot from "../controller/BoilingController/getBormaLot";
const router = express()

router.get("/getUnBoiledEntry/:status", jwtVerify, getBormaLot)

export default router