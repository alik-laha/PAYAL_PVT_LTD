import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { approveMayur, CreateEntireMayur, CreateMix, CreateReissueMayur, EditRejectMayur, findEditMayurAll, 
    getMayurBylotorigin, getMayurBylotoriginMix, getMayurLot, SearchHistory, SearchMixHistory, SearchRCNMayur, SearchRCNMayurMix, sumOfallMayur, updateEntireMayur } from "../controller/mayurController/mayurapi";
const router = express()

router.get("/getUnMayurEntry/:status", jwtVerify, getMayurLot)
router.get("/findEditMayurAll", jwtVerify, findEditMayurAll)
router.get("/sumofallMayur", jwtVerify, sumOfallMayur)
router.get("/getMayurByLotOrigin/:lotNO/:origin", jwtVerify, getMayurBylotorigin)
router.get("/getMayurByLotOriginMix/:lotNO/:origin", jwtVerify, getMayurBylotoriginMix)
router.post("/createEntireMayur", jwtVerify, CreateEntireMayur)
router.post("/createReissueMayur", jwtVerify, CreateReissueMayur)
router.put('/mayurprimarysearch', jwtVerify, SearchRCNMayur);
router.post("/updateMayur",jwtVerify, updateEntireMayur)
// //Edit Reject Rcn Entry by Id
router.delete('/rejectededitMayur/:id/:LotNo/:origin', jwtVerify, EditRejectMayur);
//Edit Approve Rcn Entry by Id
router.put("/approveeditMayur/:id/:LotNo/:origin", jwtVerify, approveMayur);

router.post('/mayurmixsearch', jwtVerify, SearchRCNMayurMix);
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);
router.post('/createMixMayur', jwtVerify, CreateMix);


export default router