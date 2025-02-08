import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { CreateMixBigTaiho, updateEntireBigTaiho} from "../controller/BigTaihoController/BigTaihoApi";
import { approveHamsa, CreateEntireHamsa, CreateMixHamsa, CreateReissueHamsa, EditRejectHamsa, findEditHamsaAll, getHamsaBylotorigin, getHamsaLot, SearchRCNHamsa, SearchRCNHamsaMix, sumOfallHamsa } from "../controller/HamsaController/HamsaApi";
const router = express()

// //Hamsa.tsx
router.get("/getUnHamsaEntry/:status", jwtVerify, getHamsaLot)
router.get("/findEditHamsaAll", jwtVerify, findEditHamsaAll)
router.get("/sumofallHamsa", jwtVerify, sumOfallHamsa)

// //HamsaInitial.tsx
router.get("/getHamsaByLotOrigin/:lotNO/:origin", jwtVerify, getHamsaBylotorigin)

// //HamsaCreateForm.tsx
router.post("/createEntireHamsa", jwtVerify, CreateEntireHamsa)

// //HamsaReiSsueForm.tsx
router.post("/createReissueHamsa", jwtVerify, CreateReissueHamsa)

// //Hamsatable.tsx
router.put('/hamsaprimarysearch', jwtVerify, SearchRCNHamsa);
router.post("/updateBigTaiho",jwtVerify, updateEntireBigTaiho)
router.delete('/rejectededitHamsa/:id/:LotNo/:origin', jwtVerify, EditRejectHamsa);
router.put("/approveeditHamsa/:id/:LotNo/:origin", jwtVerify, approveHamsa);

// //HamsaMix.tsx
router.post('/hamsamixsearch', jwtVerify, SearchRCNHamsaMix);
router.post('/createMixHamsa', jwtVerify, CreateMixHamsa);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router