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
import generalPrimaryRouter from "./router/generalPrimaryRouter";
import almondRouter from "./router/almondRouter";
import RcvVillageRouter from "./router/RcvVillageRouter";
import HumidRouter from "./router/HumidRouter";
import agarbatiRouter from "./router/agarbatiRouter";
import issueRouter from "./router/issueRouter";
import oilMillRouter from "./router/oilMillRouter";
import QCWaterRouter from "./router/QCWaterRouter";
import PeelingRouter from "./router/PeelingRouter";
import mayurRouter from "./router/mayurRouter";
import dpdsRouter from "./router/dpdsRouter";
import bigTaihoRouter from "./router/bigTaihoRouter";
import HamsaRouter from "./router/HamsaRouter";
import SortingRouter from "./router/SortingRouter";
import wholesRouter from "./router/wholesRouter";
import LWRouter from "./router/LWRouter";
import RejectionRouter from "./router/RejectionRouter";
import formLockRouter from "./model/formLockRouter";
import packingRouter from "./router/packingRouter";
import VillageOutRouter from "./router/VillageOutRouter";
import RcvVillageInRouter from "./router/RcvVillageInRouter";
import cashewOutRouter from "./router/cashewOutRouter";



app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.get("/api", (req, res) => {
    res.send("Hello World")
})
app.use("/api/employee", employeeRouter)
app.use("/api/rcnprimary", RcnPrimary)
app.use("/api/cashewOut", cashewOutRouter)
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
app.use('/api/humid', HumidRouter)
app.use('/api/gatepass', gatePassRouter)
app.use('/api/vendorSKU', VendorSKURouter)
app.use('/api/storePrimary', storePrimaryRouter)
app.use('/api/generalPrimary', generalPrimaryRouter)
app.use('/api/almondPrimary', almondRouter)
app.use('/api/rcvVillage', RcvVillageRouter)
app.use('/api/rcvVillageIn', RcvVillageInRouter)
app.use('/api/agarbatiPrimary', agarbatiRouter)
app.use("/api/qcpackage", qcPackageMaterialRouter)
app.use("/api/issue", issueRouter)
app.use("/api/oilMill", oilMillRouter)
app.use("/api/qcWater", QCWaterRouter)
app.use("/api/peeling", PeelingRouter)
app.use("/api/mayur", mayurRouter)
app.use("/api/dpds", dpdsRouter)
app.use("/api/bigTaiho", bigTaihoRouter)
app.use("/api/hamsa", HamsaRouter)
app.use("/api/sorting", SortingRouter)
app.use("/api/wholes", wholesRouter)
app.use("/api/lw", LWRouter)
app.use("/api/rejection", RejectionRouter)
app.use("/api/formlock", formLockRouter)
app.use("/api/packing", packingRouter)
app.use("/api/villageout", VillageOutRouter)
export default app