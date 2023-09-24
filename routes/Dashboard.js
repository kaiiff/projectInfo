const express = require("express");
// const upload = require("../common/Upload");
const upload = require('../middleware/uploadMiddleware')
const { headerCreate, createReviews, createContents, getContents,
    createHelp, getHelp, createDemo, demoDetails, getheader, cardCreate, createSection, getSection, getList, blogCreate, getBlogData, contactCreate, getContactData, updateHeader, updateCard } = require("../controller/Dashboard");

const DashboardRouter = express.Router();

DashboardRouter.post("/add-created", upload.array("image", 1000), headerCreate);
DashboardRouter.get("/get-header", getheader);
DashboardRouter.put("/update-header/:id", upload.single("image"), updateHeader)

DashboardRouter.post("/add-card", upload.array("image", 1000), cardCreate),
//DashboardRouter.get("/getCard", getCard),
DashboardRouter.put("/update-card/:id",upload.single("image"),updateCard)

DashboardRouter.post("/add-reviews", createReviews);
DashboardRouter.post("/add-content", upload.array("image", 1000), createContents);
DashboardRouter.get("/get-contents", getContents);
DashboardRouter.put("/update-content/:id",upload.single("image"),updateCard)

DashboardRouter.post("/create-help", upload.array("image", 1000), createHelp);
DashboardRouter.get("/get-help", getHelp);
DashboardRouter.post("/add-section", createSection),
DashboardRouter.get("/get-section", getSection),
DashboardRouter.post("/add-demo", createDemo);
DashboardRouter.get("/get-demo", demoDetails);    
DashboardRouter.get("/get-list", getList);

DashboardRouter.post("/add-blog", blogCreate);
DashboardRouter.get("/get-blog", getBlogData);

DashboardRouter.post("/contact-add", contactCreate);
DashboardRouter.get("/get-contact", getContactData);

module.exports = DashboardRouter;               