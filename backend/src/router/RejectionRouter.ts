import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveRejection, CreateEntireRejection, CreateMixRejection, EditRejectRejection, findEditRejectionAll, 
      getRejectionBylotorigin, getRejectionLot, SearchRCNRejection, SearchRCNRejectionMix, sumOfallRejection, 
      updateEntireRejection} from "../controller/RejectionController/RejectionApi";


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

// // //Rejectiontable.tsx
router.put('/rejectionprimarysearch', jwtVerify, SearchRCNRejection);
router.post("/updateRejection", jwtVerify, updateEntireRejection)
router.delete('/rejectededitRejection/:id/:LotNo/:origin', jwtVerify, EditRejectRejection);
router.put("/approveeditRejection/:id/:LotNo/:origin", jwtVerify, approveRejection);

// // //RejectionMix.tsx
router.post('/rejectionmixsearch', jwtVerify, SearchRCNRejectionMix);
router.post('/createMixRejection', jwtVerify, CreateMixRejection);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router