

import express from 'express';
import jwtVerify from "../middleWare/JwtAuthantication";
import { directorDashboard, factorymanagerDashboard, getBacklogLot, infoOfallSection, Lottracker, manualdashboardbasicUpdate } from '../controller/DashboardController/dashboardApi';
const router = express.Router();
router.get("/basicdashboard", infoOfallSection)
router.put("/factory-manager", factorymanagerDashboard)
router.post("/wp-dashboard-basic",jwtVerify, manualdashboardbasicUpdate)
router.get("/lottracker",jwtVerify, Lottracker)
router.put("/director", jwtVerify,directorDashboard)
router.get("/getPendingBacklog/:section", jwtVerify,getBacklogLot)

export default router;