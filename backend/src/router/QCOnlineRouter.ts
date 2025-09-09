import express from 'express';
import jwtVerify from '../middleWare/JwtAuthantication';


import  { CreateBoiler, CreateBoiling, CreateBorma, CreateGrading, CreateHumidifier, CreateScooping, editQCOnlineBoiler, editQCOnlineBorma, editQCOnlineGrading, editQCOnlineScooping, SearchBoiler, SearchBoiling, SearchBorma, SearchGrading, editQCOnlineBoiling,SearchHumidifier, SearchScooping, sumOfallQCOnline, editQCOnlineHumidifier, CreateHandGrade, SearchHandGrade, editQCHandGrade, CreatePouch, SearchPouch, editQCPouch, CreatePeeling, SearchPeeling, editQCPeeling, CreateNanopix, SearchNanopix, editQCNanopix, CreateTaiho, SearchTaiho, editQCTaiho, editQCBucket, SearchBucket, CreateBucket } from '../controller/QCOnline/QCOnlineApi';

const router = express.Router();

 router.get("/sumofallQCOnline", jwtVerify, sumOfallQCOnline)

 router.post("/createQCOnlineBoiler", jwtVerify, CreateBoiler)
 router.post("/createQCOnlineGrading", jwtVerify, CreateGrading)
 router.post("/createQCOnlineBoiling", jwtVerify, CreateBoiling)
 router.post("/createQCOnlineScooping", jwtVerify, CreateScooping)
 router.post("/createQCOnlineBorma", jwtVerify, CreateBorma)
 router.post("/createQCOnlineHumid", jwtVerify, CreateHumidifier)



router.post("/searchQCOnlineBoiler", jwtVerify, SearchBoiler)
router.post("/searchQCOnlineGrading", jwtVerify, SearchGrading)
router.post("/searchQCOnlineBoiling", jwtVerify, SearchBoiling)
router.post("/searchQCOnlineScooping", jwtVerify, SearchScooping)
router.post("/searchQCOnlineBorma", jwtVerify, SearchBorma)
router.post("/searchQCOnlineHumidifier", jwtVerify, SearchHumidifier)


router.post("/editQCOnlineBoiler/:id",jwtVerify, editQCOnlineBoiler)
router.put("/editQCOnlineBoiling/:id",jwtVerify, editQCOnlineBoiling)
router.put("/updateQCOnlineBorma/:id",jwtVerify, editQCOnlineBorma)
router.put("/editQCOnlineGrading/:id",jwtVerify, editQCOnlineGrading)
router.put("/updateQCOnlineScooping/:id",jwtVerify, editQCOnlineScooping)
router.put("/editQCOnlineHumidifier/:id",jwtVerify, editQCOnlineHumidifier)

/* ---------------------- New Routes ---------------------- */
// Hand Grade
router.post("/createQCOnlineHandGrade", jwtVerify, CreateHandGrade);
router.post("/searchQCOnlineHandGrade", jwtVerify, SearchHandGrade);
router.put("/editQCOnlineHandGrade/:id", jwtVerify, editQCHandGrade);

// Pouch
router.post("/createQCOnlinePouch", jwtVerify, CreatePouch);
router.post("/searchQCOnlinePouch", jwtVerify, SearchPouch);
router.put("/editQCOnlinePouch/:id", jwtVerify, editQCPouch);

// Bucket
router.post("/createQCOnlineBucket", jwtVerify, CreateBucket);
router.post("/searchQCOnlineBucket", jwtVerify, SearchBucket);
router.put("/editQCOnlineBucket/:id", jwtVerify, editQCBucket);

// Peeling
router.post("/createQCOnlinePeeling", jwtVerify, CreatePeeling);
router.post("/searchQCOnlinePeeling", jwtVerify, SearchPeeling);
router.put("/editQCOnlinePeeling/:id", jwtVerify, editQCPeeling);

// Nanopix
router.post("/createQCOnlineNanopix", jwtVerify, CreateNanopix);
router.post("/searchQCOnlineNanopix", jwtVerify, SearchNanopix);
router.put("/editQCOnlineNanopix/:id", jwtVerify, editQCNanopix);

// Taiho
router.post("/createQCOnlineTaiho", jwtVerify, CreateTaiho);
router.post("/searchQCOnlineTaiho", jwtVerify, SearchTaiho);
router.put("/updateQCOnlineTaiho/:id", jwtVerify, editQCTaiho);


export default router