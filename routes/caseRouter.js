const express = require('express')
const upload = require("../middleware/uploadMiddleware")
const uploadImage = require("../common/Upload");
const CaseStudy = require('../controller/caseController')
const caseRouter = express.Router()

caseRouter.post('/createHeader',CaseStudy.createHeader)
caseRouter.get('/getHeader/:id',CaseStudy.getHeader)
caseRouter.post("/createSection",upload.array("image",100),CaseStudy.createSection)
// caseRouter.get('/getSection/:id',CaseStudy.getSection)  
caseRouter.get('/getSection/:slug',CaseStudy.getSection) 
caseRouter.get('/getDataList',CaseStudy.caseList)
caseRouter.put('/updateSection/:id',uploadImage.single("image"),CaseStudy.updateSection)
caseRouter.delete('/delete/:id',CaseStudy.deleteCase)
caseRouter.get("/getCaseImageList",CaseStudy.caseImageCreated)
caseRouter.post('/createImage',upload.array("image",1000),CaseStudy.createImage)
module.exports=caseRouter;