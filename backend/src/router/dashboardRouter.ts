

import express from 'express';
import jwtVerify from "../middleWare/JwtAuthantication";
import { factorymanagerDashboard, infoOfallSection, manualdashboardbasicUpdate } from '../controller/DashboardController/dashboardApi';
const router = express.Router();
router.get("/basicdashboard", infoOfallSection)
router.put("/factory-manager", factorymanagerDashboard)
router.post("/wp-dashboard-basic",jwtVerify, manualdashboardbasicUpdate)

export default router;