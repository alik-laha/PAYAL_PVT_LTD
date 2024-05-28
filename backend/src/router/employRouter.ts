import express from "express";
import createEmployee from "../controller/employeeController/createateEmployee";
import employeeMiddleWare from "../middleWare/employeeMiddleWare";
import updateEmployee from "../controller/employeeController/updateEmployee";
import searchEmployee from "../controller/employeeController/searchEmployee";
import getAllEmployee from "../controller/employeeController/getAllEmployee";
import DeleteEmployee from "../controller/employeeController/deleteEmployee";
import releseEmployee from "../controller/employeeController/releseEmployee";
const router = express.Router();

router.post("/create", employeeMiddleWare, createEmployee)

router.put("/update", employeeMiddleWare, updateEmployee)

router.post("/search", searchEmployee)

router.get("/getall", getAllEmployee)

router.delete("/delete/:id", DeleteEmployee)

router.put("/relese", releseEmployee)




export default router;