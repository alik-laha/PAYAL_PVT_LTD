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
import deleteScoopingReport from "../controller/scoopingController/deleteScoopingReport";
import createscoopingEditReport from "../controller/scoopingController/createScoopingEditReport";
import deleteSccopingEditByLot from "../controller/scoopingController/deleteScoopingEditByLot";
import createscoopingAllEditReport from "../controller/scoopingController/createScoopingAllEditreport";

import findEditaScoopingAll from "../controller/scoopingController/findEditaScoopingAll";
import getEditscoopByLot from "../controller/scoopingController/getEditScoopByLot";
import getscoopByLotOrigin from "../controller/scoopingController/getScoopByLotOrigin";
import UpdateInitialBorma from "../controller/scoopingController/updateInitialBorma";
import createScoopingDeleteAll from "../controller/scoopingController/createScoopingDeleteAll";
import createscoopingEditDelete from "../controller/scoopingController/createScoopingEditDelete";
import updateScoopingStatus from "../controller/scoopingController/updateScoopingStatus";
import CreateEntireScooping from "../controller/scoopingController/createEntireScooping";
import CreateEntireScoopingEdit from "../controller/scoopingController/createEntireScoopingEdit";
import updateScoopingOpeningEntire from "../controller/scoopingController/updateScoopingNextOpeningEntire";
import checkNextOpening from "../controller/scoopingController/checkNextOpening";

const router = express()

router.post("/createInitialScooping", jwtVerify, CreateInitialScooping)
router.post("/getPrevScoop", jwtVerify, getprevScoop)
router.delete('/deleteScoopingByLotNo/:id', jwtVerify, deleteSccopingByLot)
router.get("/sumofallscoop", jwtVerify, sumOfAllScoop)
router.get("/getUnscoopedEntry/:status", jwtVerify, getscoopLot)
router.get("/getScoopByLot/:lotNO", jwtVerify, getscoopByLot)
router.put("/createScooping/:id", jwtVerify, scoopingMiddleware, createscoopingReport)
router.post("/createScoopingall", jwtVerify, createscoopingAllReport)
router.post("/searchScooping", jwtVerify, SearchScooping)
router.post("/getScoopByLotOrigin", jwtVerify, getscoopByLotOrigin)
router.post("/updatenextopening", jwtVerify, updateScoopingOpening)
router.post("/updateLotNo", jwtVerify, updateLotNo)
router.post("/createInitialBorma", jwtVerify, CreateInitialBorma)
router.post('/deleteScoopReportByLotNo', jwtVerify, deleteScoopingReport)
router.post('/deleteScoopEditReportByLotNo', jwtVerify, deleteSccopingEditByLot)
router.put("/createScoopingEdit/:id", jwtVerify, scoopingMiddleware, createscoopingEditReport)
router.post("/createScoopingallEdit", jwtVerify, createscoopingAllEditReport)

router.get("/findEditScoopingAll", jwtVerify, findEditaScoopingAll)
router.get("/getEditScoopByLot/:lotNO", jwtVerify, getEditscoopByLot)
router.put("/createScoopingEditDelete/:id", jwtVerify, createscoopingEditDelete)
router.post("/updateInitialBorma", jwtVerify, UpdateInitialBorma)
router.post("/createScoopingDeleteall", jwtVerify, createScoopingDeleteAll)
router.post("/updateStatus", jwtVerify, updateScoopingStatus)

router.post("/createEntireScooping", jwtVerify, CreateEntireScooping)
router.post("/createEntireScoopingEdit", jwtVerify, CreateEntireScoopingEdit)
router.post("/updatenextopeningEntire", jwtVerify, updateScoopingOpeningEntire)
router.post("/checkNextLot", jwtVerify, checkNextOpening)

export default router