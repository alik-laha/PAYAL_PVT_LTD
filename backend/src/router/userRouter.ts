import express from 'express';
import CreateUser from '../controller/userController/createUser';
const router = express.Router();

router.post("/createuser", CreateUser)



export default router;