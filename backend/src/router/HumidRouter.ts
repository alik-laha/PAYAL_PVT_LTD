import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";




import sumOfallHumid from "../controller/HumidController/sumOfallHumid";
import findEditHumidAll from "../controller/HumidController/getHumidAll";
import getHumidLot from "../controller/HumidController/getHumidLot";
import getHumidBylot from "../controller/HumidController/getHumidByLot";
import CreateEntireHumid from "../controller/HumidController/createEntireHumid";
import SearchRCNHumid from "../controller/HumidController/searchHumid";
import updateHumid from "../controller/HumidController/updateHumid";
import approveHumid from "../controller/HumidController/approveEditHumid";
import EditRejectHumid from "../controller/HumidController/RejectEditHumid";
const router = express()

router.get("/getUnHumidEntry/:status", jwtVerify, getHumidLot)
router.get("/findEditHumidAll", jwtVerify, findEditHumidAll)
router.get("/sumofallhumid", jwtVerify, sumOfallHumid)
router.get("/getHumidByLot/:lotNO", jwtVerify, getHumidBylot)
router.post("/createEntireHumid", jwtVerify, CreateEntireHumid)
router.put('/humidprimarysearch', jwtVerify, SearchRCNHumid);
router.post("/updateHumid/:id",jwtVerify, updateHumid)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitHumid/:id', jwtVerify, EditRejectHumid);
//Edit Approve Rcn Entry by Id
router.put("/approveeditHumid/:id", jwtVerify, approveHumid);


export default router