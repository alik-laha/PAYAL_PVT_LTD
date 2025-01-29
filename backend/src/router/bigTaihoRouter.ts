import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";



import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveDPDS, CreateMixDPDS, CreateReissueDPDS, EditRejectDPDS, SearchRCNDPDSMix,  updateEntireDPDS } from "../controller/dpdsController/dpdsApi";
import { CreateEntireBigTaiho, findEditBigTaihoSAll, getBigTaihoBylotorigin,
       getBigTaihoLot, SearchRCNBigTaiho, sumOfallBigTaiho } from "../controller/BigTaihoController/BigTaihoApi";
const router = express()

// //BigTaiho.tsx
router.get("/getUnBigTaihoEntry/:status", jwtVerify, getBigTaihoLot)
router.get("/findEditBigTaihoAll", jwtVerify, findEditBigTaihoSAll)
router.get("/sumofallBigTaiho", jwtVerify, sumOfallBigTaiho)

// //BihTaihoInitial.tsx
router.get("/getBigTaihoByLotOrigin/:lotNO/:origin", jwtVerify, getBigTaihoBylotorigin)

// //BigTaihoCreateForm.tsx
router.post("/createEntireBigTaiho", jwtVerify, CreateEntireBigTaiho)

// //DPDSReiSsueForm.tsx
router.post("/createReissueDPDS", jwtVerify, CreateReissueDPDS)

// //BigTaihotable.tsx
router.put('/bigTaihoprimarysearch', jwtVerify, SearchRCNBigTaiho);
router.post("/updateDPDS",jwtVerify, updateEntireDPDS)
router.delete('/rejectededitDPDS/:id/:LotNo/:origin', jwtVerify, EditRejectDPDS);
router.put("/approveeditDPDS/:id/:LotNo/:origin", jwtVerify, approveDPDS);

// //DPDSMix.tsx
router.post('/dpdsmixsearch', jwtVerify, SearchRCNDPDSMix);
router.post('/createMixDPDS', jwtVerify, CreateMixDPDS);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router