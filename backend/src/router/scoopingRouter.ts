import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateInitialScooping from "../controller/scoopingController/createInitialScooping";
import getprevScoop from "../controller/scoopingController/getprevScoop";
import deleteSccopingByLot from "../controller/scoopingController/deleteScoopingByLot";
import sumOfAllScoop from "../controller/scoopingController/sumOfAllScoop";
import getscoopLot from "../controller/scoopingController/getscoopLot";
import getscoopByLot from "../controller/scoopingController/getscoopByLot";
import createscoopingReport from "../controller/scoopingController/createscoopingReport";

const router = express()

router.post("/createInitialScooping",jwtVerify,CreateInitialScooping )
router.post("/getPrevScoop",jwtVerify,getprevScoop )
router.delete('/deleteScoopingByLotNo/:id', jwtVerify, deleteSccopingByLot)
router.get("/sumofallscoop", jwtVerify, sumOfAllScoop)
router.get("/getUnscoopedEntry", jwtVerify, getscoopLot)
router.get("/getScoopByLot/:lotNO", jwtVerify, getscoopByLot)
router.put("/createScooping/:id", jwtVerify, createscoopingReport)
export default router