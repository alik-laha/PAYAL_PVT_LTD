import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { approveMayur, CreateEntireMayur, CreateReissueMayur, EditRejectMayur, findEditMayurAll, 
    getMayurBylotorigin, getMayurLot, SearchHistory, SearchMixHistory, SearchRCNMayur, SearchRCNMayurMix, sumOfallMayur, updateEntireMayur } from "../controller/mayurController/mayurapi";
import { findEditDPDSAll, getDPDSLot, sumOfallDPDS } from "../controller/dpdsController/dpdsApi";
const router = express()
router.get("/getUnDPDSEntry/:status", jwtVerify, getDPDSLot)
router.get("/findEditDPDSAll", jwtVerify, findEditDPDSAll)
router.get("/sumofallDPDS", jwtVerify, sumOfallDPDS)

router.get("/getMayurByLotOrigin/:lotNO/:origin", jwtVerify, getMayurBylotorigin)
router.post("/createEntireMayur", jwtVerify, CreateEntireMayur)
router.post("/createReissueMayur", jwtVerify, CreateReissueMayur)
router.put('/mayurprimarysearch', jwtVerify, SearchRCNMayur);
router.post("/updateMayur",jwtVerify, updateEntireMayur)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitMayur/:id', jwtVerify, EditRejectMayur);
//Edit Approve Rcn Entry by Id
router.put("/approveeditMayur/:id/:LotNo/:origin", jwtVerify, approveMayur);

router.post('/mayurmixsearch', jwtVerify, SearchRCNMayurMix);
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);


export default router