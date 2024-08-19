import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';




import getUnEntriedGeneralPrimary from '../controller/generalStoreController/getGeneralNotEntried';
import getGeneralbyGatePass from '../controller/generalStoreController/getGeneralByGatePass';
import updateRcvGeneral from '../controller/generalStoreController/updateRcvGeneral';
import createGeneralPrimary from '../controller/generalStoreController/createGeneralPrimary';
import deleteGeneralPrimary from '../controller/generalStoreController/deleteGeneralPrimarybyID';
import acceptGeneralEditPrimary from '../controller/generalStoreController/acceptGeneralEditPrimary';
import rejectGeneralPrimaryEdit from '../controller/generalStoreController/rejectGeneralEditPrimary';
import SearchGeneralPrimary from '../controller/generalStoreController/getGeneralSearch';
import sumofGeneralPrimary from '../controller/generalStoreController/SumOfGeneralPrimary';
import getEditGeneralPrimary from '../controller/generalStoreController/getEditGeneralPrimary';
import editGeneralPrimary from '../controller/generalStoreController/editGeneralPrimary';

const router = express.Router();

router.get("/getgeneralNotEntried/:status", jwtVerify, getUnEntriedGeneralPrimary)
router.get("/getGeneralByGatePass/:lotNO", jwtVerify, getGeneralbyGatePass)
router.put("/updateRcvGeneral/:id",jwtVerify, updateRcvGeneral)
router.post("/createGeneralPrimary",jwtVerify, createGeneralPrimary)
router.post("/deleteGeneralPrimaryByID", jwtVerify, deleteGeneralPrimary)

router.post("/getGeneralPrimary", jwtVerify,SearchGeneralPrimary)
router.get("/getsumofGeneral",jwtVerify, sumofGeneralPrimary)
router.get("/getEditGeneralPrimary",jwtVerify, getEditGeneralPrimary)

router.post("/editGeneralPrimary/:id",jwtVerify, editGeneralPrimary)
router.get('/acceptEditGeneralPrimary/:id', jwtVerify,acceptGeneralEditPrimary)
router.get("/rejectEditGeneralPrimary/:id",jwtVerify, rejectGeneralPrimaryEdit)

export default router;