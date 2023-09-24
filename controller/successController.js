const successModel = require("../model/successmodel");

const { message } = require("../common/Message");
const successCategoryModel = require("../model/successCategory");

// slug used here
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

//  success-category add
const successCategory = async (req, res) => {
  try {
    const { file } = req;
    console.log("file", file);
    const { name } = req.body;
    console.log("req.body", req.body);
    const successCategorySection = await successCategoryModel.create({
      name,
    });
    return res.status(200).json({
      message: message.SUCCESS_CATEGORY_ADDED,
      data: successCategorySection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// add story
const addStory = async (req, res) => {
  try {
    const { file } = req;
    console.log("file", file);
    const { title, description, short_description, successcategoryId } = req.body;
    console.log("req.body", req.body);
    const storySaved = await successModel.create({
      // successcategoryId,
      title,
      image: process.env.BASE_URL + file.filename,
      description,
      short_description
    });
    return res.status(200).json({
      message: message.STORY_ADDED,
      data: storySaved,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

/*const storyList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, sortBy } = req.query;

    //sorting
    console.log("sort..", sort, sortBy);
    const sortValue = req.query.sortBy;
    let sortOrder = { [sortBy]: sort === "desc" ? -1 : 1 };
    console.log("sortOrder..................", sortOrder);
    let condition = {};
    const getList = await successModel
      .find(condition)
      // console.log("getList---------",getList)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ title: sortValue, slug: sortValue });

    const totalgetList = await successModel.countDocuments(condition);
    if (!totalgetList) {
      return res.status(400).json({
        status: 400,
        message: message.DATA_NOT_FOUND,
      });
    }
    return res.status(200).json({
      status: 200,
      TotalgetList: totalgetList,
      message: message.STORY_DETAILS,
      getList,
    });
  } catch (error) {
    console.log("error----------", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};*/

//get success story list

const storyList = async (req, res) => {
  try {
    const BlogDetails = await successModel.find().sort({ createdAt: -1 });
    console.log("BlogDetails", BlogDetails);
    if (BlogDetails) {
      return res.status(200).json({
        status: 200,
        message: message.GET_BLOG,
        data: BlogDetails,
      });
    }
    return res.status(404).json({
      status: 404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};


const updateStoryImage = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("req.params", req.params);

    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    } else {
      image = null;
    }

    if (image == undefined || image == "") {
      return res.json({ statusMsj: 403, statusMsj: "Image field is required" });
    }

    console.log("req.body.............", req.body);
    const blog = await successModel.findOne({ slug: slug });
    if (!blog) {
      return res.send("Invalid slug...");
    }
    console.log("blog----------------", blog);
    await blog.save();

    const updateStoryImage = await successModel.findOneAndUpdate(
      { slug: slug },
      { $set: { image: image } },
      { new: true }
    );
    return res.status(200).json({
      message: message.STORY_UPDATED_IMAGE,
      data: updateStoryImage,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ status: false, message: "image update failed", body: "" });
  }
};

//delete section by slug
const deleteStory = async (req, res, next) => {
  try {
    //const deleteuser = await user.find()
    const id = req.params.id;
    const dataDelete = await successModel.findOne({ _id: id });
    console.log("dataDelete-----------", dataDelete);
    if (!dataDelete) {
      return res.status(404).json({
        message: message.DATA_NOT_FOUND,
      });
    }
    const deleteData = await successModel.deleteOne({ _id: id });
    console.log("deleteData---------------", deleteData);
    return res.status(200).json({
      status: 200,
      message: message.STORY_DELETED,
    });
  } catch (error) {
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

const getSuccessData = async (req, res) => {
  try {


    const query = [
      {
        $lookup: {
          from: "success-categories",
          localField: "successcategoryId",
          foreignField: "_id",
          as: "successcategory",
        },
      },
      {
        $unwind: "$successcategory",
      },

      {
        $project: {
          successcategory_id: "$successcategory._id",
          name: "$successcategory.name",
          title: "$title",
          description: "$description",
          image: "$image",
          slug: "$slug",
        },
      },
    ];
    //aggregation used
    const totalcount = await successModel.aggregate(query);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Data get successfully !",
      data: totalcount,
    });
  } catch (error) {
    console.log("error..................", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get success categrory data

const getSuccessCategoryData = async (req, res) => {
  try {
    const successCategoryData = await successCategoryModel.find();
    console.log("successCategoryData", successCategoryData);
    if (successCategoryData) {
      return res.status(200).json({
        status: 200,
        message: "successfully",
        successCategoryData,
      });
    }
    return res.status(404).json({
      status: 404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get story by slug

const getSlug = async (req, res) => {
  try {
    const { params } = req;
    const { slug } = params;
    const successStoryDetails = await successModel.findOne({ slug: slug });
    console.log("successStoryDetails", successStoryDetails);
    if (successStoryDetails) {
      return res.status(200).json({
        status: 200,
        message: message.STORY_DETAILS,
        data: successStoryDetails,
      });
    }
    return res.status(404).json({
      status: 404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//update story by id
const updateStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params", req.params);
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    }
    //  else {
    //   image = null;
    // }
    const { title, description, short_description, successcategoryId } = req.body;
    console.log("req.body.............", req.body);
    const blog = await successModel.findOne({ _id: id });
    if (!blog) {
      return res.send("Invalid Id...");
    }
    console.log("blog----------------", blog);
    await blog.save();
    const updateStory = await successModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          image: image,
          short_description: short_description,
          // successcategoryId: successcategoryId,
          slug: slugify(title),
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: message.STORY_UPDATED,
      data: updateStory,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// get story  by id
const getStoryById = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const successStoryDetails = await successModel.findOne({ _id: id });
    console.log("successStoryDetails", successStoryDetails);
    if (successStoryDetails) {
      return res.status(200).json({
        status: 200,
        message: message.STORY_DETAILS,
        data: successStoryDetails,
      });
    }
    return res.status(404).json({
      status: 404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// delete story by id
const deleteStoryById = async (req, res, next) => {
  try {
    //const deleteuser = await user.find()
    // const id = req.params.id;

    const { params } = req;
    const { id } = params;

    const dataDelete = await successModel.findOne({ _id: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
    await successModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: 200,
      message: message.STORY_DELETED,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get success stories with success category

const getSuccessStory = async (req, res) => {
  try {
    const storyDetails = await successModel
      .findOne()
      .populate({ path: "successcategoryId", strictPopulate: false });
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
  addStory,
  storyList,
  deleteStory,
  updateStoryImage,
  successCategory,
  getSuccessData,
  getSuccessCategoryData,
  getSlug,
  updateStoryById,
  getStoryById,
  deleteStoryById,
  getSuccessStory,
};
