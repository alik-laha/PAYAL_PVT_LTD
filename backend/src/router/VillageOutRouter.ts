import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";

import { 
     SearchHistory, 
     SearchMixHistory
      } from "../controller/mayurController/mayurapi";

import { approveVillage, CreateEntireVillage, CreateMixVillage, CreateReissueVillage, EditRejectVillage,
       findEditVillageAll, GatedataFind, getVillageBylotorigin, getVillageLot, linkGatePass, SearchRCNVillage, SearchRCNVillageMix, sumOfallVillage, updateEntireVIllage } from "../controller/Village Controller/VillageApi";


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
 router.post("/createReissueVillage", jwtVerify, CreateReissueVillage)

// // //Villagetable.tsx
router.put('/villageprimarysearch', jwtVerify, SearchRCNVillage);
router.post("/findAllGatePass", jwtVerify, GatedataFind)
router.post("/linkGatePass", jwtVerify, linkGatePass)
router.post("/updateVillage", jwtVerify, updateEntireVIllage)
router.delete('/rejectededitVillage/:id/:LotNo/:origin', jwtVerify, EditRejectVillage);
router.put("/approveeditVillage/:id/:LotNo/:origin", jwtVerify, approveVillage);

// // //LWMix.tsx
 router.post('/villagemixsearch', jwtVerify, SearchRCNVillageMix);
 router.post('/createMixVillage', jwtVerify, CreateMixVillage);

//HistoryTable.tsx
router.put('/historySearch', jwtVerify, SearchHistory);
router.put('/historymixSearch', jwtVerify, SearchMixHistory);

export default router