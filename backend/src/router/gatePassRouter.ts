import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import CreateGatePass from '../controller/GatePassController/createGatePass';
import CreateGatePassMaster from '../controller/GatePassController/createGatePassMaster';
import updateGatePass from '../controller/GatePassController/updateGatePass';
import SearchGatePass from '../controller/GatePassController/searchGatePass';
import CreateGatePassSection from '../controller/GatePassController/createGatePassSection';
import updateNetWeight from '../controller/GatePassController/updateNetWeight';
import updateApprovalGate from '../controller/GatePassController/updateApprovalGate';
import updateReleaseGate from '../controller/GatePassController/updateReleaseGate';
import getActvGatepass from '../controller/GatePassController/getActvGatepass';
import deletegatepass from '../controller/GatePassController/deletegatepass';
import deletegatepassSection from '../controller/GatePassController/deletegatepassSection';
import updateRcvDispathStatus from '../controller/GatePassController/updateRcvDispathStatus';
import CreateGatePassEntire from '../controller/GatePassController/createGatepasEntire';
import updateApprovalGateFinal from '../controller/GatePassController/updateApprovalGatePassFinal';
const router = express.Router();

router.post("/createGatePass", jwtVerify, CreateGatePass)
router.delete("/deletegatepass/:id", jwtVerify, deletegatepass)
router.delete("/deletegatepassSection/:id/:section", jwtVerify, deletegatepassSection)

router.post("/createGatePassMaster", jwtVerify, CreateGatePassMaster)
router.post("/createGatePassMasterForSection", jwtVerify, CreateGatePassSection)
router.post("/updateGatePass", jwtVerify, updateGatePass)
router.put("/gatepasssearch", jwtVerify, SearchGatePass)
router.put("/updateNetWeight/:id", jwtVerify, updateNetWeight)
router.put("/updateApproval/:id",jwtVerify, updateApprovalGate)
router.put("/updateApprovalFinal/:id",jwtVerify, updateApprovalGateFinal)
router.put("/updateRelease/:id",jwtVerify, updateReleaseGate)
router.get("/activegatepasscount", jwtVerify, getActvGatepass)
router.post("/updateRcvDisptchStatus", jwtVerify, updateRcvDispathStatus)


router.post("/createGatePassEntire",jwtVerify, CreateGatePassEntire)
export default router;