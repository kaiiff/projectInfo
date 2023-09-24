const mongoose = require("mongoose");

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const caseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
    },

    slug: {
      type: String,
      slug: "title",
      lowercase: true,
      default: " ",
    },
  },
  { timestamps: true, strict: false }
);

const caseModel = mongoose.model("casestudies", caseSchema);
module.exports = caseModel;
