const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const successSchema = new Schema({
  


  name: {
    type: String,
  },

  slug: {
    type: String,
    slug: "name",
    default: " ",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const successCategoryModel = mongoose.model("success-category", successSchema);
module.exports = successCategoryModel;
