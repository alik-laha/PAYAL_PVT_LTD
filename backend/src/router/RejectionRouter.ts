import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { CreateEntireRejection, findEditRejectionAll, 
      getRejectionBylotorigin, getRejectionLot, SearchRCNRejection, sumOfallRejection } from "../controller/RejectionController/RejectionApi";


const router = express()

// //Rejection.tsx
router.get("/getUnRejectionEntry/:status", jwtVerify, getRejectionLot)
router.get("/findEditRejectionAll", jwtVerify, findEditRejectionAll)
router.get("/sumofallRejection", jwtVerify, sumOfallRejection)

// //LWInitial.tsx
router.get("/getRejectionByLotOrigin/:lotNO/:origin", jwtVerify, getRejectionBylotorigin)

// //RejectionCreateForm.tsx
router.post("/createEntireRejection", jwtVerify, CreateEntireRejection)

// // //HamsaReiSsueForm.tsx
// router.post("/createReissueLW", jwtVerify, CreateReissueLW)

// // //LWtable.tsx
router.put('/rejectionprimarysearch', jwtVerify, SearchRCNRejection);
// router.post("/updateLW", jwtVerify, updateEntireLW)
// router.delete('/rejectededitLW/:id/:LotNo/:origin', jwtVerify, EditRejectLW);
// router.put("/approveeditLW/:id/:LotNo/:origin", jwtVerify, approveLW);

// // //LWMix.tsx
// router.post('/lwmixsearch', jwtVerify, SearchRCNLWMix);
// router.post('/createMixLW', jwtVerify, CreateMixLW);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router