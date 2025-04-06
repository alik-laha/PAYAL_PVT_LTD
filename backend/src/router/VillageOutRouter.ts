import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";
import { approveRejection, EditRejectRejection, 
      updateEntireRejection} from "../controller/RejectionController/RejectionApi";
import { CreateEntireVillage, findEditVillageAll, GatedataFind, getVillageBylotorigin, getVillageLot, linkGatePass, SearchRCNVillage, sumOfallVillage } from "../controller/Village Controller/VillageApi";


const router = express()

// //Village.tsx
router.get("/getUnVillageEntry/:status", jwtVerify, getVillageLot)
router.get("/findEditVillageAll", jwtVerify, findEditVillageAll)
router.get("/sumofallVillage", jwtVerify, sumOfallVillage)

// //VillageInitial.tsx
router.get("/getVillageByLotOrigin/:lotNO/:origin", jwtVerify, getVillageBylotorigin)

// //VIllageCreateForm.tsx
router.post("/createEntireVillage", jwtVerify, CreateEntireVillage)

// // //HamsaReiSsueForm.tsx
// router.post("/createReissueLW", jwtVerify, CreateReissueLW)

// // //Villagetable.tsx
router.put('/villageprimarysearch', jwtVerify, SearchRCNVillage);
router.post("/findAllGatePass", jwtVerify, GatedataFind)
router.post("/linkGatePass", jwtVerify, linkGatePass)
router.post("/updateRejection", jwtVerify, updateEntireRejection)
router.delete('/rejectededitRejection/:id/:LotNo/:origin', jwtVerify, EditRejectRejection);
router.put("/approveeditRejection/:id/:LotNo/:origin", jwtVerify, approveRejection);

// // //LWMix.tsx
// router.post('/lwmixsearch', jwtVerify, SearchRCNLWMix);
// router.post('/createMixLW', jwtVerify, CreateMixLW);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router