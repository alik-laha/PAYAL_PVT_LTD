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

import PMRouter from "./router/recevingpackageMaterialRouter";
import scoopingRouter from "./router/scoopingRouter";
import qcPackageMaterialRouter from "./router/qcpackagingMaterialrouter";
import Cleaning from "./router/Cleaning";
import BormaRouter from "./router/BormaRouter";
import gatePassRouter from "./router/gatePassRouter";
import VendorSKURouter from "./router/VendorSKURouter";
import storePrimaryRouter from "./router/storePrimaryRouter";



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
app.use('/api/packageMaterial', PMRouter)
app.use("/api/qcpackage", qcPackageMaterialRouter)
app.use('/api/cleaning', Cleaning)
app.use('/api/borma', BormaRouter)
app.use('/api/gatepass', gatePassRouter)
app.use('/api/vendorSKU', VendorSKURouter)
app.use('/api/storePrimary', storePrimaryRouter)

export default app