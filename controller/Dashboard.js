const DashboardModel = require("../model/Dashboard");
const { message } = require("../common/Message");
const headerModel = require("../model/Header");
const CardModel = require("../model/Cards");
const reviewModel = require("../model/Review-dash");
const demoModel = require("../model/demoDashModel");
const sectionModel = require("../model/sectionDashboardModel");
const contentModel = require("../model/contentDshboardModel");
const ContactDashModel = require("../model/ContactdashModel");
const HelpDashModel = require("../model/HelpdashModel");

// save data for Header
const headerCreate = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createData = new headerModel({
      title: title,
      description: description,
    });
    if (req.files) { 
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      createData.image = process.env.BASE_URL + file;
    }
    await createData.save();
    return res.status(200).json({
      status: 200,
      message: message.HEADER_CREATED,
      createData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// Get data for Header
const getheader = async (req, res) => {
  try {
    const headerDetails = await headerModel.findOne();
    console.log("headerDetails", headerDetails);
    const Cards = await CardModel.find();
    const Reviews = await reviewModel.find();
    console.log("headerDetails", headerDetails);
    if (headerDetails) {
      return res.status(200).json({
        status: 200,
        message: message.HEADERDETAILS_SUCCESS,
        headerDetails,
        Cards,
        Reviews,
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

//update header section - Id
const updateHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    } else {
      image = null;
    }
    const { title, description } = req.body;
    const header = await headerModel.findOne({ _id: id });
    if (!header) {
      return res.status(422).json({
        status: 422,
        message: "Invalid header id...",
      });
    }
    const updateHeaderSection = await headerModel.findByIdAndUpdate({ _id: id }, {
      $set: {
        title: title, description: description,
        image: image
      }
    }, { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Header data updated successfully!",
      updateHeaderSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// save data for card
const cardCreate = async (req, res) => {
  try {
    const { title, text } = req.body;
    let data = new CardModel({
      title,
      text,
    });
    if (req.files) {
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      data.image = process.env.BASE_URL + file;
    }
    let cardData = await data.save();
    if (cardData) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: message.CARD_ADDED,
        response: cardData,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//update card - Id
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    } else {
      image = null;
    }
    const { title, text } = req.body;
    const card = await CardModel.findOne({ _id: id });
    if (!card) {
      return res.status(422).json({
        status: 422,
        message: "Invalid card id...",
      });
    }
    const updateCardSection = await CardModel.findByIdAndUpdate(
      { _id: id },
      { $set: { title: title, text: text, image: image } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Card data updated successfully!",
      updateCardSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//save client reviews
const createReviews = async (req, res) => {
  try {
    const { reviews } = req.body;
    const reviewData = await reviewModel.create({
      reviews,
    });
    return res.status(200).json({
      status: 200,
      message: message.REVIEWS_ADDED,
      data: reviewData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//save contents data
const createContents = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    let content = new contentModel({
      title,
      paragraph,
    });
    if (req.files) {
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;;
      });
      file = file.substring(0, file.lastIndexOf(","));
      content.image = process.env.BASE_URL; + file;
    }
    await content.save();
    console.log(content);
    return res.status(200).json({
      status: 200,
      success: true,
      message: message.CONTENT_ADDED,
      data: content,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};
// get id content data
const getContents = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params; //paragarah get add
    const dataContent = await contentModel.findOne();
    if (dataContent) {
      return res.status(200).json({
        status: 200,
        message: message.GET_CONTENT,
        dataContent,
      });
    }
    return res.status(404).json({
      status: 404,
      message: message.DATA_NOT_FOUND,
    });
    // hello world
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//update card - Id
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    } else {
      image = null;
    }
    const { title, paragraph } = req.body;
    const content = await contentModel.findOne({ _id: id });
    if (!content) {
      return res.status(422).json({
        status: 422,
        message: "Invalid card id...",
      });
    }
    const updateContentSection = await contentModel.findByIdAndUpdate(
      { _id: id },
      { $set: { title: title, paragraph: paragraph, image: image } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Content data updated successfully!",
      updateContentSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//save data - help
const createHelp = async (req, res) => {
  try {
    const { title, message } = req.body;
    const dataHelp = await HelpDashModel.create({
      title,
      message,
    });
    return res.status(200).json({
      status: 200,
      message: message.HELP_ADDED,
      data: dataHelp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//get help by id
const getHelp = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    //title add
    const helpDetails = await HelpDashModel.findOne({ _id: id });
    if (helpDetails) {
      return res.status(200).json({
        status: 200,
        message: "Help data details.............",
        helpDetails,
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

// update help data

const updateHelp = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, message } = req.body;
    const newHelp = await HelpDashModel.findOne({ _id: id });
    if (!newHelp) {
      return res.status(422).json({
        status: 422,
        message: "Invalid id...",
      });
    }
    const updateHelp = await HelpDashModel.findByIdAndUpdate(
      { _id: id },
      { $set: { title: title, message: message } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: message.SECTION_UPDATED,
      updateHelp,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// create section for dashboard
const createSection = async (req, res) => {
  try {
    const { section } = req.body;
    let data = new sectionModel({
      section,
    });
    const newData = await data.save();
    if (newData) {
      return res.status(201).json({
        status: 201,
        message: message.SECTION_ADDED,
        data: newData,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get section for dashboard
const getSection = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const dataGet = await sectionModel.find();
    if (dataGet) {
      return res.status(200).json({
        status: 200,
        message: "section details get updated.........",
        dataGet,
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

//save data - demo section
const createDemo = async (req, res) => {
  try {
    const { demo } = req.body;
    const demoDetails = await demoModel.create({
      demo,
    });
    return res.status(200).json({
      status: 200,
      message: message.DEMO_ADDED,
      data: demoDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//get id types - demo details
const demoDetails = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const demoData = await demoModel.find();
    if (demoData) {
      return res.status(200).json({
        status: 200,
        message: "Deamo data get details.........",
        demoData,
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

const getList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let condition = {};
    const getList = await DashboardModel.find(condition)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const totalgetList = await DashboardModel.countDocuments(condition);
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
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//blog data
const blogCreate = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blogData = await DashboardModel.create({
      blogId,
    });
    return res.status(200).json({
      status: 200,
      message: "blog data added",
      data: blogData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//get blog data
const getBlogData = async (req, res) => {
  try {
    const Blogdata = await DashboardModel.find().populate("blogId");
    const totalBlogdata = await DashboardModel.countDocuments();
    if (!totalBlogdata) {
      return res.status(400).json({
        message: message.DATA_NOT_FOUND,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Blog Data get successfully !",
      data: totalBlogdata,
      Blogdata,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//save - contact data
const contactCreate = async (req, res) => {
  try {
    const { contactId } = req.body;
    const contactDetails = await ContactDashModel.create({
      contactId,
    });
    return res.status(200).json({
      status: 200,
      message: "contact data list",
      data: contactDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//contact data get
const getContactData = async (req, res) => {
  try {
    const contactData = await ContactDashModel.find().populate("contactId");
    const totalcontactData = await ContactDashModel.countDocuments();
    if (!totalcontactData) {
      return res.status(400).json({
        message: message.DATA_NOT_FOUND,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Contact Data get successfully !",
      data: totalcontactData,
      contactData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};
module.exports = {
  headerCreate,
  getheader,
  updateHeader,
  cardCreate,
  updateCard,
  createReviews,
  createContents,
  getContents,
  updateContent,
  createHelp,
  getHelp,
  updateHelp,
  createSection,
  getSection,
  createDemo,
  demoDetails,
  getList,
  blogCreate,
  getBlogData,
  contactCreate,
  getContactData,
};
