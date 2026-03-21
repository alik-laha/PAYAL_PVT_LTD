import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";

import { approveSorting, CreateEntireSorting, CreateMixSorting, CreateReissueSorting, EditRejectSorting, findEditSortingAll, getDummyLot, getSortingBylotorigin, 
       getSortingLot, SearchRCNSorting, SearchRCNSortingMix, sumOfallSorting, 
       updateDummyLot, 
       updateEntireSorting} from "../controller/SortingController/SortingApi";
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
router.post("/updateSorting",jwtVerify, updateEntireSorting)
router.delete('/rejectededitSorting/:id/:LotNo/:origin', jwtVerify, EditRejectSorting);
router.put("/approveeditSorting/:id/:LotNo/:origin", jwtVerify, approveSorting);

// //SortingMix.tsx
router.post('/sortingmixsearch', jwtVerify, SearchRCNSortingMix);
router.post('/createMixSorting', jwtVerify, CreateMixSorting);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

router.get('/dummy-lot-data', jwtVerify, getDummyLot);
router.put('/update-dummy-lot', jwtVerify, updateDummyLot);

export default router