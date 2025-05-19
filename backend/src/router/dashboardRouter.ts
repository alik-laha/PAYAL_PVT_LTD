

import express from 'express';
import jwtVerify from "../middleWare/JwtAuthantication";
import { infoOfallSection, manualdashboardbasicUpdate } from '../controller/DashboardController/dashboardApi';
const router = express.Router();
router.get("/basicdashboard", infoOfallSection)
router.post("/wp-dashboard-basic",jwtVerify, manualdashboardbasicUpdate)

export default router;