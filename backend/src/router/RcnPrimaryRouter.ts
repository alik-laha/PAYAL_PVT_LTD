import express from 'express';
import RcnPrimaryMiddleWare from '../middleWare/RcnPrimaryMiddleWare';
import CreateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/createRcnPrimaryEntry';
import DeleteRcnEntry from '../controller/RcnPrimaryEntry/DeleteRcnEntry';
import UpdateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/UpdateRcnPrimaryEntry';

const router = express.Router();

//Create Rcn Entry via user Cookies
router.post('/create', RcnPrimaryMiddleWare, CreateRcnPrimaryEntry);

//Update Rcn Entry by Id
router.put('/update/:id', RcnPrimaryMiddleWare, UpdateRcnPrimaryEntry);

//Delete Rcn Entry by Id
router.delete('/delete/:id', DeleteRcnEntry);






export default router;