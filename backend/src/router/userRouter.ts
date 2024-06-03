import express from 'express';
import CreateUser from '../controller/userController/createUser';
import LoginUser from '../controller/userController/loginUser';
import SearchUser from '../controller/userController/SearchUser';
import UserMiddleWare from '../middleWare/userMiddleWare';
import VerifyUser from '../controller/userController/verifyUser';
const router = express.Router();

router.post("/createuser", UserMiddleWare, CreateUser)

router.post("/login", LoginUser)

router.post("/searchuser", SearchUser)

router.get("/verify", VerifyUser)





export default router;