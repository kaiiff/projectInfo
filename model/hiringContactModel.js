const mongoose = require("mongoose");

const contactHiringSchema = new mongoose.Schema(
  {
    name: {
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

    contactNumber: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },

    current_ctc: {
      type: String,
      required: true,
    },
    expected_ctc: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

const contactHiringModel = mongoose.model("Hiring-contact-us", contactHiringSchema);
module.exports = contactHiringModel;
