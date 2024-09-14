import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import getBormaLot from "../controller/BormaController/getBormaLot";
import findEditBormaAll from "../controller/BormaController/findEditBormaAll";
import sumOfallBorma from "../controller/BormaController/sumofallBorma";
import getBormaBylot from "../controller/BormaController/getBormaByLot";

import CreateEntireBorma from "../controller/BormaController/createBormaEntire";
import SearchRCNBorma from "../controller/BormaController/serachBorma";
import updateBorma from "../controller/BormaController/updateBorma";
const router = express()

router.get("/getUnBormaEntry/:status", jwtVerify, getBormaLot)
router.get("/findEditBormaAll", jwtVerify, findEditBormaAll)
router.get("/sumofallborma", jwtVerify, sumOfallBorma)
router.get("/getBormaByLot/:lotNO", jwtVerify, getBormaBylot)
router.post("/createEntireBorma", jwtVerify, CreateEntireBorma)
router.put('/bormaprimarysearch', jwtVerify, SearchRCNBorma);
router.post("/updateBorma/:id",jwtVerify, updateBorma)
// //Edit Reject Rcn Entry by Id
// router.delete('/rejectededitBorma/:id', jwtVerify, EditRejectAlmond);
// //Edit Approve Rcn Entry by Id
// router.put("/approveeditBorma/:id", jwtVerify, approveAlmond);


export default router