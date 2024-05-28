import express from 'express';
import RcnPrimaryMiddleWare from '../middleWare/RcnPrimaryMiddleWare';
import CreateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/createRcnPrimaryEntry';

const router = express.Router();

router.post('/create', RcnPrimaryMiddleWare, CreateRcnPrimaryEntry);






export default router;