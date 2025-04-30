import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveWholes, CreateEntireWholes, CreateMixWholes, CreateReissueWholes, EditRejectWholes, findEditWholesAll, getWholesBylotorigin, getWholesLot, SearchRCNWholes, SearchRCNWholesMix, sumOfallWholes, updateEntireWholes } from "../controller/WholesController/WholesApi";
const router = express()

// //Wholes.tsx
router.get("/getUnWholesEntry/:status", jwtVerify, getWholesLot)
router.get("/findEditWholesAll", jwtVerify, findEditWholesAll)
router.get("/sumofallWholes", jwtVerify, sumOfallWholes)

// //WholesInitial.tsx
router.get("/getWholesByLotOrigin/:lotNO/:origin", jwtVerify, getWholesBylotorigin)

// //WholesCreateForm.tsx
router.post("/createEntireWholes", jwtVerify, CreateEntireWholes)

// //HamsaReiSsueForm.tsx
router.post("/createReissueWholes", jwtVerify, CreateReissueWholes)

// //Wholestable.tsx
router.put('/wholesprimarysearch', jwtVerify, SearchRCNWholes);
router.post("/updateWholes",jwtVerify, updateEntireWholes)
router.delete('/rejectededitWholes/:id/:LotNo/:origin', jwtVerify, EditRejectWholes);
router.put("/approveeditWholes/:id/:LotNo/:origin", jwtVerify, approveWholes);

// //WholesMix.tsx
router.post('/wholesmixsearch', jwtVerify, SearchRCNWholesMix);
router.post('/createMixWholes', jwtVerify, CreateMixWholes);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router