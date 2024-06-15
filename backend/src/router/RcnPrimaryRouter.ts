import express from 'express';
import RcnPrimaryMiddleWare from '../middleWare/RcnPrimaryMiddleWare';
import CreateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/createRcnPrimaryEntry';
import DeleteRcnEntry from '../controller/RcnPrimaryEntry/DeleteRcnEntry';
import UpdateRcnPrimaryEntry from '../controller/RcnPrimaryEntry/UpdateRcnPrimaryEntry';
import SearchRcnPrimary from '../controller/RcnPrimaryEntry/SearchRcnPrimary';
import SumOfAllOriginRcnPrimary from '../controller/RcnPrimaryEntry/SumofAllOriginRcnPrimary';
import EditReject from '../controller/RcnPrimaryEntry/EditReject';
import EditApprove from '../controller/RcnPrimaryEntry/EditApprove';
import getAllEditPending from '../controller/RcnPrimaryEntry/getAllEditPending';
import jwtVerify from '../middleWare/JwtAuthantication';


const router = express.Router();

//Create Rcn Entry via user Cookies
router.post('/create', RcnPrimaryMiddleWare, jwtVerify, CreateRcnPrimaryEntry);

//Update Rcn Entry by Id
router.put('/update/:id', RcnPrimaryMiddleWare, jwtVerify, UpdateRcnPrimaryEntry);

//Delete Rcn Entry by Id
router.delete('/delete/:id', jwtVerify, DeleteRcnEntry);

//search Rcn Entry by ConBlNo, fromDate, toDate, origin
router.put('/rcnprimarysearch', jwtVerify, SearchRcnPrimary);

//Get Sum of all Origin Rcn Primary
router.get('/sum', jwtVerify, SumOfAllOriginRcnPrimary);


//Edit Reject Rcn Entry by Id
router.delete('/rejectededitrcn/:id', jwtVerify, EditReject);

//Edit Approve Rcn Entry by Id
router.put("/approveeditrcn/:id", jwtVerify, EditApprove);

router.get('/geteditpending', jwtVerify, getAllEditPending);






export default router;