const express = require("express");
const dashAdmin = require('../controller/dashAdminController')
const dashAdminRouter = express.Router();

dashAdminRouter.post("/dashAdminBlog",dashAdmin.addDashBlog)
dashAdminRouter.get("/get-dashAdminBlog", dashAdmin.getDashBlog);

dashAdminRouter.post("/dashAdminCase",dashAdmin.addDashCase)
dashAdminRouter.get("/get-dashAdminCase", dashAdmin.getDashCase)

module.exports = dashAdminRouter;