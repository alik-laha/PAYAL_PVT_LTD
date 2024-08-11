import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import createSKU from '../controller/VendorSKUController/createSKU';

const router = express.Router();

router.post("/createSKU", jwtVerify, createSKU)

export default router;