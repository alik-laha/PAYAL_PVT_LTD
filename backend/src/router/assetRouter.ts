import express from 'express';
import createAsset from '../controller/assetController/createAsset';
import getTotalActiveAsset from '../controller/assetController/getTotalActiveAsset';
import SearchAsset from '../controller/assetController/searchAsset';

const router = express.Router();

router.post("/createmachine", createAsset)
router.get("/activemachinecount", getTotalActiveAsset)
router.get("/assetSearch", SearchAsset)

export default router;