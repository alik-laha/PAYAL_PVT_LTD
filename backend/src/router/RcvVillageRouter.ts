import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';








import editstorePrimary from '../controller/StorePrimaryController/editstorePrimary';
import acceptStoreEditPrimary from '../controller/StorePrimaryController/acceptStoreEditPrimary';
import rejectStorePrimaryEdit from '../controller/StorePrimaryController/rejectStoreEditPrimary';
import getRcvVillagebyGatePass from '../controller/RcvVIllageController/getRcVVillageByGatepass';
import getUnEntriedRcvVillage from '../controller/RcvVIllageController/getUnEntriedRcvVillage';
import updateRcvVillage from '../controller/RcvVIllageController/UpdateRcvVillage';
import updateRcvVillageEntire from '../controller/RcvVIllageController/updateRcvVillageEntire';
import deleteVillagePrimary from '../controller/RcvVIllageController/deleteRcvVillage';
import searchRcvVillage from '../controller/RcvVIllageController/SearchRcvVillage';
import sumofRcvVillagePrimary from '../controller/RcvVIllageController/SumofRcvVillage';
import getEditRcvVillagePrimary from '../controller/RcvVIllageController/getEditRcvVillage';

const router = express.Router();



router.get("/getRcvVillageByGatePass/:lotNO", jwtVerify, getRcvVillagebyGatePass)
router.get("/getRcvVillageNotEntried/:status", jwtVerify, getUnEntriedRcvVillage)
router.put("/updateRcvVillage/:id",jwtVerify, updateRcvVillage)

// router.post("/createStorePrimary",jwtVerify, createStorePrimary)
router.post("/deleteVillagePrimaryByID", jwtVerify, deleteVillagePrimary)
router.post("/getVillagePrimary", jwtVerify,searchRcvVillage)

router.get("/getsumofRcvVillage",jwtVerify, sumofRcvVillagePrimary)
router.get("/getEditRcvVillagePrimary",jwtVerify, getEditRcvVillagePrimary)
// router.post("/editStorePrimary/:id",jwtVerify, editstorePrimary)

// router.get('/acceptEditStorePrimary/:id', jwtVerify,acceptStoreEditPrimary)
// router.get("/rejectEditStorePrimary/:id",jwtVerify, rejectStorePrimaryEdit)



router.put("/updateRcvVillageEntire/:id",jwtVerify, updateRcvVillageEntire)
export default router;