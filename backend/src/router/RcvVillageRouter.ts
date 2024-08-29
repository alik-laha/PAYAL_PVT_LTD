import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';


import updateRcvStore from '../controller/StorePrimaryController/updateRcvStore';
import createStorePrimary from '../controller/StorePrimaryController/createStorePrimary';
import deleteStorePrimary from '../controller/StorePrimaryController/deleteStorePrimary';
import SearchStorePrimary from '../controller/StorePrimaryController/searchStorePrimary';
import sumofStorePrimary from '../controller/StorePrimaryController/sumofStorePrimary';
import getEditStorePrimary from '../controller/StorePrimaryController/getEditStorePrimary';
import editstorePrimary from '../controller/StorePrimaryController/editstorePrimary';
import acceptStoreEditPrimary from '../controller/StorePrimaryController/acceptStoreEditPrimary';
import rejectStorePrimaryEdit from '../controller/StorePrimaryController/rejectStoreEditPrimary';
import getRcvVillagebyGatePass from '../controller/RcvVIllageController/getRcVVillageByGatepass';
import getUnEntriedRcvVillage from '../controller/RcvVIllageController/getUnEntriedRcvVillage';
import updateRcvVillage from '../controller/RcvVIllageController/UpdateRcvVillage';

const router = express.Router();



router.get("/getRcvVillageByGatePass/:lotNO", jwtVerify, getRcvVillagebyGatePass)
router.get("/getRcvVillageNotEntried/:status", jwtVerify, getUnEntriedRcvVillage)
router.put("/updateRcvVillage/:id",jwtVerify, updateRcvVillage)

// router.post("/createStorePrimary",jwtVerify, createStorePrimary)
// router.post("/deleteStorePrimaryByID", jwtVerify, deleteStorePrimary)
// router.post("/getStorePrimary", jwtVerify,SearchStorePrimary)

// router.get("/getsumofStore",jwtVerify, sumofStorePrimary)
// router.get("/getEditStorePrimary",jwtVerify, getEditStorePrimary)
// router.post("/editStorePrimary/:id",jwtVerify, editstorePrimary)

// router.get('/acceptEditStorePrimary/:id', jwtVerify,acceptStoreEditPrimary)
// router.get("/rejectEditStorePrimary/:id",jwtVerify, rejectStorePrimaryEdit)

export default router;