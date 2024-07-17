import express from "express";
import createEmployee from "../controller/employeeController/createEmployee";
import employeeMiddleWare from "../middleWare/employeeMiddleWare";
import updateEmployee from "../controller/employeeController/updateEmployee";
import searchEmployee from "../controller/employeeController/searchEmployee";
import getAllEmployee from "../controller/employeeController/getEmployeeforUser";
import DeleteEmployee from "../controller/employeeController/deleteEmployee";
import releseEmployee from "../controller/employeeController/releseEmployee";
import activeEmployeeCount from "../controller/employeeController/activeEmployeeCount";
import updateEmployeeProfile from "../controller/employeeController/employeeEditProfile";
import jwtVerify from "../middleWare/JwtAuthantication";
import { EmployeeImageUpload } from "../helper/saveimagefromUpload";

const router = express.Router();

router.post("/createemployee", EmployeeImageUpload, employeeMiddleWare, jwtVerify, createEmployee);

router.put("/updateemployee/:id", employeeMiddleWare, jwtVerify, updateEmployee)

router.post("/searchemployee", jwtVerify, searchEmployee)

router.post("/get/employeefor/user", jwtVerify, getAllEmployee)

router.delete("/deleteemployee/:id", jwtVerify, DeleteEmployee)

router.put("/releseemployee/:id", jwtVerify, releseEmployee)

//active Employee Count
router.get("/activeEmployeeCount", jwtVerify, activeEmployeeCount)

router.post("/profileEmployeeEdit", EmployeeImageUpload, jwtVerify, updateEmployeeProfile)




export default router;