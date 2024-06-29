import express from 'express';
import forgotPassword from '../controller/forgotPassword/forgotPassword';
import VerifyCode from '../controller/forgotPassword/verifyCode';

const Router = express.Router();

Router.post('/forgotPassword', forgotPassword);

Router.post('/verifyCode/:token', VerifyCode);

export default Router;