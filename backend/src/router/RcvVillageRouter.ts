import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';









 import acceptStoreEditPrimary from '../controller/StorePrimaryController/acceptStoreEditPrimary';

import getRcvVillagebyGatePass from '../controller/RcvVIllageController/getRcVVillageByGatepass';
import getUnEntriedRcvVillage from '../controller/RcvVIllageController/getUnEntriedRcvVillage';
import updateRcvVillage from '../controller/RcvVIllageController/UpdateRcvVillage';
import updateRcvVillageEntire from '../controller/RcvVIllageController/updateRcvVillageEntire';
import deleteVillagePrimary from '../controller/RcvVIllageController/deleteRcvVillage';
import searchRcvVillage from '../controller/RcvVIllageController/SearchRcvVillage';
import sumofRcvVillagePrimary from '../controller/RcvVIllageController/SumofRcvVillage';
import getEditRcvVillagePrimary from '../controller/RcvVIllageController/getEditRcvVillage';
import editRcvVillage from '../controller/RcvVIllageController/editRcvVillage';
import rejectVillagePrimaryEdit from '../controller/RcvVIllageController/rejectEditRcvVillage';
import approveEditRcvVillage from '../controller/RcvVIllageController/approveEditrcvVillage';

const router = express.Router();



router.get("/getRcvVillageByGatePass/:lotNO", jwtVerify, getRcvVillagebyGatePass)
router.get("/getRcvVillageNotEntried/:status", jwtVerify, getUnEntriedRcvVillage)
router.put("/updateRcvVillage/:id",jwtVerify, updateRcvVillage)

// router.post("/createStorePrimary",jwtVerify, createStorePrimary)
router.post("/deleteVillagePrimaryByID", jwtVerify, deleteVillagePrimary)
router.post("/getVillagePrimary", jwtVerify,searchRcvVillage)

router.get("/getsumofRcvVillage",jwtVerify, sumofRcvVillagePrimary)
router.get("/getEditRcvVillagePrimary",jwtVerify, getEditRcvVillagePrimary)
router.post("/editVillagePrimary/:id",jwtVerify, editRcvVillage)

 router.get('/acceptEditVillagePrimary/:id', jwtVerify,approveEditRcvVillage)
 router.get("/rejectEditVillagePrimary/:id",jwtVerify, rejectVillagePrimaryEdit)



router.put("/updateRcvVillageEntire/:id",jwtVerify, updateRcvVillageEntire)
export default router;