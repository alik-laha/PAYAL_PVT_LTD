import express from "express";
import createEmployee from "../controller/employeeController/crateateEmployee";
import employeeMiddleWare from "../middleWare/employeeMiddleWare";
import updateEmployee from "../controller/employeeController/updateEmployee";
import searchEmployee from "../controller/employeeController/searchEmployee";
import getAllEmployee from "../controller/employeeController/getAllEmployee";
const router = express.Router();

router.post("/create", employeeMiddleWare, createEmployee)

router.put("/update", employeeMiddleWare, updateEmployee)

router.post("/search", searchEmployee)

router.get("/getall", getAllEmployee)






export default router;