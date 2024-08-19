import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';



import deleteStorePrimary from '../controller/StorePrimaryController/deleteStorePrimary';
import SearchStorePrimary from '../controller/StorePrimaryController/searchStorePrimary';
import sumofStorePrimary from '../controller/StorePrimaryController/sumofStorePrimary';
import getEditStorePrimary from '../controller/StorePrimaryController/getEditStorePrimary';
import editstorePrimary from '../controller/StorePrimaryController/editstorePrimary';
import acceptStoreEditPrimary from '../controller/StorePrimaryController/acceptStoreEditPrimary';
import rejectStorePrimaryEdit from '../controller/StorePrimaryController/rejectStoreEditPrimary';
import getUnEntriedGeneralPrimary from '../controller/generalStoreController/getGeneralNotEntried';
import getGeneralbyGatePass from '../controller/generalStoreController/getGeneralByGatePass';
import updateRcvGeneral from '../controller/generalStoreController/updateRcvGeneral';
import createGeneralPrimary from '../controller/generalStoreController/createGeneralPrimary';
import deleteGeneralPrimary from '../controller/generalStoreController/deleteGeneralPrimarybyID';

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

router.get('/acceptEditStorePrimary/:id', jwtVerify,acceptStoreEditPrimary)
router.get("/rejectEditStorePrimary/:id",jwtVerify, rejectStorePrimaryEdit)

export default router;