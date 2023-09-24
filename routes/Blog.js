const express = require("express");
const upload = require("../common/Upload");
const { createBlog, blogList, updateBlogById, deleteBlogById, getBlog,getBlogById } = require("../controller/Blog");
const BlogRouter = express.Router();

BlogRouter.post("/create-blog", upload.single("image"), createBlog);
BlogRouter.get("/blog-list", blogList);
BlogRouter.get("/get-blog/:slug", getBlog);
BlogRouter.put("/update-blog/:id", upload.single("image"), updateBlogById);
BlogRouter.get("/blog-detail/:id", getBlogById);
BlogRouter.delete("/delete-blog/:id", deleteBlogById); 

module.exports = BlogRouter;