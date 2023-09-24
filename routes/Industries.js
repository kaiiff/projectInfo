const express = require("express");
const upload = require("../common/Upload");
const { createHeaderSection, HeaderGetData, createIndustrieSection, getIndustrieData, cardIndustrieCreate,
    createHelpSectionData, getIndustrieHelpData, createParagraphData, getParagraphData, updateIndustrieData, HeaderList,
    updateIndustrieSection, updateIndustrieCards, SectionList, CardList, updateIndustrieHelp, HelpList, updateIndustrieParagraph, ParagraphList, createdData, getIndustrieCard } = require("../controller/Industries");
const IndusteiRouter = express.Router();

IndusteiRouter.post("/add-data", createdData)

IndusteiRouter.post("/header-add", upload.array("image", 1000), createHeaderSection);
IndusteiRouter.get("/get-header/:slug", HeaderGetData);
IndusteiRouter.get("/get-headerData/:id", HeaderGetData);

IndusteiRouter.put("/update-header/:id", upload.single("image", 1000), updateIndustrieData);
IndusteiRouter.get("/get-listHeader", HeaderList);

IndusteiRouter.post("/section-add", upload.array("image", 100), createIndustrieSection);
IndusteiRouter.get("/section-get/:slug", getIndustrieData); 

IndusteiRouter.put("/update-section/:id", upload.single("image", 1000), updateIndustrieSection);
IndusteiRouter.get("/section-list", SectionList);


IndusteiRouter.post("/card-added", cardIndustrieCreate);
IndusteiRouter.get("/get-card/:slug", getIndustrieCard);
IndusteiRouter.put("/update-card/:id", updateIndustrieCards);
IndusteiRouter.get("/card-list", CardList);


IndusteiRouter.post("/help-added", upload.array("image", 1000), createHelpSectionData)
IndusteiRouter.get("/get-help/:slug", getIndustrieHelpData)
IndusteiRouter.put("/update-help/:id", upload.single("image", 1000), updateIndustrieHelp);
IndusteiRouter.get("/help-list", HelpList);


IndusteiRouter.post("/paragraph-added", upload.array("image", 1000), createParagraphData)
IndusteiRouter.get("/get-paragraph/:slug", getParagraphData)
IndusteiRouter.put("/update-paragraph/:id", upload.single("image", 1000), updateIndustrieParagraph);
IndusteiRouter.get("/paragraph-list", ParagraphList);


module.exports = IndusteiRouter;