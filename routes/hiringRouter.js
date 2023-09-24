const express = require("express");
const hiring = require("../controller/hiringController");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware")

router.post("/add-hiring",hiring.addHiring);
router.get("/get-career-data", hiring.getHiringData);
router.put("/update-career/:id",hiring.updateHiringData)
router.delete("/delete-career/:id",hiring.deleteHiringById)
router.get("/get-career/:id",hiring.getHiringById)
router.put("/change-status/:id",hiring.updateCareerStatus)
router.post("/contact-hiring",upload.array("file",10),hiring.addHiringContact)  
router.get("/hiring-contact-details",hiring.getHiringContact)
router.get("/hiring-contact-details/:id",hiring.hiringDetailsByiD)

module.exports = router;
