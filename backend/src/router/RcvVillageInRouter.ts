import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';








import editRcvVillage from '../controller/RcvVIllageController/editRcvVillage';
import rejectVillagePrimaryEdit from '../controller/RcvVIllageController/rejectEditRcvVillage';
import approveEditRcvVillage from '../controller/RcvVIllageController/approveEditrcvVillage';
import { deleteVillageInPrimary, getEditRcvVillageInPrimary, getRcvVillageInbyGatePass, 
    getUnEntriedRcvVillageIn, searchRcvVillageIn, sumofRcvVillageInPrimary, updateRcvVillageIn, updateRcvVillageInEntire } from '../controller/RcvVillageInController/RcvVillageInApi';

const router = express.Router();



 router.get("/getRcvVillageInByGatePass/:lotNO", jwtVerify, getRcvVillageInbyGatePass)
 router.get("/getRcvVillageInNotEntried/:status", jwtVerify, getUnEntriedRcvVillageIn)
 router.put("/updateRcvVillageIn/:id",jwtVerify, updateRcvVillageIn)
 router.put("/updateRcvVillageInEntire/:id",jwtVerify, updateRcvVillageInEntire)

 router.post("/deleteVillageInPrimaryByID", jwtVerify, deleteVillageInPrimary)
 router.post("/getVillageInPrimary", jwtVerify,searchRcvVillageIn)

 router.get("/getsumofRcvVillageIn",jwtVerify, sumofRcvVillageInPrimary)
 router.get("/getEditRcvVillageInPrimary",jwtVerify, getEditRcvVillageInPrimary)
// router.post("/editVillagePrimary/:id",jwtVerify, editRcvVillage)

//  router.get('/acceptEditVillagePrimary/:id', jwtVerify,approveEditRcvVillage)
//  router.get("/rejectEditVillagePrimary/:id",jwtVerify, rejectVillagePrimaryEdit)




export default router;