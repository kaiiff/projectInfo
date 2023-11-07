const serviceHeaderModel = require("../model/serviceModel");
const serviceParaModel = require("../model/serviceParaModel");
const serviceCardModel = require("../model/serviceCardModel")
const serviSchemaModel = require("../model/ServiceSchemaModel")
const { message } = require("../common/Message");
const ServiceSchemaModel = require("../model/ServiceSchemaModel");

// add service schema
const createdDataService = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(typeof (name), 12)
    const dataAdded = new serviSchemaModel({
      name: name,
    });
    await dataAdded.save();
    return res.status(200).json({
      status: 200,
      message: "Created data successfully!",
      data: dataAdded,
    });
  } catch (error) {
    console.log("error------------", error)
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// create service header
const createServiceHeader = async (req, res) => {
  try {
    const { file } = req;
    const { title, description, serviceId } = req.body;
    const saveHeader = await serviceHeaderModel.create({
      title,
      image: process.env.BASE_URL + file.filename,
      description,
      serviceId
    });
    return res.status(200).json({
      status: 200,
      message: message.SERVICE_ADDED,
      data: saveHeader,
    });
  } catch (error) {
    console.log("error-----------------", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// Update service header by slug
const updateServiceHeaderBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("req.params", req.params);
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename; 
    }
    //  else {
    //   image = null;
    // }
    const { title, description } = req.body;
    console.log("req.body.............", req.body);
    const serviceHeader = await serviceHeaderModel.findOne({ slug: slug });
    if (serviceHeader) {
      return res.send("Invalid serviceHeader Id...");
    }
    console.log("serviceHeader----------------", serviceHeader);
    await serviceHeader.save();
    const updateServiceHeader = await serviceHeaderModel.findOneAndUpdate(
      { slug: slug },
      {
        $set: {
          title: title,
          description: description,
          image: image,
           slug: slugify(title),
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: message.SERVICE_UPDATE,
      data: updateServiceHeader,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

//   get service header
const getServiceHeader = async (req, res) => {
  try {
    const { params } = req;
    const { slug } = params;
    const getServiceSlug = await ServiceSchemaModel.findOne({ slug: slug })
    var getServiceObj = getServiceSlug.id
    const getSlug = await serviceHeaderModel.findOne({ serviceId: getServiceObj }).populate('serviceId')
    console.log("getSlug", getSlug);
    if (getSlug) {
      return res.status(200).json({
        status: 200,
        message: message.SERVICE_DETAILS,
        data: getSlug,
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

//   get service header by slug

const getServiceHeaderBySlug = async (req, res) => {
  try {
    const serviceHeaderDetails = await serviceHeaderModel.findOne();
    console.log("serviceHeaderDetails", serviceHeaderDetails);
    if (serviceHeaderDetails) {
      return res.status(200).json({
        status: 200,
        message: message.STORY_DETAILS,
        data: serviceHeaderDetails,
      });
    }
    return res.status(404).json({
      status: 404,
      message: message.DATA_NOT_FOUND,
    });
  } catch (error) {
    console.log("error____________", error)
    return res.status(500).json({
      status: 500,
      message: "Error------------------",
    });
  }
};

// update service header by id

const updateServiceHeaderById = async (req, res) => {
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
    const { title, description } = req.body;
    console.log("req.body.............", req.body);
    const serviceHeader = await serviceHeaderModel.findOne({ _id: id });
    if (!serviceHeader) {
      return res.send("Invalid service Header Id...");
    }
    console.log("serviceHeader----------------", serviceHeader);
    await serviceHeader.save();
    const updateServiceHeader = await serviceHeaderModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          image: image,
          slug: slugify(title),
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: message.SERVICE_UPDATE,
      data: updateServiceHeader,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// get service header by id

const getServiceHeaderByid = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const serviceHeaderDetails = await serviceHeaderModel.findOne({ _id: id });
    console.log("serviceHeaderDetails", serviceHeaderDetails);
    if (serviceHeaderDetails) {
      return res.status(200).json({
        status: 200,
        message: message.STORY_DETAILS,
        data: serviceHeaderDetails,
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

//  delete service header by id

const deleteServiceHeaderById = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;

    const dataDelete = await serviceHeaderModel.findOne({ _id: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
    await serviceHeaderModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: 200,
      message: message.SERVICE_DELETE,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// create service paragraph ======>

const createServiceParagraph = async (req, res) => {
  try {
    const { file } = req;
    const { title, serviceId, cards } = req.body;
    var get_cards = JSON.parse(req.body["cards"]);
    const saveHeader = await serviceParaModel.create({
      title,
      image: process.env.BASE_URL + file.filename,
      cards: get_cards,
      serviceId
    });
    return res.status(200).json({
      status: 200,
      message: message.SERVICE_PARA_ADD,
      data: saveHeader,
    });
  } catch (error) {
    console.log("error-----------------", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// get service paragraph-content

const getServiceParagraph = async (req, res) => {
  try {
    const { params } = req;
    const { slug } = params;
    const getServiceSlug = await ServiceSchemaModel.findOne({ slug: slug })
    var getServiceObj = getServiceSlug.id
    const getSlug = await serviceParaModel.find({ serviceId: getServiceObj }).populate('serviceId')
    console.log("getSlug", getSlug);
    if (getSlug) {
      return res.status(200).json({
        status: 200,
        message: message.SERVICE_PARA_DETAILS,
        data: getSlug,
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

// update service paragraph by id

const updateServiceParagraphById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params", req.params);
    const { file } = req;
    let image;
    if (req.file) {
      image = process.env.BASE_URL + file.filename;
    }
    const { title, cards } = req.body;
    console.log("req.body_______", req.body);
    var get_cards = JSON.parse(req.body["cards"]);
    console.log("req.body.............", get_cards);

    const serviceHeader = await serviceParaModel.findOne({ _id: id })

    if (!serviceHeader) {
      return res.send("Invalid serviceHeader Id...");
    }
    console.log("serviceHeader----------------", serviceHeader);
    await serviceHeader.save();
    const updateServiceHeader = await serviceParaModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          cards: get_cards,
          title: title,
          image: image,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: message.SERVICE_PARA_UPDATE,
      data: updateServiceHeader,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// get service paragraph by id

const getServiceParaByid = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const serviceHeaderDetails = await serviceParaModel.findOne({ _id: id });
    console.log("serviceHeaderDetails", serviceHeaderDetails);
    if (serviceHeaderDetails) {
      return res.status(200).json({
        status: 200,
        message: message.SERVICE_PARA_DETAILS,
        data: serviceHeaderDetails,
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

// get service paragraph by slug

const getServiceParaBySlug = async (req, res) => {
  try {
    const serviceHeaderDetails = await serviceParaModel.find().sort({ createdAt: -1 });
    console.log("serviceHeaderDetails", serviceHeaderDetails);
    if (serviceHeaderDetails) {
      return res.status(200).json({
        status: 200,
        message: message.SERVICE_PARA_DETAILS,
        data: serviceHeaderDetails,
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

// delete ervice paraggraph by id

const deleteServiceParaById = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;

    const dataDelete = await serviceParaModel.findOne({ _id: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
    await serviceParaModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: 200,
      message: message.SERVICE_PARA_DELETE,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// create cards =====>

// CREATE SERVICE CARDS
const createServiceCards = async (req, res) => {
  try {

    const { title, content, cards, serviceId } = req.body;
    //  var get_cards = JSON.parse(req.body["cards"]);
    const saveHeader = await serviceCardModel.create({
      title,
      content,
      cards: req.body.cards,
      serviceId
    });
    return res.status(200).json({
      status: 200,
      message: message.CARDS_ADD,
      data: saveHeader,
    });
  } catch (error) {
    console.log("error-----------------", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// GET SERVICE CARDS

const getServiceCards = async (req, res) => {
  try {
    const { params } = req;
    const { slug } = params;
    const getServiceSlug = await ServiceSchemaModel.findOne({ slug: slug })
    var getServiceObj = getServiceSlug.id
    const getSlug = await serviceCardModel.find({ serviceId: getServiceObj }).populate('serviceId')

    console.log("getSlug", getSlug);
    if (getSlug) {
      return res.status(200).json({
        status: 200,
        message: message.CARDS_DETAILS,
        data: getSlug,
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


// UPDATE SERVICE CARDS BY ID

const updateServiceCardById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params", req.params);
    const { title, content, cards } = req.body;
    console.log("req.body_______", req.body);
    // var get_cards = JSON.parse(req.body["cards"]);
    // console.log("req.body.............", req.body);

    const serviceHeader = await serviceCardModel.findOne({ _id: id });

    if (!serviceHeader) {
      return res.send("Invalid Id...");
    }
    console.log("serviceHeader----------------", serviceHeader);
    await serviceHeader.save();
    const updateServiceHeader = await serviceCardModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          cards: req.body.cards,
          content: content,
          title: title,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: message.CARDS_UPDATE,
      data: updateServiceHeader,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// GET SERVICE CARD BY ID

const getServiceCardByid = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const serviceHeaderDetails = await serviceCardModel.findOne({ _id: id });
    console.log("serviceHeaderDetails", serviceHeaderDetails);
    if (serviceHeaderDetails) {
      return res.status(200).json({
        status: 200,
        message: message.CARDS_DETAILS,
        data: serviceHeaderDetails,
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


// GET SERVICE CARDS BY SLUG

const getServiceCardBySlug = async (req, res) => {
  try {
    const serviceHeaderDetails = await serviceCardModel.find().sort({ createdAt: -1 });
    console.log("serviceHeaderDetails", serviceHeaderDetails);
    if (serviceHeaderDetails) {
      return res.status(200).json({
        status: 200,
        message: message.CARDS_DETAILS,
        data: serviceHeaderDetails,
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

// DELETE SERVICE CARDS BY ID

const deleteServiceCardById = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;

    const dataDelete = await serviceCardModel.findOne({ _id: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
    await serviceCardModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: 200,
      message: message.CARDS_DELETE,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// service changes

module.exports = {

  createdDataService,

  createServiceHeader,
  getServiceHeader,
  updateServiceHeaderBySlug,
  getServiceHeaderBySlug,
  getServiceHeaderByid,
  updateServiceHeaderById,
  deleteServiceHeaderById,

  createServiceParagraph,
  getServiceParagraph,
  updateServiceParagraphById,
  getServiceParaByid,
  getServiceParaBySlug,
  deleteServiceParaById,

  createServiceCards,
  getServiceCards,
  updateServiceCardById,
  getServiceCardByid,
  getServiceCardBySlug,
  deleteServiceCardById


};
