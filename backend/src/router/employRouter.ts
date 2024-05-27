import express from "express";
import createEmployee from "../controller/employeeController/crateateEmployee";
import employeeMiddleWare from "../middleWare/employeeMiddleWare";
const router = express.Router();

router.post("/create", employeeMiddleWare, createEmployee)






export default router;