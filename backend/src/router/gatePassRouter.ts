import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import CreateGatePass from '../controller/GatePassController/createGatePass';
import CreateGatePassMaster from '../controller/GatePassController/createGatePassMaster';
import updateGatePass from '../controller/GatePassController/updateGatePass';
const router = express.Router();

router.post("/createGatePass", jwtVerify, CreateGatePass)
router.post("/createGatePassMaster", jwtVerify, CreateGatePassMaster)
router.post("/updateGatePass", jwtVerify, updateGatePass)

export default router;