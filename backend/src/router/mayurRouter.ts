import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";






import CreateEntirePeel from "../controller/PeelingController/createEntirePeeling";
import sumOfallPeel from "../controller/PeelingController/sumOfallPeeling";
import findEditPeelingAll from "../controller/PeelingController/getEditPendingPeeling";
import SearchRCNPeeling from "../controller/PeelingController/peelingSearch";
import EditRejectPeeling from "../controller/PeelingController/rejectPeeling";
import approvePeeling from "../controller/PeelingController/approvepeeling";
import updatePeeling from "../controller/PeelingController/updatePeeling";
import { getMayurBylotorigin, getMayurLot } from "../controller/mayurController/mayurapi";
const router = express()

router.get("/getUnMayurEntry/:status", jwtVerify, getMayurLot)
router.get("/findEditPeelingAll", jwtVerify, findEditPeelingAll)
router.get("/sumofallpeel", jwtVerify, sumOfallPeel)
router.get("/getMayurByLotOrigin/:lotNO/:origin", jwtVerify, getMayurBylotorigin)
router.post("/createEntirePeeling", jwtVerify, CreateEntirePeel)
router.put('/peelingprimarysearch', jwtVerify, SearchRCNPeeling);
router.post("/updatePeeling/:id",jwtVerify, updatePeeling)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitPeeling/:id', jwtVerify, EditRejectPeeling);
//Edit Approve Rcn Entry by Id
router.put("/approveeditPeeling/:id", jwtVerify, approvePeeling);


export default router