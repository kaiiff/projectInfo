const BlogModelSchema = require("../model/Blog");
const { message } = require("../common/Message");
const { default: slugify } = require("slugify");

//save blog data
const createBlog = async (req, res) => {
  try {
    const { file } = req;
    const { title, description, sortDescription } = req.body;
    const saveBlog = await BlogModelSchema.create({
      title,
      image: process.env.BASE_URL + file.filename,
      description,
      sortDescription,
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

/*const blogList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort, sortBy } = req.query;
        //sorting
        console.log("sort..", sort, sortBy);
        const sortValue = req.query.sortBy;
        let sortOrder = { [sortBy]: sort === "desc" ? -1 : 1 };
        console.log("sortOrder..................", sortOrder);
        let condition = {};
        const getList = await BlogModelSchema
            .find(condition)
            // console.log("getList---------",getList)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ title: sortValue ,: sortValue});

        const totalgetList = await BlogModelSchema.countDocuments(condition);
        if (!totalgetList) {
            return res.status(400).json({
                status: 400,
                message: message.DATA_NOT_FOUND,
            });
        }
        return res.status(200).json({
            status: 200,
            TotalgetList: totalgetList,
            message: message.BLOG_DATA_LIST,
            getList,
        });
    } catch (error) {
        console.log("error----------",error)
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE,
        });
    }
};*/

const blogList = async (req, res) => {
  try {
    const BlogDetails = await BlogModelSchema.find().sort({ createdAt: -1 });
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

// get blog by
const getBlog = async (req, res) => {
  try {
    const { params } = req;
    const {} = params;
    const BlogDetails = await BlogModelSchema.findOne({ id });
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

//update blog by id
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const ify = (str) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    }
    // else {
    //     image = null;
    // }
    const { title, description, sortDescription } = req.body;
    const blog = await BlogModelSchema.findOne({ _id: id });
    if (!blog) {
      return res.status(422).json({
        status: 422,
        message: "Invalid ...",
      });
    }
    const updateBlog = await BlogModelSchema.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          image: image,
          sortDescription: sortDescription,
          title: slugify(title),
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: message.BLOG_UPDATED,
      data: updateBlog,
    });
  } catch (error) {
    console.log("error-------", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//delete section
const deleteBlogById = async (req, res, next) => {
  try {
    //const deleteuser = await user.find()
    // const id = req.params.id;

    const { params } = req;
    const { id } = params;

    const dataDelete = await BlogModelSchema.findOne({ _id: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
    await BlogModelSchema.deleteOne({ _id: id });
    return res.status(200).json({
      status: 200,
      message: message.BLOG_DELETED,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get blog  by id
const getBlogById = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const blogdetails = await BlogModelSchema.findOne({ _id: id });
    console.log("blogdetails", blogdetails);
    if (blogdetails) {
      return res.status(200).json({
        status: 200,
        message: message.STORY_DETAILS,
        data: blogdetails,
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

module.exports = {
  createBlog,
  blogList,
  getBlog,
  updateBlogById,
  deleteBlogById,
  getBlogById,
};
