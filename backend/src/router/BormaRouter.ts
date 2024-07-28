import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import getBormaLot from "../controller/BormaController/getBormaLot";
import findEditBormaAll from "../controller/BormaController/findEditBormaAll";
import sumOfallBorma from "../controller/BormaController/sumofallBorma";
import getBormaBylot from "../controller/BormaController/getBormaByLot";
const router = express()

router.get("/getUnBormaEntry/:status", jwtVerify, getBormaLot)
router.get("/findEditBormaAll", jwtVerify, findEditBormaAll)
router.get("/sumofallborma", jwtVerify, sumOfallBorma)
router.get("/getBormaByLot/:lotNO", jwtVerify, getBormaBylot)

export default router