import express from 'express';
import createAsset from '../controller/assetController/createAsset';
import getTotalActiveAsset from '../controller/assetController/getTotalActiveAsset';
import SearchAsset from '../controller/assetController/searchAsset';
import assetMiddleWare from '../middleWare/assetMiddleware'
import UpdateAsset from '../controller/assetController/updateAsset';
import deleteMachine from '../controller/assetController/deleteMachine';

const router = express.Router();

router.post("/createmachine", assetMiddleWare, createAsset)

router.get("/activemachinecount", getTotalActiveAsset)

router.put("/assetSearch", SearchAsset)

router.put('/assetupdate', UpdateAsset)

router.delete('/deleteAsset/:id', deleteMachine)


export default router;