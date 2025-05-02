import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { approveEditRcvVillageIn, createEntireVLOT, deleteVillageInPrimary, editRcvVillageIn, getEditRcvVillageInPrimary, getRcvVillageInbyDate, getRcvVillageInbyGatePass, 
    getStatusVLOT, 
    getUnEntriedRcvVillageIn, getUnEntriedRcvVillageInVLOT, rejectVillageInPrimaryEdit, searchRcvVillageIn, searchVLOTDetails, sumofRcvVillageInPrimary, updateRcvVillageIn, updateRcvVillageInEntire } from '../controller/RcvVillageInController/RcvVillageInApi';

const router = express.Router();



 router.get("/getRcvVillageInByGatePass/:lotNO", jwtVerify, getRcvVillageInbyGatePass)
 router.get("/getRcvVillageInByDate/:lotNO", jwtVerify, getRcvVillageInbyDate)
 router.get("/getRcvVillageInNotEntried/:status", jwtVerify, getUnEntriedRcvVillageIn)
 router.put("/updateRcvVillageIn/:id",jwtVerify, updateRcvVillageIn)
 router.put("/updateRcvVillageInEntire/:id",jwtVerify, updateRcvVillageInEntire)

 router.post("/deleteVillageInPrimaryByID", jwtVerify, deleteVillageInPrimary)
 router.post("/getVillageInPrimary", jwtVerify,searchRcvVillageIn)
 router.post("/getVLOTDetails", jwtVerify,searchVLOTDetails)

 router.get("/getsumofRcvVillageIn",jwtVerify, sumofRcvVillageInPrimary)
 router.get("/getEditRcvVillageInPrimary",jwtVerify, getEditRcvVillageInPrimary)
router.post("/editVillageInPrimary/:id",jwtVerify, editRcvVillageIn)

  router.get('/acceptEditVillageInPrimary/:id', jwtVerify,approveEditRcvVillageIn)
  router.get("/rejectEditVillageInPrimary/:id",jwtVerify, rejectVillageInPrimaryEdit)

  router.get("/getRcvVillageInVLOT", jwtVerify, getUnEntriedRcvVillageInVLOT)
  router.post("/createEntireVLOT", jwtVerify,createEntireVLOT)
  router.post("/getStatusVLOT", jwtVerify,getStatusVLOT)


export default router;