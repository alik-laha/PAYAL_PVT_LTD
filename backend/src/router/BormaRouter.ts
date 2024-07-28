import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import getBormaLot from "../controller/BormaController/getBormaLot";
import findEditBormaAll from "../controller/BormaController/findEditBormaAll";
const router = express()

router.get("/getUnBormaEntry/:status", jwtVerify, getBormaLot)
router.get("/findEditBormaAll", jwtVerify, findEditBormaAll)

export default router