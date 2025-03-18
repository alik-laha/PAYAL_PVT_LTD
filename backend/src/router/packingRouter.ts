import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { createOrderEntire, manualProdStockUpdate, prodStockSearch } from '../controller/PackingController/PackingApi';
const router = express.Router();

router.post("/update-prodstock",jwtVerify, manualProdStockUpdate)
router.put("/prodStockSearch",jwtVerify, prodStockSearch)
router.post("/createOrderEntire",jwtVerify, createOrderEntire)

export default router