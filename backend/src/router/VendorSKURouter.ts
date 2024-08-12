import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import createSKU from '../controller/VendorSKUController/createSKU';
import createVendor from '../controller/VendorSKUController/createVendor';
import getTotalActiveSKUVendor from '../controller/VendorSKUController/getTotalActiveSKUVendor';

const router = express.Router();

router.post("/createSKU", jwtVerify, createSKU)
router.post("/createVendor", jwtVerify, createVendor)
router.get("/SKUVendorCount", jwtVerify, getTotalActiveSKUVendor)

export default router;