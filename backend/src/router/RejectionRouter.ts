import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { findEditRejectionAll, getRejectionBylotorigin, getRejectionLot, sumOfallRejection } from "../controller/RejectionController/RejectionApi";


const router = express()

// //Rejection.tsx
router.get("/getUnRejectionEntry/:status", jwtVerify, getRejectionLot)
router.get("/findEditRejectionAll", jwtVerify, findEditRejectionAll)
router.get("/sumofallRejection", jwtVerify, sumOfallRejection)

// //LWInitial.tsx
router.get("/getRejectionByLotOrigin/:lotNO/:origin", jwtVerify, getRejectionBylotorigin)

// //LWCreateForm.tsx
// router.post("/createEntireLW", jwtVerify, CreateEntireLW)

// // //HamsaReiSsueForm.tsx
// router.post("/createReissueLW", jwtVerify, CreateReissueLW)

// // //LWtable.tsx
// router.put('/lwprimarysearch', jwtVerify, SearchRCNLW);
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