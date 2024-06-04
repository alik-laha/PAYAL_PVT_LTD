import express from 'express';
import createAsset from '../controller/assetController/createAsset';
import getTotalActiveAsset from '../controller/assetController/getTotalActiveAsset';

const router = express.Router();

router.post("/createmachine", createAsset)
router.get("/activemachinecount", getTotalActiveAsset)

export default router;