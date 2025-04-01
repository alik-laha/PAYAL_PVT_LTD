import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { approvePurchaseOrder, cancelPurchaseOrder, closePurchaseOrder, createOrderEntire, getActvOrderCount, getMappingByGradeOrigin, getMappingLot, lotdataFind, lotQtydataFind, manualProdStockUpdate, mappingSearch, modifyOrder, orderSearch, 
    ordStockSearch, packingSearch, prodStockSearch, 
    rejectPurchaseOrder,
    updateMappingOrder,
    updateMappingOrderEntire,
    updateReMappingOrderEntire} from '../controller/PackingController/PackingApi';
const router = express.Router();

router.post("/update-prodstock",jwtVerify, manualProdStockUpdate)
router.put("/prodStockSearch",jwtVerify, prodStockSearch)
router.put("/ordStockSearch",jwtVerify, ordStockSearch)
router.put("/orderSearch",jwtVerify, orderSearch)
router.put("/packingSearch",jwtVerify, packingSearch)
router.put("/mappingSearch",jwtVerify, mappingSearch)
router.post("/createOrderEntire",jwtVerify, createOrderEntire)
router.post("/rejectPurchaseOrder",jwtVerify, rejectPurchaseOrder)
router.post("/approvePurchaseOrder",jwtVerify, approvePurchaseOrder)
router.get("/getUnMappingEntry/:status", jwtVerify, getMappingLot)
router.post("/getMappingByGradeOrigin", jwtVerify, getMappingByGradeOrigin)
router.post("/findcompleteLot", jwtVerify,lotdataFind)
router.post("/prodStockQtyFind", jwtVerify,lotQtydataFind)
router.put("/updateOrderMapping/:id/:amount", jwtVerify,updateMappingOrder)
router.put("/updateOrderMappingEntire/:id/:amount", jwtVerify,updateMappingOrderEntire)
router.put("/updateOrderReMappingEntire/:amount", jwtVerify,updateReMappingOrderEntire)
router.post("/closePurchaseOrder",jwtVerify, closePurchaseOrder)
router.post("/cancelPurchaseOrder",jwtVerify, cancelPurchaseOrder)
router.put("/modifyOrder/:id",jwtVerify, modifyOrder)
router.get("/activeordercount", jwtVerify, getActvOrderCount)

export default router