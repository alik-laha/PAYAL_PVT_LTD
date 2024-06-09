import express from 'express';
import qcInitialEntry from '../controller/qcController/qcInitialEntry';
import SearchQcRCN from '../controller/qcController/SearchQcRCN';
import approveQCinitial from '../controller/qcController/approveQCinitial';
const router = express.Router();

router.post("/qcInitialEntry", qcInitialEntry)
//search Rcn Entry by ConBlNo, fromDate, toDate, origin
router.put('/searchqcRcn', SearchQcRCN);
//Edit Approve Rcn Entry by Id
router.put("/qcRcnApprove/:id", approveQCinitial);

export default router;