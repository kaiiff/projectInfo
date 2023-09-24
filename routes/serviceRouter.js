const express = require("express");
const router = express.Router();
const upload = require("../common/Upload");

const {
    createServiceHeader,
    getServiceHeader,
    updateServiceHeaderBySlug,
    getServiceHeaderBySlug,
    getServiceHeaderByid,
    updateServiceHeaderById,
    deleteServiceHeaderById,
    
    createServiceParagraph,
    getServiceParagraph,
    updateServiceParagraphById,
    getServiceParaByid,
    getServiceParaBySlug,
    deleteServiceParaById,

  createServiceCards,
  getServiceCards,
  updateServiceCardById,
  getServiceCardByid,
  getServiceCardBySlug,
  deleteServiceCardById,
  createdDataService
} = require("../controller/serviceController");


router.post("/create-add",createdDataService)

router.post("/service-header-add",upload.single("image"),createServiceHeader)
router.get("/service-header-list/:slug",getServiceHeader)
router.put("/service-header-update/:id",upload.single("image"),updateServiceHeaderById)
router.get("/service-header-detail/:id",getServiceHeaderByid)
router.get("/header-detail",getServiceHeaderBySlug)
router.delete("/service-header-delete/:id",deleteServiceHeaderById)


router.post("/service-content-add",upload.single("image"),createServiceParagraph)
router.get("/service-content-list/:slug",getServiceParagraph)
router.put("/service-content-update/:id",upload.single("image"),updateServiceParagraphById)
router.get("/service-content-detail/:id",getServiceParaByid)
router.get("/content-detail",getServiceParaBySlug)
router.delete("/service-content-delete/:id",  deleteServiceParaById)


router.post("/service-card-add",createServiceCards)
router.get("/service-card-list/:slug",getServiceCards)
router.put("/service-card-update/:id",updateServiceCardById)
router.get("/service-card-detail/:id",getServiceCardByid)
router.get("/card-detail",getServiceCardBySlug)
router.delete("/service-card-delete/:id",  deleteServiceCardById)


module.exports = router;


