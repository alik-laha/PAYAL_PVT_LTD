import express from 'express';
import CreateUser from '../controller/userController/createUser';
import LoginUser from '../controller/userController/loginUser';
import SearchUser from '../controller/userController/SearchUser';
import UserMiddleWare from '../middleWare/userMiddleWare';
import VerifyUser from '../controller/userController/verifyUser';
import UpdateUser from '../controller/userController/updateUser';
import DeleteUser from '../controller/userController/DeleteUser';
import logoutUser from '../controller/userController/logoutUser';
import totaluserCount from '../controller/userController/totaluserCount';
import jwtVerify from '../middleWare/JwtAuthantication';
const router = express.Router();

router.post("/createuser", jwtVerify, UserMiddleWare, CreateUser)

router.post("/login", LoginUser)

router.post("/searchuser", jwtVerify, SearchUser)
router.get("/totaluserCount", jwtVerify, totaluserCount)

router.get("/verify", VerifyUser)

router.put("/updateuser", jwtVerify, UpdateUser)

router.delete("/deleteuser/:id", jwtVerify, DeleteUser)

router.get("/logout", logoutUser)



export default router;