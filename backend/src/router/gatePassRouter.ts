import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import CreateGatePass from '../controller/GatePassController/createGatePass';
const router = express.Router();

router.post("/createGatePass", jwtVerify, CreateGatePass)



export default router;