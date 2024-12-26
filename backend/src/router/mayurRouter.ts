import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";


import EditRejectPeeling from "../controller/PeelingController/rejectPeeling";
import approvePeeling from "../controller/PeelingController/approvepeeling";
import updatePeeling from "../controller/PeelingController/updatePeeling";
import { CreateEntireMayur, findEditMayurAll, getMayurBylotorigin, getMayurLot, SearchRCNMayur, sumOfallMayur } from "../controller/mayurController/mayurapi";
const router = express()

router.get("/getUnMayurEntry/:status", jwtVerify, getMayurLot)
router.get("/findEditMayurAll", jwtVerify, findEditMayurAll)
router.get("/sumofallMayur", jwtVerify, sumOfallMayur)
router.get("/getMayurByLotOrigin/:lotNO/:origin", jwtVerify, getMayurBylotorigin)
router.post("/createEntireMayur", jwtVerify, CreateEntireMayur)
router.put('/mayurprimarysearch', jwtVerify, SearchRCNMayur);
router.post("/updatePeeling/:id",jwtVerify, updatePeeling)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitPeeling/:id', jwtVerify, EditRejectPeeling);
//Edit Approve Rcn Entry by Id
router.put("/approveeditPeeling/:id", jwtVerify, approvePeeling);


export default router