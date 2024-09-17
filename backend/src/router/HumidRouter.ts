import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";


import SearchRCNBorma from "../controller/BormaController/serachBorma";
import updateBorma from "../controller/BormaController/updateBorma";
import sumOfallHumid from "../controller/HumidController/sumOfallHumid";
import findEditHumidAll from "../controller/HumidController/getHumidAll";
import getHumidLot from "../controller/HumidController/getHumidLot";
import getHumidBylot from "../controller/HumidController/getHumidByLot";
import CreateEntireHumid from "../controller/HumidController/createEntireHumid";
const router = express()

router.get("/getUnHumidEntry/:status", jwtVerify, getHumidLot)
router.get("/findEditHumidAll", jwtVerify, findEditHumidAll)
router.get("/sumofallhumid", jwtVerify, sumOfallHumid)
router.get("/getHumidByLot/:lotNO", jwtVerify, getHumidBylot)
router.post("/createEntireHumid", jwtVerify, CreateEntireHumid)
router.put('/bormaprimarysearch', jwtVerify, SearchRCNBorma);
router.post("/updateBorma/:id",jwtVerify, updateBorma)
// //Edit Reject Rcn Entry by Id
// router.delete('/rejectededitBorma/:id', jwtVerify, EditRejectAlmond);
// //Edit Approve Rcn Entry by Id
// router.put("/approveeditBorma/:id", jwtVerify, approveAlmond);


export default router