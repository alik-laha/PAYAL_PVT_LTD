import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import CreateInitialScooping from "../controller/scoopingController/createInitialScooping";
import getprevScoop from "../controller/scoopingController/getprevScoop";
import deleteSccopingByLot from "../controller/scoopingController/deleteScoopingByLot";
import sumOfAllScoop from "../controller/scoopingController/sumOfAllScoop";
import getscoopLot from "../controller/scoopingController/getscoopLot";
import getscoopByLot from "../controller/scoopingController/getscoopByLot";
import createscoopingReport from "../controller/scoopingController/createscoopingReport";
import createscoopingAllReport from "../controller/scoopingController/createscoopingAllreport";
import SearchScooping from "../controller/scoopingController/searchScooping";
import updateScoopingOpening from "../controller/scoopingController/updateScoopingOpening";
import updateLotNo from "../controller/scoopingController/updateLotNo";
import CreateInitialBorma from "../controller/scoopingController/createInitialBorma";
import scoopingMiddleware from "../middleWare/scoopingMiddleware";

const router = express()

router.post("/createInitialScooping",jwtVerify,CreateInitialScooping )
router.post("/getPrevScoop",jwtVerify,getprevScoop )
router.delete('/deleteScoopingByLotNo/:id', jwtVerify, deleteSccopingByLot)
router.get("/sumofallscoop", jwtVerify, sumOfAllScoop)
router.get("/getUnscoopedEntry/:status", jwtVerify, getscoopLot)
router.get("/getScoopByLot/:lotNO", jwtVerify, getscoopByLot)
router.put("/createScooping/:id", jwtVerify, scoopingMiddleware,createscoopingReport)
router.post("/createScoopingall", jwtVerify, createscoopingAllReport)
router.post("/searchScooping", jwtVerify, SearchScooping)
router.post("/getScoopByLotOrigin", jwtVerify, getscoopByLot)
router.post("/updatenextopening", jwtVerify, updateScoopingOpening)
router.post("/updateLotNo", jwtVerify, updateLotNo)
router.post("/createInitialBorma",jwtVerify,CreateInitialBorma )

export default router