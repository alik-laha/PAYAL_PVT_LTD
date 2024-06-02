import express from "express";
import createEmployee from "../controller/employeeController/createEmployee";
import employeeMiddleWare from "../middleWare/employeeMiddleWare";
import updateEmployee from "../controller/employeeController/updateEmployee";
import searchEmployee from "../controller/employeeController/searchEmployee";
import getAllEmployee from "../controller/employeeController/getEmployeeforUser";
import DeleteEmployee from "../controller/employeeController/deleteEmployee";
import releseEmployee from "../controller/employeeController/releseEmployee";
import activeEmployeeCount from "../controller/employeeController/activeEmployeeCount";

const router = express.Router();

router.post("/createemployee", employeeMiddleWare, createEmployee)

router.put("/updateemployee/:id", employeeMiddleWare, updateEmployee)

router.post("/searchemployee", searchEmployee)

router.post("/get/employeefor/user", getAllEmployee)

router.delete("/deleteemployee/:id", DeleteEmployee)

router.put("/releseemployee/:id", releseEmployee)

//active Employee Count
router.get("/activeEmployeeCount", activeEmployeeCount)




export default router;