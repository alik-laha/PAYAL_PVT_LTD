import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import updateHumid from "../controller/HumidController/updateHumid";


import getPeelingLot from "../controller/PeelingController/getUnpeeledEntry";
import getPeelingBylot from "../controller/PeelingController/getPeeledByLot";
import CreateEntirePeel from "../controller/PeelingController/createEntirePeeling";
import sumOfallPeel from "../controller/PeelingController/sumOfallPeeling";
import findEditPeelingAll from "../controller/PeelingController/getEditPendingPeeling";
import SearchRCNPeeling from "../controller/PeelingController/peelingSearch";
import EditRejectPeeling from "../controller/PeelingController/rejectPeeling";
import approvePeeling from "../controller/PeelingController/approvepeeling";
const router = express()

router.get("/getUnPeelingEntry/:status", jwtVerify, getPeelingLot)
router.get("/findEditPeelingAll", jwtVerify, findEditPeelingAll)
router.get("/sumofallpeel", jwtVerify, sumOfallPeel)
router.get("/getPeelingByLot/:lotNO", jwtVerify, getPeelingBylot)
router.post("/createEntirePeeling", jwtVerify, CreateEntirePeel)
router.put('/peelingprimarysearch', jwtVerify, SearchRCNPeeling);
router.post("/updateHumid/:id",jwtVerify, updateHumid)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitPeeling/:id', jwtVerify, EditRejectPeeling);
//Edit Approve Rcn Entry by Id
router.put("/approveeditPeeling/:id", jwtVerify, approvePeeling);


export default router