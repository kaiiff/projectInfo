const hiring = require("../model/hiringModel");
const { message } = require("../common/Message");
const contactHiringModel = require("../model/hiringContactModel");

const addHiring = async (req, res) => {
  try {
    const { developerType } = req.body;
    const { detail } = req.body;
    const { status } = req.body;

    const data = new hiring({
      developerType,
      detail,
      status
    });

    const newData = await data.save();
    console.log(newData);
    if (!newData) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    } else {
      return res.status(201).json({
        status: 201,
        message: message.ADD_HIRING_DATA,
        data: newData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

const getHiringData = async (req, res) => {
  try {
    const hiringDetails = await hiring.find().sort({ createdAt: -1 });;
    if (hiringDetails) {
      return res.status(200).json({
        status: 200,
        message: message.GET_HIRING_DATA,
        data: hiringDetails,
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

// update hiring data by id 
const updateHiringData = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params", req.params);

    const { developerType, detail } = req.body;
    console.log("req.body.............", req.body);
    const career = await hiring.findOne({ _id: id });
    if (!career) {
      return res.send("Invalid Id...");
    }
    console.log("career----------------", career);
    await career.save();
    const careerData = await hiring.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          developerType,
          detail

        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "career data updated",
      data: careerData,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// get career by id
const getHiringById = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const careerData = await hiring.findOne({ _id: id }).sort({ createdAt: -1 });
    console.log("careerData", careerData);
    if (careerData) {
      return res.status(200).json({
        status: 200,
        message: "Career details",
        data: careerData,
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

// update status by id

const updateCareerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params", req.params);

    const { status } = req.body;
    console.log("req.body.............", req.body);
    const career = await hiring.findOne({ _id: id });
    if (!career) {
      return res.send("Invalid Id...");
    }
    console.log("career----------------", career);
    // await career.save();
    const statusUpdate = await hiring.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "status updated",
      data: statusUpdate,
    });
  } catch (error) {
    console.log("error----------------->", error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

// delete career by id 

const deleteHiringById = async (req, res, next) => {
  try {

    const { params } = req;
    const { id } = params;

    const dataDelete = await hiring.findOne({ _id: id });
    if (!dataDelete) {
      return res.status(404).json({
        status: 404,
        message: message.DATA_NOT_FOUND,
      });
    }
    await hiring.deleteOne({ _id: id });
    return res.status(200).json({
      status: 200,
      message: "career data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// contact - us hiring
const addHiringContact = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      experience,
      current_ctc,
      expected_ctc,
      city,
      state,
      message,
    } = req.body;
    const createData = new contactHiringModel({
      name,
      email,
      contactNumber,
      experience,
      current_ctc,
      expected_ctc,
      city,
      state,
      message,
    });
    if (req.files) {
      let file = "";
      req.files.forEach(function (files, index, arr) {
        file = file + files.filename + "," + process.env.BASE_URL;
      });
      file = file.substring(0, file.lastIndexOf(","));
      createData.file = process.env.BASE_URL + file;
    }
    await createData.save();
    return res.status(200).json({
      status: 200,
      message: message.HEADER_CREATED,
      createData,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// get contact hiring data

const getHiringContact = async (req, res) => {
  try {
    const hiringDetails = await contactHiringModel.find().sort({ createdAt: -1 });
    if (hiringDetails) {
      return res.status(200).json({
        status: 200,
        message: message.GET_HIRING_DATA,
        data: hiringDetails,
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

// get contact hiring by id
const hiringDetailsByiD = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const contactHirirng = await contactHiringModel.findOne({ _id: id }).sort({ createdAt: -1 });;
    console.log("contactHirirng", contactHirirng);
    if (contactHirirng) {
      return res.status(200).json({
        status: 200,
        message: message.HIRING_DETAILS,
        data: contactHirirng,
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
  addHiring,
  getHiringData,
  addHiringContact,
  getHiringContact,
  hiringDetailsByiD,
  updateHiringData,
  getHiringById,
  deleteHiringById,
  updateCareerStatus
};
