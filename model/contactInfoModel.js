const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
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
    type: Number
  },

  address: {
    type: String
  },

  discordLink: {
    type: String
  },

  facebookLink: {
    type: String
  },

  twitterLink: {
    type: String
  },

  linkdinLink: {
    type: String
  },

  youtubeLink: {
    type: String
  }

}, { timestamps: true, strict: false })

const contactModel = mongoose.model("contact-info", contactSchema)
module.exports = contactModel;