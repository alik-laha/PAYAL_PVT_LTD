import express from "express";
const app = express();
import cors from "cors";
import employeeRouter from "./router/employRouter";
import cookieParser from "cookie-parser"
import RcnPrimary from "./router/RcnPrimaryRouter";
import userRouter from "./router/userRouter";
import assetRouter from './router/assetRouter'
import GraddingRouter from './router/GraddingRouter'
import qcRcnRouter from './router/qcRcnRouter'
import BoilingRouter from './router/BoilingRouter'
import ResetPassword from "./router/resetPasswordRouter";

import Quality from "./router/recevingpackageMaterial";
import scoopingRouter from "./router/scoopingRouter";
import qcPackageMaterialRouter from "./router/qcpackagingMaterialrouter";
import Cleaning from "./router/Cleaning";
import BormaRouter from "./router/BormaRouter";


app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.get("/api", (req, res) => {
    res.send("Hello World")
})
app.use("/api/employee", employeeRouter)
app.use("/api/rcnprimary", RcnPrimary)
app.use('/api/user', userRouter)
app.use('/api/asset', assetRouter)
app.use('/api/qcRcn', qcRcnRouter)
app.use('/api/grading', GraddingRouter)
app.use('/api/boiling', BoilingRouter)
app.use('/api/scooping', scoopingRouter)
app.use('/api/resetPassword', ResetPassword)
app.use('/api/quality', Quality)
app.use("/api/qcpackage", qcPackageMaterialRouter)
app.use('/api/cleaning', Cleaning)
app.use('/api/borma', BormaRouter)


export default app