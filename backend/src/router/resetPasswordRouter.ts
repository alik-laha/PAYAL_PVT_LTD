import express from 'express';
import forgotPassword from '../controller/forgotPassword/forgotPassword';
import VerifyCode from '../controller/forgotPassword/verifyCode';
import passWordUpdate from '../controller/forgotPassword/PasswordUpdate';

const Router = express.Router();

Router.post('/forgotPassword', forgotPassword);

Router.post('/verifyCode', VerifyCode);

Router.post('/passwordupdate', passWordUpdate);

export default Router;