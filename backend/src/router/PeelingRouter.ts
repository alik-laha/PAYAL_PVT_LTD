import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import updateHumid from "../controller/HumidController/updateHumid";
import approveHumid from "../controller/HumidController/approveEditHumid";
import EditRejectHumid from "../controller/HumidController/RejectEditHumid";
import getPeelingLot from "../controller/PeelingController/getUnpeeledEntry";
import getPeelingBylot from "../controller/PeelingController/getPeeledByLot";
import CreateEntirePeel from "../controller/PeelingController/createEntirePeeling";
import sumOfallPeel from "../controller/PeelingController/sumOfallPeeling";
import findEditPeelingAll from "../controller/PeelingController/getEditPendingPeeling";
import SearchRCNPeeling from "../controller/PeelingController/peelingSearch";
const router = express()

router.get("/getUnPeelingEntry/:status", jwtVerify, getPeelingLot)
router.get("/findEditPeelingAll", jwtVerify, findEditPeelingAll)
router.get("/sumofallpeel", jwtVerify, sumOfallPeel)
router.get("/getPeelingByLot/:lotNO", jwtVerify, getPeelingBylot)
router.post("/createEntirePeeling", jwtVerify, CreateEntirePeel)
router.put('/peelingprimarysearch', jwtVerify, SearchRCNPeeling);
router.post("/updateHumid/:id",jwtVerify, updateHumid)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitHumid/:id', jwtVerify, EditRejectHumid);
//Edit Approve Rcn Entry by Id
router.put("/approveeditHumid/:id", jwtVerify, approveHumid);


export default router