import express from "express";
import createEmployee from "../controller/employeeController/crateateEmployee";
import employeeMiddleWare from "../middleWare/employeeMiddleWare";
import updateEmployee from "../controller/employeeController/updateEmployee";
const router = express.Router();

router.post("/create", employeeMiddleWare, createEmployee)

router.put("/update", employeeMiddleWare, updateEmployee)






export default router;