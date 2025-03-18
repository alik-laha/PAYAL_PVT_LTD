import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { manualProdStockUpdate, prodStockSearch } from '../controller/PackingController/PackingApi';
const router = express.Router();

router.post("/update-prodstock",jwtVerify, manualProdStockUpdate)
router.put("/prodStockSearch",jwtVerify, prodStockSearch)
export default router