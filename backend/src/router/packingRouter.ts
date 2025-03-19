import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { createOrderEntire, manualProdStockUpdate, orderSearch, 
    ordStockSearch, packingSearch, prodStockSearch } from '../controller/PackingController/PackingApi';
const router = express.Router();

router.post("/update-prodstock",jwtVerify, manualProdStockUpdate)
router.put("/prodStockSearch",jwtVerify, prodStockSearch)
router.put("/ordStockSearch",jwtVerify, ordStockSearch)
router.put("/orderSearch",jwtVerify, orderSearch)
router.put("/packingSearch",jwtVerify, packingSearch)
router.post("/createOrderEntire",jwtVerify, createOrderEntire)

export default router