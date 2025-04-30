import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";

import { approveLW, CreateEntireLW, EditRejectLW, findEditLWAll, getLWBylotorigin, 
       getLWLot,  SearchRCNLW,  sumOfallLW,
       updateEntireLW, SearchRCNLWMix,CreateMixLW,
       CreateReissueLW
       } from "../controller/LWController/LWApi";
const router = express()

// //LW.tsx
router.get("/getUnLWEntry/:status", jwtVerify, getLWLot)
router.get("/findEditLWAll", jwtVerify, findEditLWAll)
router.get("/sumofallLW", jwtVerify, sumOfallLW)

// //LWInitial.tsx
router.get("/getLWByLotOrigin/:lotNO/:origin", jwtVerify, getLWBylotorigin)

// //LWCreateForm.tsx
 router.post("/createEntireLW", jwtVerify, CreateEntireLW)

// // //HamsaReiSsueForm.tsx
router.post("/createReissueLW", jwtVerify, CreateReissueLW)

// // //LWtable.tsx
 router.put('/lwprimarysearch', jwtVerify, SearchRCNLW);
router.post("/updateLW", jwtVerify, updateEntireLW)
 router.delete('/rejectededitLW/:id/:LotNo/:origin', jwtVerify, EditRejectLW);
router.put("/approveeditLW/:id/:LotNo/:origin", jwtVerify, approveLW);

// // //LWMix.tsx
 router.post('/lwmixsearch', jwtVerify, SearchRCNLWMix);
router.post('/createMixLW', jwtVerify, CreateMixLW);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router