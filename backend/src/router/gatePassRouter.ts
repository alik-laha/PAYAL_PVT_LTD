import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import CreateGatePass from '../controller/GatePassController/createGatePass';
import CreateGatePassMaster from '../controller/GatePassController/createGatePassMaster';
import updateGatePass from '../controller/GatePassController/updateGatePass';
import SearchGatePass from '../controller/GatePassController/searchGatePass';
import CreateGatePassSection from '../controller/GatePassController/createGatePassSection';
import updateNetWeight from '../controller/GatePassController/updateNetWeight';
import updateApprovalGate from '../controller/GatePassController/updateApprovalGate';
const router = express.Router();

router.post("/createGatePass", jwtVerify, CreateGatePass)
router.post("/createGatePassMaster", jwtVerify, CreateGatePassMaster)
router.post("/createGatePassMasterForSection", jwtVerify, CreateGatePassSection)
router.post("/updateGatePass", jwtVerify, updateGatePass)
router.put("/gatepasssearch", jwtVerify, SearchGatePass)
router.put("/updateNetWeight/:id", jwtVerify, updateNetWeight)
router.put("/updateApproval/:id",jwtVerify, updateApprovalGate)

export default router;