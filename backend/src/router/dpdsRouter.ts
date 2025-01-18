import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { approveMayur, CreateReissueMayur, EditRejectMayur, 
     SearchHistory, 
     SearchMixHistory, 
     updateEntireMayur } from "../controller/mayurController/mayurapi";
import { CreateEntireDPDS, CreateMixDPDS, CreateReissueDPDS, findEditDPDSAll, getDPDSBylotorigin, getDPDSLot, SearchRCNDPDS, SearchRCNDPDSMix, sumOfallDPDS } from "../controller/dpdsController/dpdsApi";
const router = express()

// //DPDS.tsx
router.get("/getUnDPDSEntry/:status", jwtVerify, getDPDSLot)
router.get("/findEditDPDSAll", jwtVerify, findEditDPDSAll)
router.get("/sumofallDPDS", jwtVerify, sumOfallDPDS)

// //DPDSInitial.tsx
router.get("/getDPDSByLotOrigin/:lotNO/:origin", jwtVerify, getDPDSBylotorigin)

// //DPDSCreateForm.tsx
router.post("/createEntireDPDS", jwtVerify, CreateEntireDPDS)

// //DPDSReiSsueForm.tsx
router.post("/createReissueDPDS", jwtVerify, CreateReissueDPDS)

// //DPDStable.tsx
router.put('/dpdsprimarysearch', jwtVerify, SearchRCNDPDS);
router.post("/updateMayur",jwtVerify, updateEntireMayur)
router.delete('/rejectededitMayur/:id', jwtVerify, EditRejectMayur);
router.put("/approveeditMayur/:id/:LotNo/:origin", jwtVerify, approveMayur);

// //DPDSMix.tsx
router.post('/dpdsmixsearch', jwtVerify, SearchRCNDPDSMix);
router.post('/createMixDPDS', jwtVerify, CreateMixDPDS);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router