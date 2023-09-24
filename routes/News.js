const express = require("express");
const upload = require("../common/Upload");
const { createNews, updateNews, deleteNews, getNewsDetails } = require("../controller/News");

const NewsRouter = express.Router();

//NewsRouter.post("/create", upload.array("image"),createNews);
NewsRouter.put("/update/:id", updateNews);
NewsRouter.delete("/delete/:id",deleteNews);

NewsRouter.get("/details/:slug",getNewsDetails);
module.exports = NewsRouter;
