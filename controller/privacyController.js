const Privacy = require("../model/privacyModel");
const Terms = require("../model/termsModel");
const Cookie = require("../model/cookieModel");

const { message } = require("../common/Message");

// Add data for privacy policy
const privacyPolicy = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (title == undefined || title == "") {
      return res.status(400).json({
        status: 400,
        message: "Title is required",
      });
    }

    if (description == undefined || description == "") {
      return res.status(400).json({
        status: 400,
        message: "description is required",
      });
    }

    let privacyData = new Privacy({
      title: title,
      description: description,
    });

    let result = await privacyData.save();
    console.log("result---->", result);
    if (result) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Data added successfully",
        result,
      });
    } else {
      return res.status(404).json({
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// Get data for Privacy-policy
const getPolicy = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    // .const { id } = req.params.id

    const userDetails = await Privacy.findOne();
    console.log("userDetails", userDetails);
    if (userDetails) {
      return res.status(200).json({
        status: 200,
        message: "successfully",
        userDetails,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Data not found",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: message.ERROR_MESSAGE,
    });
  }
};

// update data for privacy policy

const updatePrivacyPolicy = async (req, res) => {
  try {
    var _id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;

    const data = await Privacy.findOneAndUpdate(
      { _id: _id },
      { title: title, description: description },{new:true}
    );
    console.log(data);
    return res.status(200).json({
      status: 200,
      message: "update successfully",
      response: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      status: false,
      message: "update failed",
      body: "",
    });
  }
};

//   Add data for terms of use

const termsOfUse = async (req, res) => {
  const { title, description } = req.body;

  if (title == undefined || title == "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  if (description == undefined || description == "") {
    return res.status(400).json({
      error: "description is required",
    });
  }

  let termsData = new Terms({
    title: title,
    description: description,
  });

  let result = await termsData.save();

  if (result) {
    return res.status(201).json({
      success: true,
      msj: "Data added successfully",
      result,
    });
  } else {
    return res.status(404).json({
      msj: "data not found",
    });
  }
};

// Get data for terms-of-use
const getTermsOfUse = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    // .const { id } = req.params.id

    const userDetails = await Terms.findOne();
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

// update data for terms of use

const updateTerms = async (req, res) => {
  try {
    var _id = req.params.id;
    console.log("id is--->", _id);
    var title = req.body.title;
    var description = req.body.description;

    const data = await Terms.findOneAndUpdate(
      { _id: _id },

      { title: title, description: description },{new:true}
    );
    console.log(data);
    res.status(200).json({
      msg: "update successfully",
      response: data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ status: false, message: "update failed", body: "" });
  }
};

//   Add data for cookie policy

const cookiePolicy = async (req, res) => {
  const { title, description } = req.body;
  
  if (title == undefined || title == "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }
 
  if (description == undefined || description == "") {
    return res.status(400).json({
      error: "description is required",
    });
  }

  let cookieData = new Cookie({
    title,
    description
  });

  let result = await cookieData.save();

  if (result) {
    return res.status(201).json({
      success: true,
      msj: "Data added successfully",
      result,
    });
  } else {
    return res.status(404).json({
      msj: "data not found",
    });
  }
};

// Get data for cookie policy
const getCookiePolicy = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    // .const { id } = req.params.id

    const userDetails = await Cookie.findOne();
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

// update data for cookie policy

const updateCookie = async (req, res) => {
  try {
    var _id = req.params.id;
    console.log("id is--->", _id);
    var title = req.body.title;
    var description = req.body.description;

    const data = await Cookie.findOneAndUpdate(
      { _id: _id },
   { title: title, description: description },{new:true}
    );
    console.log(data);
    res.status(200).json({
      msg: "update successfully",
      response: data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ status: false, message: "update failed", body: "" });
  }
};

module.exports = {
  privacyPolicy,
  getPolicy,
  updatePrivacyPolicy,
  termsOfUse,
  getTermsOfUse,
  updateTerms,
  cookiePolicy,
  getCookiePolicy,
  updateCookie,
};
