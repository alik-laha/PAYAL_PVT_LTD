import express from 'express';
import qcInitialEntry from '../controller/qcController/qcInitialEntry';
import SearchQcRCN from '../controller/qcController/SearchQcRCN';

const router = express.Router();

router.post("/qcInitialEntry", qcInitialEntry)
//search Rcn Entry by ConBlNo, fromDate, toDate, origin
router.put('/searchqcRcn', SearchQcRCN);

export default router;