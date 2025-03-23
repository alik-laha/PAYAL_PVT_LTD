import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { approvePurchaseOrder, createOrderEntire, getMappingByGradeOrigin, getMappingLot, lotdataFind, lotQtydataFind, manualProdStockUpdate, orderSearch, 
    ordStockSearch, packingSearch, prodStockSearch, 
    rejectPurchaseOrder} from '../controller/PackingController/PackingApi';
const router = express.Router();

router.post("/update-prodstock",jwtVerify, manualProdStockUpdate)
router.put("/prodStockSearch",jwtVerify, prodStockSearch)
router.put("/ordStockSearch",jwtVerify, ordStockSearch)
router.put("/orderSearch",jwtVerify, orderSearch)
router.put("/packingSearch",jwtVerify, packingSearch)
router.post("/createOrderEntire",jwtVerify, createOrderEntire)
router.post("/rejectPurchaseOrder",jwtVerify, rejectPurchaseOrder)
router.post("/approvePurchaseOrder",jwtVerify, approvePurchaseOrder)
router.get("/getUnMappingEntry/:status", jwtVerify, getMappingLot)
router.post("/getMappingByGradeOrigin", jwtVerify, getMappingByGradeOrigin)
router.post("/findcompleteLot", jwtVerify,lotdataFind)
router.post("/prodStockQtyFind", jwtVerify,lotQtydataFind)

export default router