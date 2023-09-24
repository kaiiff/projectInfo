const express = require("express");
//const upload = require("../common/Upload");
const upload = require("../middleware/uploadMiddleware")
const { createHeaderData, getheaderData, getSectionData, createSectionData, createCard, getCardData, createParagraph, cardData,
    getParagraph, getCardsData, getEcommercList } = require("../controller/E-commerce");

const EcommerceRouter = express.Router();

EcommerceRouter.post("/create-header", upload.array("image",1000), createHeaderData);
EcommerceRouter.get("/get-header/:id", getheaderData)

EcommerceRouter.post("/create-section", upload.array("image",1000), createSectionData);
EcommerceRouter.get("/get-section/:id", getSectionData)

EcommerceRouter.post("/create-card", createCard);
EcommerceRouter.get("/get-card/:id", getCardData);

EcommerceRouter.post("/create-paragraph", upload.array("image",1000), createParagraph);
EcommerceRouter.get("/get-paragraph/:id", getParagraph);

EcommerceRouter.post("/create-cardata", cardData);
EcommerceRouter.get("/get-cardata/:id", getCardsData);

EcommerceRouter.get("/get-listdata", getEcommercList);

module.exports = EcommerceRouter;