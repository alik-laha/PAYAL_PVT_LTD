import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveHamsa, CreateReissueHamsa, EditRejectHamsa, 
          } from "../controller/HamsaController/HamsaApi";
import { CreateEntireWholes, CreateMixWholes, findEditWholesAll, getWholesBylotorigin, getWholesLot, SearchRCNWholes, SearchRCNWholesMix, sumOfallWholes, updateEntireWholes } from "../controller/WholesController/WholesApi";
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
router.post("/createReissueHamsa", jwtVerify, CreateReissueHamsa)

// //Wholestable.tsx
router.put('/wholesprimarysearch', jwtVerify, SearchRCNWholes);
router.post("/updateWholes",jwtVerify, updateEntireWholes)
router.delete('/rejectededitWholes/:id/:LotNo/:origin', jwtVerify, EditRejectHamsa);
router.put("/approveeditWholes/:id/:LotNo/:origin", jwtVerify, approveHamsa);

// //WholesMix.tsx
router.post('/wholesmixsearch', jwtVerify, SearchRCNWholesMix);
router.post('/createMixWholes', jwtVerify, CreateMixWholes);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router