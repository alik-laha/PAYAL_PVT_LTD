import express from 'express';
import RcnPrimaryMiddleWare from '../middleWare/RcnPrimaryMiddleWare';
import CreateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/createRcnPrimaryEntry';
import DeleteRcnEntry from '../controller/RcnPrimaryEntry/DeleteRcnEntry';
import UpdateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/UpdateRcnPrimaryEntry';
import SearchRcnPrimary from '../controller/RcnPrimaryEntry/SearchRcnPrimary';
import SumOfAllOriginRcnPrimary from '../controller/RcnPrimaryEntry/SumofAllOriginRcnPrimary';
import getAllRcnPrimaryEntry from '../controller/RcnPrimaryEntry/getAllRcnPrimaryEntry';

const router = express.Router();

//Create Rcn Entry via user Cookies
router.post('/create', RcnPrimaryMiddleWare, CreateRcnPrimaryEntry);

//Update Rcn Entry by Id
router.put('/update/:id', RcnPrimaryMiddleWare, UpdateRcnPrimaryEntry);

//Delete Rcn Entry by Id
router.delete('/delete/:id', DeleteRcnEntry);

//search Rcn Entry by ConBlNo, fromDate, toDate, origin
router.put('/search', SearchRcnPrimary);

//Get Sum of all Origin Rcn Primary
router.get('/sum', SumOfAllOriginRcnPrimary);

//Get All Rcn Entry

router.get('/all', getAllRcnPrimaryEntry);





export default router;