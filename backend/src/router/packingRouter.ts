import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { manualProdStockUpdate } from '../controller/PackingController/PackingApi';
const router = express.Router();

router.post("/update-prodstock",jwtVerify, manualProdStockUpdate)

export default router