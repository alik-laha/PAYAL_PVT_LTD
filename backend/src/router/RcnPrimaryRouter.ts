import express from 'express';
import RcnPrimaryMiddleWare from '../middleWare/RcnPrimaryMiddleWare';
import CreateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/createRcnPrimaryEntry';
import DeleteRcnEntry from '../controller/RcnPrimaryEntry/DeleteRcnEntry';

const router = express.Router();

router.post('/create', RcnPrimaryMiddleWare, CreateRcnPrimaryEntry);

router.delete('/delete/:id', DeleteRcnEntry);






export default router;