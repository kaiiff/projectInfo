const aboutHeaderModel = require("../model/AboutHeaderModel");
const aboutCardModel = require("../model/AboutCardModel");
const aboutSectionModel = require("../model/AboutSectionModel");
const { message } = require("../common/Message");
const path = require("path");

//save header data
const createHeader = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("req.body", req.body);
    const createData = new aboutHeaderModel({
      title: title,
      content: content,
    });
    if (req.files) {
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      createData.image = process.env.BASE_URL + file;
    } else {
      file = null;
    }
    await createData.save();
    return res.status(200).json({
      status: 200,
      message: message.HEADER_CREATED,
      Headerdata: createData,
    });
  } catch (error) {
    console.log("error------------>>", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};
// Get data for Header
const getheader = async (req, res) => {
  try {
    const headerDetails = await aboutHeaderModel.find();
    console.log("headerDetails", headerDetails);
    if (headerDetails) {
      return res.status(200).json({
        status: 200,
        message: message.HEADERDETAILS_SUCCESS,
        data: headerDetails,
      });
    }
    return res.status(404).json({
      status: 2404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// update header

const updateAboutHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    } else {
      image = null;
    }
    const { title, content } = req.body;
    const updateHeader = await aboutHeaderModel.findOne({ _id: id });
    if (!updateHeader) {
      return res.status(422).json({
        status: 422,
        message: "Invalid id...",
      });
    }
    const headerUpdate = await aboutHeaderModel.findByIdAndUpdate(
      { _id: id },
      { $set: { title: title, content: content, image: image } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: message.HEADER_CREATED,
      headerUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//save cards
const createCards = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("req.body", req.body);
    const createCard = new aboutCardModel({
      title: title,
      content: content,
    });
    if (req.files) {
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      createCard.image = process.env.BASE_URL + file;
    } else {
      file = null;
    }
    await createCard.save();
    return res.status(200).json({
      status: 200,
      message: message.CARD_ADDED,
      CardData: createCard,
    });
  } catch (error) {
    console.log("error------------>>", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get cards data

const getAboutCard = async (req, res) => {
  try {
    const cardDetails = await aboutCardModel.find();
    console.log("cardDetails", cardDetails);
    if (cardDetails) {
      return res.status(200).json({
        status: 200,
        message: message.CARD_DETAILS,
        data: cardDetails,
      });
    }
    return res.status(404).json({
      status: 2404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// Update about card

const updateAboutCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    } else {
      image = null;
    }
    const { title, content } = req.body;
    const newCard = await aboutCardModel.findOne({ _id: id });
    if (!newCard) {
      return res.status(422).json({
        status: 422,
        message: "Invalid id...",
      });
    }
    const updateCard = await aboutCardModel.findByIdAndUpdate(
      { _id: id },
      { $set: { title: title, content: content, image: image } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: message.Card_UPDATED,
      updateCard,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// create about us section

const createSection = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("req.body", req.body);
    const createSection = new aboutSectionModel({
      title: title,
      description: description,
    });
    if (req.files) {
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      createSection.image = process.env.BASE_URL + file;
    } else {
      file = null;
    }
    await createSection.save();
    return res.status(200).json({
      status: 200,
      message: message.SECTION_ADDED,
      Headerdata: createSection,
    });
  } catch (error) {
    console.log("error------------>>", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get about section

const getAboutSection = async (req, res) => {
  try {
    const sectionDetails = await aboutSectionModel.find();
    console.log("sectionDetails", sectionDetails);
    if (sectionDetails) {
      return res.status(200).json({
        status: 200,
        message: message.SECTION_DETAILS,
        data: sectionDetails,
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

// Update about section

const updateAboutSection = async (req, res) => {
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
    const newSection = await aboutSectionModel.findOne({ _id: id });
    if (!newSection) {
      return res.status(422).json({
        status: 422,
        message: "Invalid id...",
      });
    }
    const updateSection = await aboutSectionModel.findByIdAndUpdate(
      { _id: id },
      { $set: { title: title, description: description, image: image } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: message.SECTION_UPDATED,
      updateSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// save paragraph data
const paragraphCreate = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    const dataCreate = await AboutUsModel.create({
      title,
      paragraph,
    });
    console.log("dataCreate", dataCreate);
    return res.status(200).json({
      status: 200,
      message: message.PARAGRAPH_ADDED,
      data: dataCreate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//get paragraph -Id
const getParagraphData = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    console.log("params", params);
    const getData = await AboutUsModel.findOne({ _id: id });
    console.log("getData", getData);
    if (getData) {
      return res.status(200).json({
        status: 200,
        message: message.GET_PARAGRAPH_DATA,
        data: getData,
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

//save reviews data
const createReview = async (req, res) => {
  try {
    const { reviews } = req.body;
    const ratingData = await AboutUsModel.create({
      reviews,
    });
    console.log("ratingData", ratingData);
    return res.status(200).json({
      status: 200,
      message: message.REVIEWS_ADDED,
      data: ratingData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

//get reviews - Id
const getRating = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    console.log("params", params);
    const getRatingData = await AboutUsModel.findOne({
      reviews: { $elemMatch: { id: id } },
    });
    console.log("getData", getRatingData);
    if (getRatingData) {
      return res.status(200).json({
        status: 200,
        message: message.GET_REVIEWS,
        data: getRatingData,
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

// get all data list
const getAboutUsList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let condition = {};
    const getList = await AboutUsModel.find(condition)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const totalgetList = await AboutUsModel.countDocuments(condition);
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

module.exports = {
  createHeader,
  getheader,
  updateAboutHeader,
  createCards,
  getAboutCard,
  updateAboutCard,
  createSection,
  getAboutSection,
  updateAboutSection,
  paragraphCreate,
  getParagraphData,
  createReview,
  getRating,
  getAboutUsList,
};



