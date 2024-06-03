import express from 'express';
import CreateUser from '../controller/userController/createUser';
import LoginUser from '../controller/userController/loginUser';
import SearchUser from '../controller/userController/SearchUser';
import UserMiddleWare from '../middleWare/userMiddleWare';
import VerifyUser from '../controller/userController/verifyUser';
import UpdateUser from '../controller/userController/updateUser';
import DeleteUser from '../controller/userController/DeleteUser';
const router = express.Router();

router.post("/createuser", UserMiddleWare, CreateUser)

router.post("/login", LoginUser)

router.post("/searchuser", SearchUser)

router.get("/verify", VerifyUser)

router.put("/updateuser", UpdateUser)

router.delete("/deleteuser/:id", DeleteUser)



export default router;