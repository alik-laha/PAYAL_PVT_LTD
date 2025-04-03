import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveRejection, CreateEntireRejection, EditRejectRejection, findEditRejectionAll, 
      getRejectionBylotorigin, getRejectionLot, SearchRCNRejection, sumOfallRejection, 
      updateEntireRejection} from "../controller/RejectionController/RejectionApi";
import { findEditVillageAll, getVillageLot, sumOfallVillage } from "../controller/Village Controller/VillageApi";


const router = express()

// //Rejection.tsx
router.get("/getUnVillageEntry/:status", jwtVerify, getVillageLot)
router.get("/findEditVillageAll", jwtVerify, findEditVillageAll)
router.get("/sumofallVillage", jwtVerify, sumOfallVillage)

// //LWInitial.tsx
router.get("/getRejectionByLotOrigin/:lotNO/:origin", jwtVerify, getRejectionBylotorigin)

// //RejectionCreateForm.tsx
router.post("/createEntireRejection", jwtVerify, CreateEntireRejection)

// // //HamsaReiSsueForm.tsx
// router.post("/createReissueLW", jwtVerify, CreateReissueLW)

// // //Rejectiontable.tsx
router.put('/rejectionprimarysearch', jwtVerify, SearchRCNRejection);
router.post("/updateRejection", jwtVerify, updateEntireRejection)
router.delete('/rejectededitRejection/:id/:LotNo/:origin', jwtVerify, EditRejectRejection);
router.put("/approveeditRejection/:id/:LotNo/:origin", jwtVerify, approveRejection);

// // //LWMix.tsx
// router.post('/lwmixsearch', jwtVerify, SearchRCNLWMix);
// router.post('/createMixLW', jwtVerify, CreateMixLW);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router