const express = require("express");
const { createHeaderData, getheaderData, imageIcon, getImageIcon, createSectionData, sectionData, createServices, getServices,
    createParagraphData, getData, createContentData, getContent, getUseCaseList } = require("../controller/Use-case");
const upload = require("../middleware/uploadMiddleware")
const UseCaseRouter = express.Router();

UseCaseRouter.post("/create-headerdata", upload.array("image", 1000), createHeaderData);
UseCaseRouter.get("/get-headerdata/:id", getheaderData)
UseCaseRouter.post("/create-imageIcon", upload.array("image", 1000), imageIcon);
UseCaseRouter.get("/get-imageIcon/:id", getImageIcon)
UseCaseRouter.post("/create-section", upload.array("image", 1000), createSectionData);
UseCaseRouter.get("/get-section/:id", sectionData)
UseCaseRouter.post("/create-services", createServices);
UseCaseRouter.get("/get-services/:id", getServices)
UseCaseRouter.post("/create-paragraph", createParagraphData);
UseCaseRouter.get("/get-paragraph/:id", getData)
UseCaseRouter.post("/create-content", upload.array("image", 1000), createContentData);
UseCaseRouter.get("/get-content/:id", getContent)
UseCaseRouter.get("/get-usecaselist", getUseCaseList)


module.exports = UseCaseRouter; 