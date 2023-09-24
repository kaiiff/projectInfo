const blogAdminModel = require("../model/blogDashModel");
const caseAdminModel = require("../model/caseDashModel");
const { message } = require("../common/Message");

const addDashBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const saveBlog = await blogAdminModel.create({
      blogId,
    });
    return res.status(200).json({
      status: 200,
      message: message.BLOG_ADDED,
      data: saveBlog,
    });
  } catch (error) {
    console.log("error-----------------", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

const getDashBlog = async (req, res) => {
  try {
    const userDetails = await blogAdminModel.findOne()
    .populate({ path: "blogId", strictPopulate: false });
    console.log("userDetails", userDetails);
    if (userDetails) {
      return res.status(200).json({
        message: "successfully",
        userDetails,
      });
    }
    return res.status(404).json({
      message: "Data not found",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
};

// add case dash admin

const addDashCase = async (req, res) => {
  try {
    const { successId } = req.body;
    const saveBlog = await caseAdminModel.create({
      successId,
    });
    return res.status(200).json({
      status: 200,
      message: message.BLOG_ADDED,
      data: saveBlog,
    });
  } catch (error) {
    console.log("error-----------------", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

const getDashCase = async (req, res) => {
  try {
    const storyDetails = await caseAdminModel
      .findOne()
      .populate({ path: "successId", strictPopulate: false });
    console.log("storyDetails", storyDetails);
    if (storyDetails) {
      return res.status(200).json({
        message: "successfully",
        storyDetails,
      });
    }
    return res.status(404).json({
      message: "Data not found",
    });
  } catch (error) {
    console.log("error---------", error);
    return res.status(500).json({
      message: "error",
    });
  }
};

module.exports = {
  addDashBlog,
  getDashBlog,
  addDashCase,
  getDashCase,
};
