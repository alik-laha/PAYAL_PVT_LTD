import express from 'express';
import createAsset from '../controller/assetController/createAsset';
import getTotalActiveAsset from '../controller/assetController/getTotalActiveAsset';
import SearchAsset from '../controller/assetController/searchAsset';
import assetMiddleWare from '../middleWare/assetMiddleware'
import UpdateAsset from '../controller/assetController/updateAsset';
import deleteMachine from '../controller/assetController/deleteMachine';
import getMechineByType from '../controller/assetController/getAllMachineBytype';
import jwtVerify from '../middleWare/JwtAuthantication';
import getAllActiveMachineForDropDown from '../controller/assetController/getallActiveMachine';

const router = express.Router();

router.post("/createmachine", assetMiddleWare, jwtVerify, createAsset)

router.get("/activemachinecount", jwtVerify, getTotalActiveAsset)

router.put("/assetSearch", jwtVerify, SearchAsset)

router.put('/assetupdate', jwtVerify, UpdateAsset)

router.delete('/deleteAsset/:id', jwtVerify, deleteMachine)

router.get('/getMachineByType/:type', jwtVerify, getMechineByType)

router.get('/getallActiveMachine', jwtVerify, getAllActiveMachineForDropDown)


export default router;