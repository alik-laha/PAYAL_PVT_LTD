import express from "express";
import jwtVerify from "../middleWare/JwtAuthantication";
import { addToStock, bulkAddToStock, CreateQREntire, createStockEntry, deleteQrTransaction, getActvQRCount, SearchQRTransaction, SearchStock, updateStatus, updateStatusBulk, updateThreshold } from "../controller/QRController/QRAPI";
const router = express.Router();

router.post("/createQR", jwtVerify, CreateQREntire);
router.get("/qrcount", jwtVerify, getActvQRCount);
router.put("/searchTransaction", jwtVerify, SearchQRTransaction);
router.delete("/deleteTransaction/:id", jwtVerify, deleteQrTransaction)
router.put('/addTOStock', jwtVerify, addToStock);
router.post('/bulkAddToStock', jwtVerify, bulkAddToStock);
router.post('/createStock', jwtVerify, createStockEntry);
router.put('/updateStock', jwtVerify, updateThreshold);
router.put("/searchStock", jwtVerify, SearchStock);
router.put("/updateStatus", jwtVerify, updateStatus);
router.put("/updateStatusBulk", jwtVerify, updateStatusBulk);

export default router;
