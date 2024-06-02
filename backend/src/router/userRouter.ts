import express from 'express';
import CreateUser from '../controller/userController/createUser';
import LoginUser from '../controller/userController/loginUser';
import SearchUser from '../controller/userController/SearchUser';
const router = express.Router();

router.post("/createuser", CreateUser)

router.post("/login", LoginUser)

router.post("/searchuser", SearchUser)



export default router;