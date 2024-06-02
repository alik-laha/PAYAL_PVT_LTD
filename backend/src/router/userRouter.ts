import express from 'express';
import CreateUser from '../controller/userController/createUser';
import LoginUser from '../controller/userController/loginUser';
import SearchUser from '../controller/userController/SearchUser';
import UserMiddleWare from '../middleWare/userMiddleWare';
const router = express.Router();

router.post("/createuser", UserMiddleWare, CreateUser)

router.post("/login", UserMiddleWare, LoginUser)

router.post("/searchuser", SearchUser)



export default router;