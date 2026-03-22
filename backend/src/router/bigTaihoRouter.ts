import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveBigTaiho, CreateEntireBigTaiho, CreateMixBigTaiho, CreateReissueBigTaiho, EditRejectBigTaiho, findEditBigTaihoSAll, getBigTaihoBylotorigin,
       getBigTaihoLot, getDummyLot, SearchRCNBigTaiho, SearchRCNBigTaihoMix, sumOfallBigTaiho, 
       updateDummyLot, 
       updateEntireBigTaiho} from "../controller/BigTaihoController/BigTaihoApi";
const router = express()

// //BigTaiho.tsx
router.get("/getUnBigTaihoEntry/:status", jwtVerify, getBigTaihoLot)
router.get("/findEditBigTaihoAll", jwtVerify, findEditBigTaihoSAll)
router.get("/sumofallBigTaiho", jwtVerify, sumOfallBigTaiho)

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
router.get('/dummy-lot-data', jwtVerify, getDummyLot);
router.put('/update-dummy-lot', jwtVerify, updateDummyLot);

export default router