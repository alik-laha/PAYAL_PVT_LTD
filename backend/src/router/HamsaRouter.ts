import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveBigTaiho, CreateMixBigTaiho, CreateReissueBigTaiho, EditRejectBigTaiho,
        SearchRCNBigTaiho, SearchRCNBigTaihoMix, 
       updateEntireBigTaiho} from "../controller/BigTaihoController/BigTaihoApi";
import { CreateEntireHamsa, EditRejectHamsa, findEditHamsaAll, getHamsaBylotorigin, getHamsaLot, SearchRCNHamsa, sumOfallHamsa } from "../controller/HamsaController/HamsaApi";
const router = express()

// //Hamsa.tsx
router.get("/getUnHamsaEntry/:status", jwtVerify, getHamsaLot)
router.get("/findEditHamsaAll", jwtVerify, findEditHamsaAll)
router.get("/sumofallHamsa", jwtVerify, sumOfallHamsa)

// //HamsaInitial.tsx
router.get("/getHamsaByLotOrigin/:lotNO/:origin", jwtVerify, getHamsaBylotorigin)

// //HamsaCreateForm.tsx
router.post("/createEntireHamsa", jwtVerify, CreateEntireHamsa)

// //BigTaihoReiSsueForm.tsx
router.post("/createReissueBigTaiho", jwtVerify, CreateReissueBigTaiho)

// //BigTaihotable.tsx
router.put('/hamsaprimarysearch', jwtVerify, SearchRCNHamsa);
router.post("/updateBigTaiho",jwtVerify, updateEntireBigTaiho)
router.delete('/rejectededitHamsa/:id/:LotNo/:origin', jwtVerify, EditRejectHamsa);
router.put("/approveeditHamsa/:id/:LotNo/:origin", jwtVerify, approveBigTaiho);

// //BigTaihoMix.tsx
router.post('/bigTaihomixsearch', jwtVerify, SearchRCNBigTaihoMix);
router.post('/createMixBigTaiho', jwtVerify, CreateMixBigTaiho);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router