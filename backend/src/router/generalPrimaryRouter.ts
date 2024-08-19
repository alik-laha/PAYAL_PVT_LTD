import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';




import SearchStorePrimary from '../controller/StorePrimaryController/searchStorePrimary';
import sumofStorePrimary from '../controller/StorePrimaryController/sumofStorePrimary';
import getEditStorePrimary from '../controller/StorePrimaryController/getEditStorePrimary';
import editstorePrimary from '../controller/StorePrimaryController/editstorePrimary';

import rejectStorePrimaryEdit from '../controller/StorePrimaryController/rejectStoreEditPrimary';
import getUnEntriedGeneralPrimary from '../controller/generalStoreController/getGeneralNotEntried';
import getGeneralbyGatePass from '../controller/generalStoreController/getGeneralByGatePass';
import updateRcvGeneral from '../controller/generalStoreController/updateRcvGeneral';
import createGeneralPrimary from '../controller/generalStoreController/createGeneralPrimary';
import deleteGeneralPrimary from '../controller/generalStoreController/deleteGeneralPrimarybyID';
import acceptGeneralEditPrimary from '../controller/generalStoreController/acceptGeneralEditPrimary';
import rejectGeneralPrimaryEdit from '../controller/generalStoreController/rejectGeneralEditPrimary';

const router = express.Router();

router.get("/getgeneralNotEntried/:status", jwtVerify, getUnEntriedGeneralPrimary)
router.get("/getGeneralByGatePass/:lotNO", jwtVerify, getGeneralbyGatePass)
router.put("/updateRcvGeneral/:id",jwtVerify, updateRcvGeneral)
router.post("/createGeneralPrimary",jwtVerify, createGeneralPrimary)
router.post("/deleteGeneralPrimaryByID", jwtVerify, deleteGeneralPrimary)

router.post("/getStorePrimary", jwtVerify,SearchStorePrimary)
router.get("/getsumofPM",jwtVerify, sumofStorePrimary)
router.get("/getEditStorePrimary",jwtVerify, getEditStorePrimary)

router.post("/editStorePrimary/:id",jwtVerify, editstorePrimary)
router.get('/acceptEditGeneralPrimary/:id', jwtVerify,acceptGeneralEditPrimary)
router.get("/rejectEditGeneralPrimary/:id",jwtVerify, rejectGeneralPrimaryEdit)

export default router;