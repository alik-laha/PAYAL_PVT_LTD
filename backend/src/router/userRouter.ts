import express from 'express';
import CreateUser from '../controller/userController/createUser';
import LoginUser from '../controller/userController/loginUser';
const router = express.Router();

router.post("/createuser", CreateUser)

router.post("/login", LoginUser)



export default router;