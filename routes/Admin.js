const express = require("express");
const { logout, updatePassword, changePassword, getData, adminLogin, updateAdminProfile } = require("../controller/Admin");
const upload = require("../common/Upload")
const AdminRouter = express.Router();

AdminRouter.post("/sign-in", adminLogin);
AdminRouter.put("/update/:id", upload.single("image"), updateAdminProfile)
AdminRouter.get("/logout", logout)
AdminRouter.post("/updatePassword", updatePassword)
AdminRouter.post("/changePassword", changePassword) 
AdminRouter.get("/data", getData)

module.exports = AdminRouter;
