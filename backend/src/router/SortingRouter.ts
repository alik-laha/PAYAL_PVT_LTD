import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveHamsa, EditRejectHamsa,  
        updateEntireHamsa } from "../controller/HamsaController/HamsaApi";
import { CreateEntireSorting, CreateMixSorting, CreateReissueSorting, findEditSortingAll, getSortingBylotorigin, 
       getSortingLot, SearchRCNSorting, SearchRCNSortingMix, sumOfallSorting } from "../controller/SortingController/SortingApi";
const router = express()

// //Sorting.tsx
router.get("/getUnSortingEntry/:status", jwtVerify, getSortingLot)
router.get("/findEditSortingAll", jwtVerify, findEditSortingAll)
router.get("/sumofallSorting", jwtVerify, sumOfallSorting)

// //SortingInitial.tsx
router.get("/getSortingByLotOrigin/:lotNO/:origin", jwtVerify, getSortingBylotorigin)

// //SortingCreateForm.tsx
router.post("/createEntireSorting", jwtVerify, CreateEntireSorting)

// //HamsaReiSsueForm.tsx
router.post("/createReissueSorting", jwtVerify, CreateReissueSorting)

// //Sortingtable.tsx
router.put('/sortingprimarysearch', jwtVerify, SearchRCNSorting);
router.post("/updateHamsa",jwtVerify, updateEntireHamsa)
router.delete('/rejectededitHamsa/:id/:LotNo/:origin', jwtVerify, EditRejectHamsa);
router.put("/approveeditHamsa/:id/:LotNo/:origin", jwtVerify, approveHamsa);

// //SortingMix.tsx
router.post('/sortingmixsearch', jwtVerify, SearchRCNSortingMix);
router.post('/createMixSorting', jwtVerify, CreateMixSorting);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router