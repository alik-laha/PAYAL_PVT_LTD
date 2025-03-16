import express from "express"
import jwtVerify from "../middleWare/JwtAuthantication";
import { checkLock, LockForm, UnlockForm } from "../controller/FormLock/FormLock";




const router = express()

router.get("/checkLock/:formName", jwtVerify, checkLock)
router.post("/lockForm", jwtVerify, LockForm)
router.post("/unlockForm", jwtVerify, UnlockForm)


export default router