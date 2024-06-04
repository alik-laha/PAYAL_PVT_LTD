import express from 'express';
import createAsset from '../controller/assetController/createAsset';

const router = express.Router();

router.post("/createmachine", createAsset)

export default router;