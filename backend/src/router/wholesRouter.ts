import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveHamsa, CreateMixHamsa, CreateReissueHamsa, EditRejectHamsa, 
       SearchRCNHamsa, SearchRCNHamsaMix, updateEntireHamsa } from "../controller/HamsaController/HamsaApi";
import { CreateEntireWholes, findEditWholesAll, getWholesBylotorigin, getWholesLot, sumOfallWholes } from "../controller/WholesController/WholesApi";
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