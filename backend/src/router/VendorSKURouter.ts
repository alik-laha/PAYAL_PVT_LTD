import express from 'express';

import jwtVerify from '../middleWare/JwtAuthantication';
import createSKU from '../controller/VendorSKUController/createSKU';
import createVendor from '../controller/VendorSKUController/createVendor';
import getTotalActiveSKUVendor from '../controller/VendorSKUController/getTotalActiveSKUVendor';
import SearchSKUVendor from '../controller/VendorSKUController/searchSKUVendor';
import deleteSKU from '../controller/VendorSKUController/deleteSKU';
import deleteVendor from '../controller/VendorSKUController/deleteVendor';

const router = express.Router();

router.post("/createSKU", jwtVerify, createSKU)
router.post("/createVendor", jwtVerify, createVendor)
router.get("/SKUVendorCount", jwtVerify, getTotalActiveSKUVendor)
router.put("/VendorSKUSearch", jwtVerify, SearchSKUVendor)
router.delete('/deleteSKU/:id', jwtVerify, deleteSKU)
router.delete('/deleteVendor/:id', jwtVerify, deleteVendor)
export default router;