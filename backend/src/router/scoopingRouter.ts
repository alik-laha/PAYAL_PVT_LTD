import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateInitialScooping from "../controller/scoopingController/createInitialScooping";
import getprevScoop from "../controller/scoopingController/getprevScoop";
import deleteSccopingByLot from "../controller/scoopingController/deleteScoopingByLot";
import sumOfAllScoop from "../controller/scoopingController/sumOfAllScoop";

const router = express()

router.post("/createInitialScooping",jwtVerify,CreateInitialScooping )
router.post("/getPrevScoop",jwtVerify,getprevScoop )
router.delete('/deleteScoopingByLotNo/:id', jwtVerify, deleteSccopingByLot)
router.get("/sumofallscoop", jwtVerify, sumOfAllScoop)

export default router