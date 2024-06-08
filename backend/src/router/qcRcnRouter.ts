import express from 'express';
import qcInitialEntry from '../controller/qcController/qcInitialEntry';

const router = express.Router();

router.post("/qcInitialEntry", qcInitialEntry)

export default router;