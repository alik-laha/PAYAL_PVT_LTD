import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveBigTaiho, CreateEntireBigTaiho, CreateMixBigTaiho, CreateReissueBigTaiho, EditRejectBigTaiho, getBigTaihoBylotorigin,
        SearchRCNBigTaiho, SearchRCNBigTaihoMix, sumOfallBigTaiho, 
       updateEntireBigTaiho} from "../controller/BigTaihoController/BigTaihoApi";
import { findEditHamsaAll, getHamsaLot, sumOfallHamsa } from "../controller/HamsaController/HamsaApi";
const router = express()

// //Hamsa.tsx
router.get("/getUnHamsaEntry/:status", jwtVerify, getHamsaLot)
router.get("/findEditHamsaAll", jwtVerify, findEditHamsaAll)
router.get("/sumofallHamsa", jwtVerify, sumOfallHamsa)

// //BihTaihoInitial.tsx
router.get("/getBigTaihoByLotOrigin/:lotNO/:origin", jwtVerify, getBigTaihoBylotorigin)

// //BigTaihoCreateForm.tsx
router.post("/createEntireBigTaiho", jwtVerify, CreateEntireBigTaiho)

// //BigTaihoReiSsueForm.tsx
router.post("/createReissueBigTaiho", jwtVerify, CreateReissueBigTaiho)

// //BigTaihotable.tsx
router.put('/bigTaihoprimarysearch', jwtVerify, SearchRCNBigTaiho);
router.post("/updateBigTaiho",jwtVerify, updateEntireBigTaiho)
router.delete('/rejectededitBigTaiho/:id/:LotNo/:origin', jwtVerify, EditRejectBigTaiho);
router.put("/approveeditBigTaiho/:id/:LotNo/:origin", jwtVerify, approveBigTaiho);

// //BigTaihoMix.tsx
router.post('/bigTaihomixsearch', jwtVerify, SearchRCNBigTaihoMix);
router.post('/createMixBigTaiho', jwtVerify, CreateMixBigTaiho);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router