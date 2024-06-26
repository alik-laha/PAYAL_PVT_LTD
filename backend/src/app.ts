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

export default app