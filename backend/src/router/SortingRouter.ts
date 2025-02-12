import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveHamsa, CreateEntireHamsa, CreateMixHamsa, CreateReissueHamsa, EditRejectHamsa,  
       SearchRCNHamsa, SearchRCNHamsaMix, updateEntireHamsa } from "../controller/HamsaController/HamsaApi";
import { findEditSortingAll, getSortingBylotorigin, getSortingLot, sumOfallSorting } from "../controller/SortingController/SortingApi";
const router = express()

// //Sorting.tsx
router.get("/getUnSortingEntry/:status", jwtVerify, getSortingLot)
router.get("/findEditSortingAll", jwtVerify, findEditSortingAll)
router.get("/sumofallSorting", jwtVerify, sumOfallSorting)

// //HamsaInitial.tsx
router.get("/getSortingByLotOrigin/:lotNO/:origin", jwtVerify, getSortingBylotorigin)

// //HamsaCreateForm.tsx
router.post("/createEntireHamsa", jwtVerify, CreateEntireHamsa)

// //HamsaReiSsueForm.tsx
router.post("/createReissueHamsa", jwtVerify, CreateReissueHamsa)

// //Hamsatable.tsx
router.put('/hamsaprimarysearch', jwtVerify, SearchRCNHamsa);
router.post("/updateHamsa",jwtVerify, updateEntireHamsa)
router.delete('/rejectededitHamsa/:id/:LotNo/:origin', jwtVerify, EditRejectHamsa);
router.put("/approveeditHamsa/:id/:LotNo/:origin", jwtVerify, approveHamsa);

// //HamsaMix.tsx
router.post('/hamsamixsearch', jwtVerify, SearchRCNHamsaMix);
router.post('/createMixHamsa', jwtVerify, CreateMixHamsa);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router