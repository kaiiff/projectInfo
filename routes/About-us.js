const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const uploadSingle = require("../common/Upload");
const { createHeader, getheader, createCards, paragraphCreate, getParagraphData, createReview, getRating, getAboutUsList, updateAboutHeader,
    getAboutCard, updateAboutCard, createSection, getAboutSection, updateAboutSection } = require("../controller/About-us");

const AboutRouter = express.Router();

AboutRouter.post("/create-header", upload.array("image", 1000), createHeader);
AboutRouter.get("/get-header", getheader);
AboutRouter.put("/about-header-update/:id", uploadSingle.single("image"), updateAboutHeader);
AboutRouter.post("/save-cards", createCards);
AboutRouter.get("/get-aboutCard", getAboutCard);
AboutRouter.put("/update-aboutCard", updateAboutCard);
AboutRouter.post("/create-section", createSection);
AboutRouter.get("/get-aboutSection", getAboutSection);
AboutRouter.put("/update-aboutSection", updateAboutSection);
AboutRouter.post("/create-paragraph", paragraphCreate),
AboutRouter.get("/get-data/:id", getParagraphData),
AboutRouter.post("/create-review", createReview),
AboutRouter.get("/get-rating/:id", getRating)
AboutRouter.get("/get-list", getAboutUsList);

module.exports = AboutRouter;         
