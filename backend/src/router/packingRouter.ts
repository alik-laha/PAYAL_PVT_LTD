import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';
import { approvePurchaseOrder, cancelPurchaseOrder, closePurchaseOrder, createOrderEntire, createPacking, createunPacking, deleteOrderMapping, getActvOrderCount, getMappingByGradeOrigin, getMappingLot, lotdataFind, lotQtydataFind, lotQtydataFindAll, lotQtydataFindAllOriginWise, manualProdStockUpdate, mappingSearch, mappingSearchAll, modifyOrder, orderSearch, 
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
router.put("/mappingSearchAll",jwtVerify, mappingSearchAll)
router.post("/createOrderEntire",jwtVerify, createOrderEntire)
router.post("/rejectPurchaseOrder",jwtVerify, rejectPurchaseOrder)
router.post("/approvePurchaseOrder",jwtVerify, approvePurchaseOrder)
router.get("/getUnMappingEntry/:status", jwtVerify, getMappingLot)
router.post("/getMappingByGradeOrigin", jwtVerify, getMappingByGradeOrigin)
router.post("/findcompleteLot", jwtVerify,lotdataFind)
router.post("/prodStockQtyFind", jwtVerify,lotQtydataFind)
router.put("/updateOrderMapping/:id/:mixQuantitySum", jwtVerify,updateMappingOrder)
router.put("/updateOrderMappingEntire/:id/:mixQuantitySum", jwtVerify,updateMappingOrderEntire)
router.put("/updateOrderReMappingEntire/:mixQuantitySum", jwtVerify,updateReMappingOrderEntire)
router.post("/closePurchaseOrder",jwtVerify, closePurchaseOrder)
router.post("/cancelPurchaseOrder",jwtVerify, cancelPurchaseOrder)
router.put("/modifyOrder/:id",jwtVerify, modifyOrder)
router.get("/activeordercount", jwtVerify, getActvOrderCount)
router.post("/deleteOrderMapping",jwtVerify, deleteOrderMapping)
router.post("/createPacking/:id",jwtVerify, createPacking)
router.post("/unPackOrder",jwtVerify, createunPacking)
router.post("/viewprodStockQtyFind", jwtVerify,lotQtydataFindAllOriginWise)
export default router