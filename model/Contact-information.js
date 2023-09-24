const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  companyName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,

    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  phone: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
    //  ref:"Admin"
  },


}, { timestamps: true, strict: false });

const contactModel = mongoose.model("contact-us", contactUsSchema);
module.exports = contactModel;